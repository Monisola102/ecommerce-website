"use client";

import CartCard, { CartItemDisplay } from "./useCartCard";
import { useGetCartQuery, useClearCartMutation } from "@/store/Features/cart/cart-api";
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
    } catch {
      toast.error("Could not clear cart");
    }
  };

  if (isLoading) return <p className="p-6 text-center text-gray-500">Loading...</p>;

  if (error || !cart?.updatedCart?.length) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-lg font-semibold text-gray-600">Your cart is empty.</p>
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

  const displayCartItems: CartItemDisplay[] = cart.updatedCart.map(item => ({
    productName: item.product.name,
    productImage: item.product.image,
    price: item.product.price,
    size: item.size,
    quantity: item.quantity,
    _originalId: item.product._id,
  }));

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        {user?.name ? `${user.name}'s Cart` : "Your Cart"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <div className="flex flex-col gap-4">
            {displayCartItems.map((item, index) => (
              <CartCard key={index} item={item} originalCart={cart.updatedCart} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-64 flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-black text-sm">Quantity</h3>
              <p className="text-black font-semibold text-lg">{cart.totalQuantity}</p>
            </div>
            <div>
              <h3 className="font-semibold text-black text-sm">Total Price</h3>
              <p className="text-black font-semibold text-lg">{cart.totalPrice.toLocaleString()}&#163;</p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleClear}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition font-semibold"
              >
                Clear Cart
              </button>
              <button
                onClick={() => router.push("/account/checkouts")}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
