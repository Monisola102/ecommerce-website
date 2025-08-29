"use client";

import Link from "next/link";
import { MdOutlineHeadsetMic } from "react-icons/md";
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
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    if (showSearch) {
      const input = document.getElementById("search-input");
      input?.focus();
    }
  }, [showSearch]);

  return (
    <header className="container py-2 px-4 sm:px-6 lg:px-10 relative">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        {/* Left: MobileMenu + Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <MobileMenu
            user={user}
            cartCount={cartCount}
            favoritesCount={favoritesCount}
          />
          <Logo />
        </div>

        {/* Middle: Desktop Search + Support */}
        <div className="hidden md:flex items-center gap-4 relative">
          <Link
            href="/support"
            className="flex items-center gap-1 text-gray-700 hover:text-black transition"
          >
            <MdOutlineHeadsetMic />
            <p className="text-xs lg:text-sm">Support</p>
          </Link>

          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="text-gray-700 hover:text-black"
              aria-label="Open search"
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
              className="flex items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-1 rounded-full shadow-md w-48 lg:w-64"
            >
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="rounded-full px-3 py-1 w-full text-xs lg:text-sm focus:outline-none"
                onKeyDown={handleKeyPress}
              />
              <button type="submit" className="ml-2 text-white px-2" aria-label="Search">
                <IoSearchOutline size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Right: Desktop User Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/favorites" className="relative inline-block">
            <IoMdHeartEmpty size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link href="/account">
              <FaRegUser size={18} />
            </Link>
          ) : (
            <Link href="/login" className="text-xs lg:text-sm font-medium">
              Log In
            </Link>
          )}

          <Link href="/cart" className="relative inline-block">
            <AiOutlineShopping size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="hidden md:flex items-center space-x-4 border-b border-gray-200 mt-3 text-sm lg:text-base">
        <Link href="/" className="font-semibold hover:opacity-70">HOME</Link>
        <Link href="/women" className="hover:opacity-70">WOMEN</Link>
        <Link href="/men" className="hover:opacity-70">MEN</Link>
        <Link href="/kids" className="hover:opacity-70">KIDS</Link>
      </nav>

      {/* Sub Nav */}
      <div className="hidden md:flex justify-start items-center mt-1 text-xs lg:text-sm space-x-4">
        <Link href="/sale" className="hover:opacity-70">SALE</Link>
        <Link href="/brands" className="hover:opacity-70">BRANDS</Link>
      </div>
    </header>
  );
}
