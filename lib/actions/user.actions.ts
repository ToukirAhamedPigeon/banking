'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

interface ErrorResponse {
  response: {
    code: number;
  };
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    // Mutation / Database / Make fetch
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    
    // Set session cookie
    (await cookies()).set("appwrite-session", response.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    
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

export const signUp = async (userData:SignUpParams) => {
    const {email, password, firstName, lastName} = userData;
    try {
        //Mutation / Database / Make fetch
        const { account } = await createAdminClient();
        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount);
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
      const user = await account.get();
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
  
