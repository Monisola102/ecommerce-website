"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <FaCheckCircle className="text-green-500 w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6" />

        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-3 sm:mb-4">
          Order Placed!
        </h1>

        <p className="text-sm sm:text-base mb-4 sm:mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4">
          <Link
            href="/account/orders"
            className="bg-gradient-to-r from-red-400 via-green-200 to-gray-400 text-black px-4 py-2 sm:px-6 sm:py-2 rounded hover:opacity-90 text-sm sm:text-base"
          >
            View My Orders
          </Link>

          <Link
            href="/"
            className="bg-gradient-to-r from-red-400 via-green-200 to-gray-400 text-black px-4 py-2 sm:px-6 sm:py-2 rounded hover:opacity-90 text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
