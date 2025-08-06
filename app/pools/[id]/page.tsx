"use client"

import { notFound } from 'next/navigation';

// Mock data for the pool
const pool = {
  id: '1',
  token0: {
    symbol: 'SOL',
    name: 'Solana',
    icon: '🌞',
    balance: '0.0',
    value: '0.00',
  },
  token1: {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '💵',
    balance: '0.0',
    value: '0.00',
  },
  tvl: '$12.5M',
  volume24h: '$2.1M',
  feeTier: '0.3%',
  apr: '12.5%',
  price: '98.42 USDC per SOL',
  priceChange24h: '+1.2%',
};

export default function PoolDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the pool data using the ID
  if (params.id !== '1') {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {pool.token0.symbol} / {pool.token1.symbol} Pool
        </h1>
        <div className="flex items-center space-x-4 text-gray-400">
          <span>Fee Tier: {pool.feeTier}</span>
          <span>•</span>
          <span>APR: <span className="text-green-400">{pool.apr}</span></span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-2">TVL</h3>
          <p className="text-2xl font-bold">{pool.tvl}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-2">24h Volume</h3>
          <p className="text-2xl font-bold">{pool.volume24h}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-2">Price</h3>
          <p className="text-2xl font-bold">{pool.price}</p>
          <p className={`text-sm ${pool.priceChange24h.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {pool.priceChange24h} (24h)
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Liquidity */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Add Liquidity</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Input</span>
                <span className="text-sm text-gray-400">Balance: {pool.token0.balance} {pool.token0.symbol}</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <input
                  type="number"
                  placeholder="0.0"
                  className="bg-transparent w-full outline-none text-xl"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{pool.token0.icon}</span>
                  <span>{pool.token0.symbol}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-gray-800 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Input</span>
                <span className="text-sm text-gray-400">Balance: {pool.token1.balance} {pool.token1.symbol}</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <input
                  type="number"
                  placeholder="0.0"
                  className="bg-transparent w-full outline-none text-xl"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{pool.token1.icon}</span>
                  <span>{pool.token1.symbol}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium mt-4 transition-colors">
              Add Liquidity
            </button>
          </div>
        </div>

        {/* Remove Liquidity */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Remove Liquidity</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">LP Tokens</span>
                <span className="text-sm text-gray-400">Balance: 0.0</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <input
                  type="number"
                  placeholder="0.0"
                  className="bg-transparent w-full outline-none text-xl"
                />
                <span>LP</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2">
              {['25%', '50%', '75%', '100%'].map((percent) => (
                <button
                  key={percent}
                  className="bg-gray-800 hover:bg-gray-700 text-sm py-2 rounded transition-colors"
                >
                  {percent}
                </button>
              ))}
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Youll receive:</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{pool.token0.icon}</span>
                  <span>0.0 {pool.token0.symbol}</span>
                </div>
                <span className="text-gray-400">${pool.token0.value}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{pool.token1.icon}</span>
                  <span>0.0 {pool.token1.symbol}</span>
                </div>
                <span className="text-gray-400">${pool.token1.value}</span>
              </div>
            </div>

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium mt-2 transition-colors">
              Remove Liquidity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
