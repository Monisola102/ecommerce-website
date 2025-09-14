"use client";
import Link from "next/link";
import { clearUser } from "@/store/Features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { clearCartState } from "@/store/Features/cart/cart-slice";
import { useClearCartMutation } from "@/store/Features/cart/cart-api";
import { clearLikes } from "@/store/Features/like/like-slice";
import { MdHome } from "react-icons/md";  
export default function AccountSidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [clearCart] = useClearCartMutation();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      if (user) await clearCart().unwrap();

      dispatch(clearUser());
      dispatch(clearCartState());
      dispatch(clearLikes());
      localStorage.removeItem("pendingCartItem");

      toast.success("Logout successful!");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      toast.error("Error during logout");
    }
  };

  return (
    <div className="relative md:flex">
      <button
        className="md:hidden absolute top-4 left-4 p-1 bg-red-400 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-red-400 p-6 border-r transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <h2 className="text-xl font-semibold mb-6">My Account</h2>
        <nav className="space-y-4 mt-6">
           <Link
            href="/"
            className="flex items-center gap-2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <MdHome size={18} /> Home
          </Link>
          <Link
            href="/account/dashboard"
            className="flex items-center gap-2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            href="/account/orders"
            className="flex items-center gap-2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag size={18} /> Orders
          </Link>
          <Link
            href="/account/profile"
            className="flex items-center gap-2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <User size={18} /> Profile
          </Link>
          <Link
            href="/account/payments"
            className="flex items-center gap-2 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <CreditCard size={18} /> Payments
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-black hover:underline"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
