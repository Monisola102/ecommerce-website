"use client";

import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/store/Features/order/order-api";
import { useGetCartQuery } from "@/store/Features/cart/cart-api";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OrderPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to proceed with checkout");
      router.push("/account?redirect=/order");
    }
  }, [user]);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
  const { fullName, address, city, postalCode, country } = shippingAddress;

  if (!fullName || !address || !city || !postalCode || !country) {
    return toast.error("Please fill out all shipping fields");
  }

  if (!cartData || cartData.updatedCart.length === 0) {
    return toast.error("Cart is empty");
  }

  try {
    await createOrder({
      shippingAddress,
      items: cartData.updatedCart.map((item: any) => ({
        product: item.product._id,
        size: item.size,
        quantity: item.quantity,
        priceAtOrderTime: item.product.price,
      })),
      totalPrice: cartData.totalPrice,
    }).unwrap();

    toast.success("Order placed successfully!");
    router.push("/orders");
  } catch (err: any) {
    toast.error(err?.data?.message || "Order failed");
    console.error(err);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* Shipping Address Form */}
      <div className="space-y-4">
        {["fullName", "address", "city", "postalCode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={(shippingAddress as any)[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cartLoading ? (
          <p>Loading cart...</p>
        ) : !cartData?.updatedCart?.length ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="text-sm space-y-2">
              {cartData.updatedCart.map((item: any) => (
                <li key={item.product._id + item.size}>
                  {item.product.name} ({item.size}) x {item.quantity} – ₦
                  {(item.product.price * item.quantity).toLocaleString()}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">
              Total: ₦{cartData.totalPrice.toLocaleString()}
            </p>
          </>
        )}
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={orderLoading || cartLoading || !cartData?.updatedCart?.length}
        className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-opacity-90 disabled:opacity-50"
      >
        {orderLoading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
