"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearUser} from "@/store/Features/auth/auth-slice";
import { useAppDispatch } from "@/store/hook";
import { toast } from "react-toastify";
import { useGetOrdersQuery } from "@/store/Features/order/order-api";
import { useGetUserPaymentsQuery, useLogoutMutation } from "@/store/Features/auth/auth-api";

export default function AccountPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
const [logoutUser, { isLoading: logoutLoading }] = useLogoutMutation();

  useEffect(() => {
    if (!user) {
      router.replace("/login?redirect=/account");
    }
  }, [user, router]);

  if (!user) return null; 

  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery(undefined, { skip: activeTab !== "orders" });
  const { data: paymentsData, isLoading: paymentsLoading } = useGetUserPaymentsQuery(undefined, { skip: activeTab !== "payments" });

  const handleLogout = async () => {
  try {
    await logoutUser().unwrap();
    dispatch(clearUser());      
    toast.success("Logged out successfully");
    router.push("/");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to logout");
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="flex border-b mb-6">
        {["profile", "orders", "payments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold transition ${
              activeTab === tab
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Profile Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-bold mb-4">My Orders</h2>
            {ordersLoading ? (
              <p>Loading orders...</p>
            ) : ordersData && ordersData.length > 0 ? (
              <ul className="space-y-2">
                {ordersData.map((order: any) => (
                  <li key={order._id} className="p-3 border rounded-md">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ₦{order.totalPrice.toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            {paymentsLoading ? (
              <p>Loading payments...</p>
            ) : paymentsData && paymentsData.length > 0 ? (
              <ul className="space-y-2">
                {paymentsData.map((payment: any) => (
                  <li key={payment._id} className="p-3 border rounded-md">
                    <p><strong>Payment ID:</strong> {payment._id}</p>
                    <p><strong>Method:</strong> {payment.method}</p>
                    <p><strong>Amount:</strong> ₦{payment.amount.toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment records found.</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleLogout}
           disabled={logoutLoading}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
