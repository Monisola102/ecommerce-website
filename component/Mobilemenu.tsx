"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignLeft, X, Mail, Phone } from "lucide-react";
import { useOutsideClick } from "@/hooks";
import { IoSearchOutline } from "react-icons/io5";

interface MobileMenuProps {
  user: any | null;
  cartCount: number;
  favoritesCount: number;
}

const SideMenu = ({
  isOpen,
  onClose,
}: MobileMenuProps & { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      onClose();
    }
  };

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
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="hover:bg-pink-400/50 p-2 rounded transition duration-300"
            >
              <X color="white" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-white font-semibold text-base">
                        <Link
              href="/"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              HOME
            </Link>
            <Link
              href="/Women"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              WOMEN
            </Link>
            <Link
              href="/Men"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              MEN
            </Link>
            <Link
              href="/Kids"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              KIDS
            </Link>
            <Link
              href="/Sale"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              SALE
            </Link>
            <Link
              href="/support"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              SUPPORT
            </Link>
            <Link
              href="/Brands"
              onClick={onClose}
              className="hover:translate-x-1 transition-transform duration-200"
            >
              BRANDS
            </Link>
          </nav>
       <div className="flex items-center gap-2 mt-6 bg-white rounded px-2 py-1">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="flex-1 text-sm focus:outline-none min-w-0"
  />
  <button
    onClick={handleSearch}
    className="p-2 flex-shrink-0"
    aria-label="Search"
  >
    <IoSearchOutline className="text-gray-700" size={18} />
  </button>
</div>
          <div className="flex-grow" />
          <div className="mt-auto pt-6 border-t border-white/40 text-white text-sm space-y-3">
         <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=Oyewolemonisola102@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"
>
  <Mail size={16} color="text-white" /> Oyewolemonisola102@gmail.com
</a>
            <a
              href="tel:+2348020937309"
              className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200"
            >
              <Phone size={16} className="text-white" /> +234 8020937309
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
