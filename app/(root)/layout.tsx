import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
//import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);
  console.log('I am Here');
  console.log(!loggedIn);
  //if(!loggedIn) redirect('/sign-in');
  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar  
         user={loggedIn}
        /> 
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon"/>
            <div>
              <MobileNav 
               user={loggedIn}
              />
            </div>
          </div>
          {children}
        </div>
    </main>
  );
}
