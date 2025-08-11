"use client";
import React from "react";
import { useFetchUserDashboardQuery } from "@/store/Features/auth/auth-api";

export default function DashboardPage() {
  const { data, isLoading, isError } = useFetchUserDashboardQuery();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError || !data) return <p>Error loading dashboard</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Welcome, {data.name}</h2>
      <p>Email: {data.email}</p>

      <div className="mt-4">
        <p><strong>Shipping Address:</strong> {data.shippingAddress || "Not set"}</p>
        <p><strong>Cart Items:</strong> {data.cartCount}</p>
        <p><strong>Favorites:</strong> {data.favoritesCount}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Recent Orders</h3>
        <ul>
          {data.recentOrders.map((order) => (
            <li key={order._id} className="border p-2 my-2">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
