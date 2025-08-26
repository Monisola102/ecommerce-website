"use client";
import React from "react";
import { useFetchUserDashboardQuery } from "@/store/Features/auth/auth-api";

function formatAddress(address: any) {
  if (!address) return "Not set";
  return `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
}

export default function DashboardPage() {
  const { data, isLoading, isError } = useFetchUserDashboardQuery();

  if (isLoading)
    return <p className="text-center p-6">Loading dashboard...</p>;
  if (isError || !data)
    return (
      <p className="text-center p-6 text-red-500">
        Error loading dashboard
      </p>
    );

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {data.name}</h1>
          <p className="text-gray-500">{data.email}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
          <p className="text-gray-500 text-sm">Cart Items</p>
          <p className="text-2xl font-bold mt-2">{data.cartCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
          <p className="text-gray-500 text-sm">Favorites</p>
          <p className="text-2xl font-bold mt-2">{data.favoritesCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
          <p className="text-gray-500 text-sm">Shipping Address</p>
          <p className="text-center text-gray-700 mt-2">
            {formatAddress(data.shippingAddress)}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recent Orders</h2>

        {data.recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.recentOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-1">
                  <p className="text-gray-500 text-sm">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center gap-4">
                  <p className="font-semibold text-gray-700">
                    Total: ${order.total}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
