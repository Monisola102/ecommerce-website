"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignLeft, X, Mail, Phone } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useOutsideClick } from "@/hooks";

interface MobileMenuProps {
  user: any | null;
  cartCount: number;
  favoritesCount: number;
}

const SideMenu = ({
  isOpen,
  onClose,
  user,
  cartCount,
  favoritesCount,
}: MobileMenuProps & { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Side Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          ref={sideBarRef}
          className="w-[80vw] sm:w-72 h-full p-8 flex flex-col
                     bg-gradient-to-b from-pink-300 to-pink-500
                     shadow-lg"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="hover:bg-pink-400/50 p-2 rounded transition duration-300"
            >
              <X color="white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 text-white font-semibold text-base">
            <Link href="/Women" onClick={onClose} className="hover:text-yellow-200 transition">WOMEN</Link>
            <Link href="/Men" onClick={onClose} className="hover:text-yellow-200 transition">MEN</Link>
            <Link href="/Kids" onClick={onClose} className="hover:text-yellow-200 transition">KIDS</Link>
            <Link href="/Sale" onClick={onClose} className="hover:text-yellow-200 transition">SALE</Link>
            <Link href="/support" onClick={onClose} className="hover:text-yellow-200 transition">SUPPORT</Link>
            <Link href="/Brands" onClick={onClose} className="hover:text-yellow-200 transition">BRANDS</Link>
          </nav>

          {/* User / Cart / Favorites / Search */}
          <div className="flex flex-col gap-4 mt-6">
            <Link
              href={user ? "/account" : "/login"}
              onClick={onClose}
              className="flex items-center gap-2 text-white hover:text-yellow-200 transition"
            >
              <FaRegUser /> {user ? "Account" : "Login"}
            </Link>

            <Link
              href="/favorites"
              onClick={onClose}
              className="flex items-center gap-2 relative text-white hover:text-yellow-200 transition"
            >
              <IoMdHeartEmpty />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {favoritesCount}
                </span>
              )}
              Favorites
            </Link>

            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-2 relative text-white hover:text-yellow-200 transition"
            >
              <AiOutlineShopping />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              Cart
            </Link>

            {/* Search Input */}
            <div className="flex items-center gap-2 mt-2 bg-white rounded px-2 py-1">
              <IoSearchOutline className="text-gray-700" />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 text-sm focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      router.push(
                        `/search?query=${encodeURIComponent(target.value.trim())}`
                      );
                      target.value = "";
                      onClose();
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Contact Info */}
          <div className="mt-auto pt-6 border-t border-white/40 text-white text-sm space-y-3">
            <a
              href="mailto:Oyewolemonisola102@gmail.com"
              className="flex items-center gap-2 hover:underline"
            >
              <Mail size={16} />Oyewolemonisola102@gmail.com
            </a>
            <a
              href="tel:+2348020937309"
              className="flex items-center gap-2 hover:underline"
            >
              <Phone size={16} /> +234 8020937309
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileMenu = ({ user, cartCount, favoritesCount }: MobileMenuProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsSidebarOpen(true)}>
        <AlignLeft className="md:hidden hover:text-pink-600 cursor-pointer" />
      </button>

      <SideMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        cartCount={cartCount}
        favoritesCount={favoritesCount}
      />
    </>
  );
};

export default MobileMenu;
