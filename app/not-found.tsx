
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist, was moved, or is
        temporarily unavailable.
      </p>

      <Link
        href="/"
 className="inline-flex items-center gap-2 px-6 py-3 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   text-white font-semibold rounded-lg shadow-lg
                   hover:from-blue-500 hover:via-purple-500 hover:to-pink-500
                   transition-all duration-300 ease-in-out transform hover:scale-105" >
        <Home size={18} />
        Go Back Home
      </Link>
    </main>
  );
}
