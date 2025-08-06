"use client"

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function NavBar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">
          Meteora AMM
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/pools" className="hover:text-purple-300 transition-colors">
            Pools
          </Link>
          <Link href="/create-pool" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
            Create Pool
          </Link>
          <WalletMultiButton 
            className="!bg-purple-600 hover:!bg-purple-700 !px-4 !py-2 !rounded-md !transition-colors"
          />
        </div>
      </div>
    </nav>
  );
}
