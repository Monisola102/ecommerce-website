"use client";

import CartCard from "./useCartCard";
import {
  useGetCartQuery,
  useClearCartMutation,
} from "@/store/Features/cart/cart-api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { data: cart, isLoading, error } = useGetCartQuery();
  const [clearCart] = useClearCartMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleClear = async () => {
    try {
      await clearCart().unwrap();
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Could not clear cart");
    }
  };

  if (isLoading)
    return <p className="p-6 text-center text-gray-500">Loading...</p>;

  if (error || !cart?.updatedCart?.length) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-lg font-semibold text-gray-600">
          Your cart is empty.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 animate-pulse"
        >
          <ArrowLeft />
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {user?.name ? `${user.name}'s Cart` : "Your Cart"}
      </h1>

      {/* Product Section */}
      <h2 className="text-lg font-semibold mb-2">Products</h2>
      <div className="flex flex-col gap-4">
        {cart.updatedCart.map((item) => (
          <CartCard key={item._id} item={item} />
        ))}
      </div>

      {/* Totals & Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Totals Column */}
        <div className="space-y-2 text-left">
          <p className="font-semibold text-black text-sm">
            Total Items: {cart.totalQuantity}
          </p>
          <p className="font-semibold text-black text-sm">
            Total Price: ₦{cart.totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
          <button
            onClick={handleClear}
            className="flex-1 sm:flex-none bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition font-semibold"
          >
            Clear Cart
          </button>
          <button
            onClick={() => router.push("/account/orders")}
            className="flex-1 sm:flex-none bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
