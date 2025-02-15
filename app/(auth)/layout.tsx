

import Image from 'next/image';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full justify-between items-stretch font-inter">
        {children}

        {/* Right Panel with Image */}
        <div className="auth-asset w-1/2 h-screen relative">
        <Image
          src="/icons/pigeon_banking.jpeg"
          alt="Auth Image"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw" // You can adjust this based on your design
        />
        </div>
      </main>
    );
  }
  