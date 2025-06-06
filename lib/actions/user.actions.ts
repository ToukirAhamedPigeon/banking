'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const { 
  APPWRITE_DATABASE_ID:DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID:USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID:BANK_COLLECTION_ID,
 } = process.env;

interface ErrorResponse {
  response: {
    code: number;
  };
}

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
      const { database } = await createAdminClient();
      if (!userId || typeof userId !== "string") {
        console.warn("Invalid userId provided for fetching bank.");
        return null;
      }
    
      //console.log("Fetching user with userId:", userId);
      const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )

      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation / Database / Make fetch
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    
    // Set session cookie
    const session = await account.createEmailPasswordSession(email, password);
        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        // const user = await getUserInfo({ userId: session.userId });
    
    //console.log(response);
    return parseStringify(response);
  } catch (error) {
    // Handle invalid credentials error
    if (error instanceof Error) {
      // Check if the error is a specific type with a 'response' object and code property
      if ((error as unknown as ErrorResponse).response?.code === 401) {
        return { error: 'Invalid credentials. Please check your email and password.' };
      } else {
        return { error: 'An unexpected error occurred.' };
      }
    } else {
      return { error: 'An unexpected error occurred.' };
    }
  }
};

export const signUp = async ({password,...userData}:SignUpParams) => {
    const {email, firstName, lastName} = userData;
    let newUserAccount;
    try {
        //Mutation / Database / Make fetch
        const { account,database } = await createAdminClient();
        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        if(!newUserAccount) throw Error('Error creating user account');
        const dwollaCustomerUrl = await createDwollaCustomer({
          ...userData,
          type: 'personal',
        })
        if(!dwollaCustomerUrl) throw Error('Error creating Dwolla customer');
        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
        const newUser = await database.createDocument(
          DATABASE_ID!,
          USER_COLLECTION_ID!,
          ID.unique(),
          {
            ...userData,
            userId: newUserAccount.$id,
            dwollaCustomerId,
            dwollaCustomerUrl
          }
        )
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUser);
    } catch (error) {
      if (error instanceof Error) {
        // Check if the error is a specific type with a 'response' object and code property
        if ((error as unknown as ErrorResponse).response?.code === 401) {
          return { error: 'Registration Failed!' };
        } else {
          return { error: 'An unexpected error occurred.' };
        }
      } else {
        return { error: 'An unexpected error occurred.' };
      }
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const sessionClient = await createSessionClient();
      if (!sessionClient) return null;
      const { account } = sessionClient;
      const result = await account.get();
      const user = await getUserInfo({ userId: result.$id });
      return await parseStringify(user);
    } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
      console.error('Error',error);
      return null;
    }
  }

  export const logoutAccount = async () => {
    try {
      const sessionClient = await createSessionClient();
      if (!sessionClient) return null;
      const { account } = sessionClient;
      (await cookies()).delete('appwrite-session');
      return await account.deleteSession('current');
    } 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
      console.error('Error',error);
      return null;
    }
  }

  export const createLinkToken = async (user: User) => {
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }
  
      const bank = await getBankByUserId({ userId: user.$id });
      const existingAccessToken = bank?.accessToken;
  
      const tokenParams: any = {
        user: {
          client_user_id: user.$id,
        },
        client_name: `${user.firstName} ${user.lastName}`,
        products: ['auth', 'transactions'] as Products[],
        language: 'en',
        country_codes: ['US'] as CountryCode[],
      };
  
      // If user already linked a bank, use update mode
      if (existingAccessToken) {
        tokenParams.access_token = existingAccessToken;
        tokenParams.update = { account_selection_enabled: true };
      }
  
      const response = await plaidClient.linkTokenCreate(tokenParams);
      return parseStringify({ linkToken: response.data.link_token });
  
    } catch (error) {
      console.log('Error creating link token:', error);
    }
  };

  export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId
  }:createBankAccountProps) => {
    try{
      const {database} = await createAdminClient();
      const bankAccount = await database.createDocument(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        ID.unique(),
        {
          userId,
          bankId,
          accountId,
          accessToken,
          fundingSourceUrl,
          sharableId
        },
      );
      return parseStringify(bankAccount);
    }
    catch(error){
      console.log('Error',error);
    }
  }
 
  export const exchangePublicToken = async ({publicToken, user}:exchangePublicTokenProps) => {
    try {
      //Exchange public token for access token and item id
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken
      });
      const {access_token, item_id} = response.data;
      const accessToken=access_token;
      const itemId=item_id;
      const accountResponse = await plaidClient.accountsGet({
        access_token: accessToken
      });
      const accountData = accountResponse.data.accounts[0];
      //Create a processor token for Dwolla using the access token and account ID
      const request:ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: accountData.account_id,
        processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum
      }; 
      const processorTokenResponse = await plaidClient.processorTokenCreate(request);
      const processorToken = processorTokenResponse.data.processor_token;
      //Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
      const fundingSourceUrl = await addFundingSource({
        dwollaCustomerId: user.dwollaCustomerId,
        processorToken,
        bankName: accountData.name,
      });
      //If the funding source URL is not created, throw an error
      if (!fundingSourceUrl) throw Error;
      //Create a bank account using the user ID, item ID, and account ID, access token, funding source URL, and sharable ID
      await createBankAccount({
        userId: user.$id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        sharableId: encryptId(accountData.account_id),
      });
      // Revalidate the path to reflect the changes
      revalidatePath("/");
      return parseStringify({publicTokenExchange: "complete"});
    } catch (error) {
      console.log('Error',error);
    }
  }

  export const getBanks = async ({ userId }: getBanksProps) => {
    try {
      const { database } = await createAdminClient();
      if (!userId) {
        console.warn("Warning: No user ID provided for getBanks.");
        return null;  // Return an empty response instead of throwing an error
      }
      //console.log("Fetching banks for User ID:", userId); // Debugging
      const banks = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal("userId", [userId])] // Ensure correct query format
      )
  
      return parseStringify(banks.documents);
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getBank = async ({ documentId }: getBankProps) => {
    try {
      const { database } = await createAdminClient();
      if (!documentId || typeof documentId !== "string") {
        console.warn("Invalid documentId provided for fetching bank.");
        return null;
      }
    
  //console.log("Fetching bank with documentId:", documentId);
  const bank = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('$id', [documentId])]
      )
  
      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
    try {
      const { database } = await createAdminClient();
  
      const bank = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('accountId', [accountId])]
      )
  
      if(bank.total !== 1) return null;
  
      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

  export const getBankByUserId = async ({ userId }: {userId:string}) => {
    try {
      const { database } = await createAdminClient();
  
      const bank = await database.listDocuments(
        DATABASE_ID!,
        BANK_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      if(bank.total !== 1) return null;
  
      return parseStringify(bank.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

  
