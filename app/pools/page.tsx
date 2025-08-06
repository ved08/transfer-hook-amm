import Link from 'next/link';

// Mock data for pools
const pools = [
  {
    id: '1',
    token0: { symbol: 'SOL', icon: '🌞' },
    token1: { symbol: 'USDC', icon: '💵' },
    tvl: '$12.5M',
    volume24h: '$2.1M',
    feeTier: '0.3%',
    apr: '12.5%',
  },
  {
    id: '2',
    token0: { symbol: 'mSOL', icon: '🪙' },
    token1: { symbol: 'SOL', icon: '🌞' },
    tvl: '$8.7M',
    volume24h: '$1.2M',
    feeTier: '0.3%',
    apr: '8.9%',
  },
  {
    id: '3',
    token0: { symbol: 'USDC', icon: '💵' },
    token1: { symbol: 'USDT', icon: '💲' },
    tvl: '$25.1M',
    volume24h: '$15.8M',
    feeTier: '0.05%',
    apr: '5.2%',
  },
  {
    id: '4',
    token0: { symbol: 'JUP', icon: '✨' },
    token1: { symbol: 'SOL', icon: '🌞' },
    tvl: '$5.3M',
    volume24h: '$3.7M',
    feeTier: '0.3%',
    apr: '18.3%',
  },
];

export default function PoolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pools</h1>
        <Link 
          href="/create-pool" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Create Pool
        </Link>
      </div>
      
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 font-medium">
          <div className="col-span-4">Pool</div>
          <div className="col-span-2 text-right">TVL</div>
          <div className="col-span-2 text-right">Volume 24h</div>
          <div className="col-span-2 text-right">Fee Tier</div>
          <div className="col-span-2 text-right">APR</div>
        </div>
        
        {pools.map((pool) => (
          <Link 
            key={pool.id} 
            href={`/pools/${pool.id}`}
            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-0"
          >
            <div className="col-span-4 flex items-center space-x-2">
              <div className="flex -space-x-2">
                <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  {pool.token0.icon}
                </span>
                <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-lg -ml-2">
                  {pool.token1.icon}
                </span>
              </div>
              <span className="font-medium">{pool.token0.symbol} / {pool.token1.symbol}</span>
            </div>
            <div className="col-span-2 text-right">{pool.tvl}</div>
            <div className="col-span-2 text-right">{pool.volume24h}</div>
            <div className="col-span-2 text-right">{pool.feeTier}</div>
            <div className="col-span-2 text-right text-green-400">{pool.apr}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
