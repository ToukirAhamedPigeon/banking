import AuthRedirect from "@/components/AuthRedirect";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  // console.log("LOGGED IN USER:", loggedIn); 
  // console.log("IS LOGGED IN:", !!loggedIn);
  return (
    <>
    {!loggedIn 
    ?<AuthRedirect />
      : <main className="flex h-screen w-full font-inter">
          <Sidebar  
          user={loggedIn}
          /> 
          <div className="flex size-full flex-col">
            <div className="root-layout">
              <Image src="/icons/logo.png" width={30} height={30} alt="menu icon"/>
              <div>
                <MobileNav 
                user={loggedIn}
                />
              </div>
            </div>
            {children}
          </div>
      </main>
    }
    
    </>
  );
}
