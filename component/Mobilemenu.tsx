"use client";

import { AlignLeft, X, Mail, Phone } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { useOutsideClick } from "@/hooks";

interface MobileMenuProps {
  user: any;
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
  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <div className="md:hidden">
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
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
          className="w-[80vw] sm:w-72 bg-black h-full p-8 flex flex-col"
        >
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="hover:bg-orange-300/90 p-2 rounded transition duration-300"
            >
              <X color="white" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-4 text-white font-semibold text-base">
            <Link href="/women" onClick={onClose}>WOMEN</Link>
            <Link href="/men" onClick={onClose}>MEN</Link>
            <Link href="/kids" onClick={onClose}>KIDS</Link>
            <Link href="/sale" onClick={onClose}>SALE</Link>
            <Link href="/support" onClick={onClose}>SUPPORT</Link>
          </nav>

          {/* User Actions */}
          <div className="flex flex-col gap-4 mt-6">
            <Link href={user ? "/account" : "/login"} onClick={onClose} className="flex items-center gap-2 text-white">
              <FaRegUser /> {user ? "Account" : "Login"}
            </Link>

            <Link href="/favorites" onClick={onClose} className="flex items-center gap-2 relative text-white">
              <IoMdHeartEmpty />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {favoritesCount}
                </span>
              )}
              Favorites
            </Link>

            <Link href="/cart" onClick={onClose} className="flex items-center gap-2 relative text-white">
              <AiOutlineShopping />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              Cart
            </Link>

            <button onClick={onClose} className="flex items-center gap-2 text-white">
              <IoSearchOutline /> Search
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Contact Info */}
          <div className="mt-auto pt-6 border-t border-gray-700 text-white text-sm space-y-3">
            <a href="mailto:support@example.com" className="flex items-center gap-2 hover:underline">
              <Mail size={16} /> support@example.com
            </a>
            <a href="tel:+2348001234567" className="flex items-center gap-2 hover:underline">
              <Phone size={16} /> +234 800 123 4567
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
        <AlignLeft className="md:hidden hover:text-darkColor cursor-pointer" />
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
