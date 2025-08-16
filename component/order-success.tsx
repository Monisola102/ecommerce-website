"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa"; 

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        {/* Big green checkmark */}
        <FaCheckCircle className="bg-red-400 text-black w-24 h-24 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-black mb-4">Order Placed!</h1>
        <p className="mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/account/orders"
            className="bg-gradient-to-r from-red-400 via-gray-300  to-black text-black px-6 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
          >
            View My Orders
          </Link>

          <Link
            href="/"
            className="bg-gradient-to-r from-red-400 via-gray-300  to-black  text-black  hover:bg-opacity-90 disabled:opacity-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
