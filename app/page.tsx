import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Trade with Near-Zero Slippage
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Experience the next generation of decentralized trading on Solana with Meteora AMM  advanced concentrated liquidity protocol.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/pools" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center">
            Explore Pools
          </Link>
          <Link href="/create-pool" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-center">
            Create Pool
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 px-4">
        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-3xl font-bold mb-2">$1.2B+</h3>
          <p className="text-gray-400">Total Value Locked</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-3xl font-bold mb-2">0.01%</h3>
          <p className="text-gray-400">Lowest Fees</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl">
          <h3 className="text-3xl font-bold mb-2">500+</h3>
          <p className="text-gray-400">Active Pools</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="my-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Meteora AMM?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Trade with sub-second finality on Solana  high-performance blockchain.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Low Fees</h3>
            <p className="text-gray-400">Pay minimal fees while enjoying maximum capital efficiency.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-400">Your assets are safe with our battle-tested smart contracts.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
