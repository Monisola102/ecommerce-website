"use client";

import { useGetOrdersQuery } from "@/store/Features/order/order-api";

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  if (isLoading) return <p className="text-center p-4">Loading orders...</p>;
  if (isError) return <p className="text-center p-4 text-red-500">Error fetching orders</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {(!orders || orders.length === 0) ? (
        <p className="text-gray-600">You don’t have any orders yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow p-4 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-500">
                  #{order._id.slice(-6)}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <p>Items: {order.items.length}</p>
              </div>

              <div className="mt-4 border-t pt-2">
                {order.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{item.product.name}</span>
                    <span>
                      {item.quantity} × ${item.priceAtOrderTime.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
