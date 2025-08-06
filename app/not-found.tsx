import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
