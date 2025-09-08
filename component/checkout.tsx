"use client";

import { useState } from "react";
import { useCreateOrderMutation } from "@/store/Features/order/order-api";
import { useGetCartQuery } from "@/store/Features/cart/cart-api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckOutPage() {
  const router = useRouter();
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

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
      const order = await createOrder({
        shippingAddress,
        paymentMethod,
      }).unwrap();

      toast.success("Order placed successfully!");
      router.push("/account/order-success");
    } catch (err: any) {
      toast.error(err?.data?.message || "Order failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow rounded-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
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
                  className="w-full p-2 sm:p-3 border border-gray-400 rounded text-sm sm:text-base"
                />
              )
            )}
          </div>
          <div className="mt-4">
            <label className="font-semibold text-sm sm:text-base">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-400 rounded mt-1 text-sm sm:text-base"
            >
              <option value="">Select Payment Method</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="ussd">USSD</option>
              <option value="mastercard">MasterCard</option>
              <option value="visa">Visa</option>
            </select>
          </div>
        </div>
        <div className="mt-6 lg:mt-0 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Order Summary
          </h2>
          {cartLoading ? (
            <p>Loading cart...</p>
          ) : !cartData?.updatedCart?.length ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="text-sm sm:text-base space-y-2">
                {cartData.updatedCart.map((item: any) => (
                  <li key={item.product._id + item.size}>
                    {item.product.name} ({item.size}) x {item.quantity} – &#163;
                    {(item.product.price * item.quantity).toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold">
                Total: &#163;{cartData.totalPrice.toLocaleString()}
              </p>
            </>
          )}
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={orderLoading || cartLoading || !cartData?.updatedCart?.length}
        className="w-full mt-6 bg-gradient-to-r from-red-400 via-gray-300 to-black text-black py-3 rounded hover:opacity-90 disabled:opacity-50 text-sm sm:text-base"
      >
        {orderLoading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
