"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const user = await getLoggedInUser();
      if (!user) {
        router.push("/sign-in"); // Client-side navigation
      }
      else{
        router.push("/");
      }
    }
    checkAuth();
  }, []);

  return null; // Prevent rendering
}
