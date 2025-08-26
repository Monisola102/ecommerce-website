"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  useFetchUserQuery,
  useGetUserPaymentsQuery,
} from "@/store/Features/auth/auth-api";

function getPaymentIcon(method: string): string {
  const lowerMethod = method.toLowerCase();
  if (lowerMethod.includes("visa")) return "/icons/visa.png";
  if (lowerMethod.includes("master")) return "/icons/mastercard.png";
  if (lowerMethod.includes("paypal")) return "/icons/paypal.png";
  if (lowerMethod.includes("bank")) return "/icons/bank.png";
  if (lowerMethod.includes("ussd")) return "/icons/ussd.png";
  return "/icons/default-card.png";
}

export default function PaymentsPage() {
  const { data: userResponse, isLoading: userLoading } = useFetchUserQuery();
  const {
    data: paymentsResponse,
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useGetUserPaymentsQuery();

  const localUser = useSelector((state: RootState) => state.auth.user);
  const payments = paymentsResponse || [];

  if (userLoading || paymentsLoading) {
    return <p className="text-center mt-6">Loading payments...</p>;
  }

  if (!userResponse?.data || !localUser) {
    return (
      <p className="text-center mt-6 text-red-600">
        Please log in to view your payment history.
      </p>
    );
  }

  if (paymentsError) {
    return (
      <p className="text-center mt-6 text-red-600">
        Failed to load payment history.
      </p>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Payment History</h1>

      {payments.length === 0 ? (
        <p className="text-gray-600 text-center">No payments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <Image
                  src={getPaymentIcon(payment.paymentMethod)}
                  alt={payment.paymentMethod}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-700">
                  Order ID:{" "}
                  <span className="font-mono text-gray-500">
                    {payment.order || "N/A"}
                  </span>
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Amount:</strong> ₦{payment.amount.toLocaleString()}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Method:</strong> {payment.paymentMethod}
                </p>
                <p className="mt-1">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status.toLowerCase() === "success"
                        ? "bg-green-100 text-green-700"
                        : payment.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Date: {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
