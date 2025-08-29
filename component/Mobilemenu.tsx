"use client";

import { useState } from "react";
import Link from "next/link";
import { AlignLeft, X, Mail, Phone } from "lucide-react";
import { useOutsideClick } from "@/hooks";

interface MobileMenuProps {
  user: any | null;
  cartCount: number;
  favoritesCount: number;
}

const SideMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
            <Link href="/" onClick={onClose} className="hover:text-yellow-200 transition">HOME</Link>
            <Link href="/Women" onClick={onClose} className="hover:text-yellow-200 transition">WOMEN</Link>
            <Link href="/Men" onClick={onClose} className="hover:text-yellow-200 transition">MEN</Link>
            <Link href="/Kids" onClick={onClose} className="hover:text-yellow-200 transition">KIDS</Link>
            <Link href="/Sale" onClick={onClose} className="hover:text-yellow-200 transition">SALE</Link>
            <Link href="/Brands" onClick={onClose} className="hover:text-yellow-200 transition">BRANDS</Link>
            <Link href="/Support" onClick={onClose} className="hover:text-yellow-200 transition">SUPPORT</Link>
          </nav>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Contact Info */}
          <div className="mt-auto pt-6 border-t border-white/40 text-white text-sm space-y-3">
            <a
              href="mailto:Oyewolemonisola102@gmail.com"
              className="flex items-center gap-2 hover:underline"
            >
              <Mail size={16} /> Oyewolemonisola102@gmail.com
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

      <SideMenu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default MobileMenu;
