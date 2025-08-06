"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Mock token list
const tokens = [
  { symbol: 'SOL', name: 'Solana', icon: '🌞' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { symbol: 'mSOL', name: 'Marinade Staked SOL', icon: '🪙' },
  { symbol: 'USDT', name: 'Tether', icon: '💲' },
  { symbol: 'JUP', name: 'Jupiter', icon: '✨' },
  { symbol: 'BONK', name: 'Bonk', icon: '🐕' },
];

export default function CreatePoolPage() {
  const router = useRouter();
  const [token0, setToken0] = useState(tokens[0]);
  const [token1, setToken1] = useState(tokens[1]);
  const [feeTier, setFeeTier] = useState('0.3');
  const [showToken0List, setShowToken0List] = useState(false);
  const [showToken1List, setShowToken1List] = useState(false);

  const handleCreatePool = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would create the pool here
    alert('Pool creation would be implemented here');
    router.push('/pools');
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
            <div
              className="bg-gray-900 rounded-lg p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setShowToken0List(!showToken0List)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{token0.icon}</span>
                <span className="text-lg">{token0.symbol}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {showToken0List && (
              <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg border border-gray-800 max-h-60 overflow-auto">
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${token.symbol === token0.symbol ? 'bg-gray-800' : ''}`}
                    onClick={() => {
                      if (token.symbol !== token1.symbol) {
                        setToken0(token);
                        setShowToken0List(false);
                      }
                    }}
                  >
                    <span className="text-xl mr-3">{token.icon}</span>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            <div
              className="bg-gray-900 rounded-lg p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setShowToken1List(!showToken1List)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{token1.icon}</span>
                <span className="text-lg">{token1.symbol}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>

            {showToken1List && (
              <div className="absolute z-10 mt-2 w-full bg-gray-900 rounded-lg shadow-lg border border-gray-800 max-h-60 overflow-auto">
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    className={`flex items-center p-3 hover:bg-gray-800 cursor-pointer ${token.symbol === token1.symbol ? 'bg-gray-800' : ''}`}
                    onClick={() => {
                      if (token.symbol !== token0.symbol) {
                        setToken1(token);
                        setShowToken1List(false);
                      }
                    }}
                  >
                    <span className="text-xl mr-3">{token.icon}</span>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              Initial {token0.symbol} price in {token1.symbol}
            </div>
            <input
              type="number"
              className="w-full bg-transparent text-2xl outline-none"
              placeholder="0.0"
              step="0.000001"
              min="0"
            />
            <div className="text-sm text-gray-400 mt-1">
              {token0.symbol} per {token1.symbol}
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
