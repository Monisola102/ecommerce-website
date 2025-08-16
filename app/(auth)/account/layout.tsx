"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { clearUser } from "@/store/Features/auth/auth-slice";
import { useAppDispatch } from "@/store/hook";
export default function AccountLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearUser());

    window.location.href = "/login";
  };
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-red-400 p-6 border-r">
        <h2 className="text-xl font-semibold mb-6">My Account</h2>
        <nav className="space-y-4">
          <Link href="/account" className="block hover:text-blue-600">Dashboard</Link>
          <Link href="/account/orders" className="block hover:text-blue-600">Orders</Link>
          <Link href="/account/profile" className="block hover:text-blue-600">Profile</Link>
          <Link href="/account/payments" className="block hover:text-blue-600">Payments</Link>
          <button
            onClick={handleLogout}
            className="text-left text-red-600 hover:underline"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
