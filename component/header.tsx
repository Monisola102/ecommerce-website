"use client";

import Link from "next/link";
import { MdInput, MdOutlineHeadsetMic } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import MobileMenu from "./Mobilemenu";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCartQuery } from "@/store/Features/cart/cart-api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetFavoritesQuery } from "@/store/Features/like/like-api";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { data: cartData } = useGetCartQuery();
  const { data: favorites } = useGetFavoritesQuery();
  const user = useSelector((state: RootState) => state.auth.user);

  const cartCount = cartData?.totalQuantity || 0;
  const favoritesCount = favorites?.length || 0;

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (showSearch) {
      const input = document.getElementById("search-input");
      input?.focus();
    }
  }, [showSearch]);

  return (
    <header className="container py-1 px-10 relative">
      <div className="flex justify-between">
        <div className="w-full md:w-1/3 flex justify-start">
          <MobileMenu />
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-4 relative">
          <Link
            href="/support"
            className="flex items-center gap-1 text-black-500"
          >
            <MdOutlineHeadsetMic />
            <p className="text-[12px] leading-[24px]">Support</p>
          </Link>
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="text-black-500"
              title="Search"
            >
              <IoSearchOutline size={20} />
            </button>
          )}
          {showSearch && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-1 rounded-full shadow-md"
            >
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="rounded-full px-4 py-2 w-full text-sm focus:outline-none"
                onKeyDown={handleKeyPress}
              />
              <button
                type="submit"
                className="ml-2 text-white font-bold text-lg px-3 py-2 rounded-full hover:scale-110 transition-transform"
                title="Search"
              >
                <IoSearchOutline size={20} color="black" />
              </button>
            </form>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/favorites" className="relative inline-block">
            <IoMdHeartEmpty size={18} />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>
          {user ? (
            <Link href="/account">
              <FaRegUser size={16} />
            </Link>
          ) : (
            <Link href="/login" className="text-xs font-medium">
              Log In
            </Link>
          )}
          <Link href="/cart" className="relative inline-block">
            <AiOutlineShopping size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav
        aria-label="product-categories"
        className="flex items-center space-x-4 border-b border-gray-200 mt-4"
      >
        <Link
          href="/Women"
          className="text-[14px] text-black-500 font-bold hover:font-normal transition-all duration-300"
        >
          <p>WOMEN</p>
        </Link>
        <Link
          href="/Men"
          className="text-[14px] text-black-500 hover:font-bold transition-all duration-300"
        >
          <p>MEN</p>
        </Link>
        <Link
          href="/Kids"
          className="text-[14px] text-black-500 hover:font-bold transition-all duration-300"
        >
          <p className="font-poppins">KIDS</p>
        </Link>
      </nav>

      {/* Sub Navigation */}
      <div className="flex justify-between items-center">
        <nav className="flex justify-between space-x-4 mb-2">
          <Link
            href="/Sale"
            className="text-black-500 hover:font-bold transition-all duration-300 text-xs"
          >
            <p>SALE</p>
          </Link>
        <Link
            href="/New"
            className="text-black-500 hover:font-bold transition-all duration-300 text-xs"
          >
            <p>NEW IN</p>
          </Link>
          <Link
            href="/Brands"
            className="text-black-500 hover:font-bold transition-all duration-300 text-xs"
          >
            BRANDS
          </Link>
        </nav>
      </div>
    </header>
  );
}
