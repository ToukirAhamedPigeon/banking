/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}:signInProps) => {
  console.log('Inside Sign In');
    try {
        //Mutation / Database / Make fetch
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email,password);
        (await cookies()).set("appwrite-session", response.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
      });
        console.log(response);
        return parseStringify(response);
    } catch (error) {
        console.error('Error',error);
    }
}

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
        console.error('Error',error);
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
  
