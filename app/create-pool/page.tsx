"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { CpAmm, getSqrtPriceFromPrice } from "@meteora-ag/cp-amm-sdk";
import { BN } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';


export default function CreatePoolPage() {
  const router = useRouter();
  const [feeTier, setFeeTier] = useState('0.3');
  const [token0, setToken0] = useState("")
  const [token1, setToken1] = useState("")
  const [showToken0List, setShowToken0List] = useState(false);
  const [showToken1List, setShowToken1List] = useState(false);

  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const handleCreatePool = async (e: React.FormEvent) => {
    // 6g8hayQxus1X5BnRDojHA1LmCSkjd411zxT1Y9qPj2jz
    e.preventDefault();
    if (!publicKey || !connection) return;
    const cpAmm = new CpAmm(connection)
    const configPubkey = new PublicKey("6d5MYCCy7gn8oi8fQqzhdWYz4JoYTxLpBdifSQFyVNJM")
    const configState = await cpAmm.fetchConfigState(configPubkey);
    console.log("CONFIG STATEE HRE: ", configState)
    const initPrice = "10"
    const baseToken = new PublicKey(token0)
    const quoteToken = new PublicKey(token1)
    const baseTokenProgramId = (await connection.getAccountInfo(baseToken))?.owner
    const baseTokenMint = await getMint(connection, baseToken, "confirmed", baseTokenProgramId!)
    const quoteTokenProgramId = (await connection.getAccountInfo(quoteToken))?.owner
    const quoteTokenMint = await getMint(connection, quoteToken, "confirmed", quoteTokenProgramId!)
    const { actualInputAmount, consumedInputAmount, outputAmount, liquidityDelta } = cpAmm.getDepositQuote({
      inAmount: new BN(100000000), // 5 tokenA (base token) with 9 decimals
      isTokenA: true,
      minSqrtPrice: configState.sqrtMinPrice,
      maxSqrtPrice: configState.sqrtMaxPrice,
      sqrtPrice: getSqrtPriceFromPrice(initPrice, baseTokenMint.decimals, quoteTokenMint.decimals),
    })
    const createPoolTx = await cpAmm.createPool({
      payer: publicKey,
      creator: publicKey,
      config: configPubkey,
      positionNft: Keypair.generate().publicKey,
      tokenAMint: baseTokenMint.address,
      tokenBMint: quoteTokenMint.address,
      activationPoint: null,
      tokenAAmount: consumedInputAmount,
      tokenBAmount: outputAmount,
      initSqrtPrice: getSqrtPriceFromPrice(initPrice, baseTokenMint.decimals, quoteTokenMint.decimals),
      liquidityDelta: liquidityDelta,
      tokenAProgram: baseTokenProgramId!,
      tokenBProgram: quoteTokenProgramId!
    });
    createPoolTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    createPoolTx.feePayer = publicKey;
    // const createPoolSig = await sendTransaction(createPoolTx, connection);
    console.log("sent transaction and created pool: ", createPoolTx.serializeMessage().toString("base64"))
    // router.push('/pools');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a New Pool</h1>
        <p className="text-gray-400">Create a new liquidity pool and earn trading fees.</p>
      </div>

      <form onSubmit={handleCreatePool} className="space-y-6">
        {/* Token Selection */}
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-2">Token 0</label>
            <input
              type="text"
              value={token0}
              onChange={(e) => setToken0(e.target.value)}
              className="w-full bg-gray-900 rounded-lg p-4 text-lg outline-none"
              placeholder="Enter token symbol (e.g., SOL, USDC)"
            />
          </div>

          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Token 1</label>
            <input
              type="text"
              value={token1}
              onChange={(e) => setToken1(e.target.value)}
              className="w-full bg-gray-900 rounded-lg p-4 text-lg outline-none"
              placeholder="Enter token symbol (e.g., USDC, SOL)"
            />
          </div>
        </div>

        {/* Fee Tier Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Fee Tier</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '0.01', label: '0.01%', description: 'Best for stable pairs' },
              { value: '0.05', label: '0.05%', description: 'Best for stable pairs' },
              { value: '0.3', label: '0.3%', description: 'Best for most pairs' },
              { value: '1', label: '1%', description: 'Best for exotic pairs' },
            ].map((tier) => (
              <div
                key={tier.value}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${feeTier === tier.value
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-800 hover:border-gray-700'
                  }`}
                onClick={() => setFeeTier(tier.value)}
              >
                <div className="font-medium">{tier.label}</div>
                <div className="text-sm text-gray-400">{tier.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Initial Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Initial Price</label>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">
              Initial {token0} price in {token1}
            </div>
            <input
              type="number"
              className="w-full bg-transparent text-2xl outline-none"
              placeholder="0.0"
              step="0.000001"
              min="0"
            />
            <div className="text-sm text-gray-400 mt-1">
              {token0} per {token1}
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg text-sm text-gray-400">
          <p className="mb-2">✨ <span className="font-medium">Pro Tip:</span> When you add liquidity, youll receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed for the underlying assets at any time.</p>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Create Pool
        </button>
      </form>
    </div>
  );
}
