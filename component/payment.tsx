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
  if (lowerMethod.includes("verve")) return "/icons/verve.png";
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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payments found.</p>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow"
            >
              <Image
                src={getPaymentIcon(payment.method)}
                alt={payment.method}
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <p>
                  <strong>Order ID:</strong> {payment.orderId || "N/A"}
                </p>
                <p>
                  <strong>Amount:</strong> ₦{payment.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Method:</strong> {payment.method}
                </p>
                <p>
                  <strong>Status:</strong> {payment.status}
                </p>
                <p className="text-sm text-gray-500">
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
