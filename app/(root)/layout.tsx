import Sidebar from "@/components/Sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loggedIn ={firstName: 'Toukir', lastName: 'Pigeon'};
  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar 
        // user="loggedIn"
        /> 
        {children}
    </main>
  );
}
