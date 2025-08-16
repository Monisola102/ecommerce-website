"use client";

import CartCard from "./useCartCard";
import { useGetCartQuery, useClearCartMutation } from "@/store/Features/cart/cart-api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CartPage() {
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

  if (isLoading) return <p className="p-4">Loading...</p>;

  if (error || !cart?.updatedCart?.length) {
    return (
      <div className="p-4 text-center space-y-4">
        <p className="text-lg font-medium">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 animate-pulse"
        >
          <ArrowLeft />
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {user ? `${user.name}'s Cart` : "Your Cart"}
      </h1>
      <div className="space-y-4">
        {cart.updatedCart.map((item) => (
          <CartCard key={item._id} item={item} />
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
          <div className="space-y-2 text-left">
        <p>Total Items: {cart.totalQuantity}</p>
        <p>Total Price: ₦{cart.totalPrice.toLocaleString()}</p>
        </div>
         <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
        <button
      onClick={() => router.push("/order")}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Proceed to Checkout
    </button>
         </div>
      </div>
    </div>
  );
}
