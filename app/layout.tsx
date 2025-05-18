import type { Metadata } from "next";
import { Geist, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { ThemeProvider } from 'next-themes'
import { ThemeClientWrapper } from "@/components/ThemeClientWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Pigeon Bank",
  description: "Pigeon Bank is a mordern banking platform for everyone.",
  icons:{
    icon:'/icons/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
       
      <body
        className={`${geistSans.variable} ${ibmPlexSerif.variable} antialiased`}
      >
       <ThemeProvider attribute="class"
    defaultTheme="dark"
    enableSystem={false}
    // enableColorScheme={false}
    >
       <ThemeClientWrapper>
          <LoaderProvider>
            {children}
          </LoaderProvider>
          </ThemeClientWrapper>
          </ThemeProvider>
        
      </body>
      
    </html>
  );
}
