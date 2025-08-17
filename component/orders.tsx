"use client";

import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "@/store/Features/order/order-api";
import { useCreatePaymentMutation } from "@/store/Features/auth/auth-api";
import { useGetCartQuery } from "@/store/Features/cart/cart-api";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function OrderPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const { data: cartData, isLoading: cartLoading } = useGetCartQuery();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!user) {
      toast.error("Please login to proceed with checkout");
      router.push("/account?redirect=/order");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const { fullName, address, city, postalCode, country } = shippingAddress;

    if (!fullName || !address || !city || !postalCode || !country) {
      return toast.error("Please fill out all shipping fields");
    }

    if (!paymentMethod) {
      return toast.error("Please select a payment method");
    }

    if (!cartData || cartData.updatedCart.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      // 1️⃣ Create the order
      const order = await createOrder({
        shippingAddress,
        paymentMethod,
      }).unwrap();

      toast.success("Order placed successfully!");

      // 2️⃣ Create the payment record (so it shows in Payments page)
      await createPayment({
        order: order._id,
        amount: cartData.totalPrice,
        paymentMethod,
        status: "paid", // or "pending" if you want verification later
      }).unwrap();

      toast.success("Payment recorded successfully!");

      // 3️⃣ Redirect to success page
      router.push("/account/order-success");
    } catch (err: any) {
      toast.error(err?.data?.message || "Order failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* Shipping Address */}
      <div className="space-y-4">
        {["fullName", "address", "city", "postalCode", "country"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              value={(shippingAddress as any)[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          )
        )}
      </div>

      {/* Payment Method */}
      <div className="mt-4">
        <label className="font-semibold">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded mt-1"
        >
          <option value="">Select Payment Method</option>
          <option value="card">Card</option>
          <option value="bank">Bank Transfer</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>

      {/* Order Summary */}
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
      <button
        onClick={handleCheckout}
        disabled={orderLoading || cartLoading || !cartData?.updatedCart?.length}
        className="w-full mt-6 bg-gradient-to-r from-red-400 via-gray-300 to-black text-black py-3 rounded hover:bg-opacity-90 disabled:opacity-50"
      >
        {orderLoading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
