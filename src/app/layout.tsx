import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'

const inter= Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "CRM system",
  description: "crm system dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body suppressHydrationWarning={false} className={inter.className}>{children}</body>
      
    </html>
  );
}
function Poppins(arg0: { subsets: string[] }) {
  throw new Error('Function not implemented.')
}

