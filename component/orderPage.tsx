"use client";

import { useGetOrdersQuery } from "@/store/Features/order/order-api";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const { data, isLoading, isError } = useGetOrdersQuery();
console.log("Orders API response:", data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;

  const orders = data?.orders || [];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="p-4 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  Order #{order._id.slice(-6)} {/* show last 6 chars */}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium">${order.totalPrice}</p>
              </div>

              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0",
                  order.status === "Delivered" && "bg-green-100 text-green-600",
                  order.status === "Processing" && "bg-yellow-100 text-yellow-600",
                  order.status === "Pending" && "bg-red-100 text-red-600",
                  order.status === "Shipped" && "bg-blue-100 text-blue-600"
                )}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
