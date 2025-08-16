"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { clearUser } from "@/store/Features/auth/auth-slice";
import { useAppDispatch } from "@/store/hook";
import { LayoutDashboard, ShoppingBag, User, CreditCard, LogOut } from "lucide-react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearUser());

    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-red-400 p-6 border-r">
        <h2 className="text-xl font-semibold mb-6">My Account</h2>
        <nav className="space-y-4">
          <Link href="/account" className="flex items-center gap-2 hover:text-white"> <LayoutDashboard size={18} />Dashboard</Link>
          <Link href="/account/orders" className="flex items-center gap-2 hover:text-white"> <ShoppingBag size={18} /> Orders</Link>
          <Link href="/account/profile" className="flex items-center gap-2 hover:text-white"><User size={18} /> Profile</Link>
          <Link href="/account/payments" className="flex items-center gap-2 hover:text-white"><User size={18} /> Payments</Link>
          <button
            onClick={handleLogout}
            className="text-left text-black hover:underline"
          >
           <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
