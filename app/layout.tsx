import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Wallet } from "@/components/WalletProvider";
import { NavBar } from "@/components/NavBar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meteora AMM',
  description: 'Decentralized AMM on Solana',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <Wallet>
          <NavBar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </Wallet>
      </body>
    </html >
  );
}
