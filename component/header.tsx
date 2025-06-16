import Image from "next/image";
import Link from "next/link";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { PiMapPinLineBold } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { TiMicrophoneOutline } from "react-icons/ti";
import { LuScanQrCode } from "react-icons/lu";

export default function Header() {
  return (
    <header className="py-1 px-10 font-inter">
      <div className="flex justify-between items-center">
        <div>
          <Image src="/logoo.png" alt="logo" width={70} height={50} />
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/support"
            className="flex items-center gap-1 text-black-500"
          >
            <MdOutlineHeadsetMic />
            <p className="text-[12px]  leading-[24px] font-normal">Support</p>
          </Link>
          <Link
            href="/find-store"
            className="flex items-center gap-1 text-black-500"
          >
            <PiMapPinLineBold />
            <p className="text-[12px] leading-[24px] font-normal">
              Find a store
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="text-black-500"
            aria-label="Favorites"
          >
            <IoMdHeartEmpty />
          </Link>
          <Link href="/account" className="text-black-500" aria-label="Account">
            <FaRegUser className="text-sm" />
          </Link>
          <Link href="/cart" className="text-black-500" aria-label="Cart">
            <AiOutlineShopping />
          </Link>
        </div>
      </div>
      <nav
        aria-label="product-categories"
        className=" flex items-center space-x-4 my-4 border-b border-gray-200"
      >
        <Link
          href="/Women"
          className="text-[14px] text-black-500 leading-[24px] font-bold  hover:font-normal transition-all duration-300 "
        >
          <p>WOMEN</p>
        </Link>
        <Link
          href="/Men"
          className="text-[14px] text-black-500 leading-[24px] hover:font-bold transition-all duration-300"
        >
          <p>MEN</p>
        </Link>
        <Link
          href="/Kids"
          className="text-[14px] text-black-500 leading-[24px] hover:font-bold transition-all duration-300"
        >
          <p>KIDS</p>
        </Link>
      </nav>
      <div className="flex justify-between items-center">
        <nav className="flex justify-between space-x-4 font-inter">
          <Link
            href="/Sale"
            className="text-black-500 leading-[24px] hover:font-bold transition-all duration-300 text-xs"
          >
            <p>SALE</p>
          </Link>
          <Link
            href="/New"
            className="text-black-500 leading-[24px] hover:font-bold transition-all duration-300 text-xs"
          >
            <p>NEW IN</p>
          </Link>
          <Link
            href="/Clothing"
            className="text-black-500 leading-[24px] hover:font-bold transition-all duration-300 text-xs"
          >
            <p>CLOTHING</p>
          </Link>
          <Link
            href="/Shoes"
            className="text-black-500 leading-[24px] hover:font-bold transition-all duration-300 text-xs"
          >
            <p>SHOES</p>
          </Link>
          <Link
            href="/Accesories"
            className="text-black-500  leading-[24px] hover:font-bold transition-all duration-300 text-xs"
          >
            <p>ACCESSORIES</p>
          </Link>
          <Link
            href="/Brands"
            className="text-black-500 leading-[24px]  hover:font-bold transition-all duration-300 text-xs"
          >
            BRANDS
          </Link>
        </nav>
        <div className="flex relative w-80 ">
          <input
            type="text"
            placeholder="Search products,articles,faq,..."
            className="text-black-500 text-sm w-full py-2 pl-10 pr-10  border border-black-500 focus:outline-none  focus:ring-orange-500"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-black-500" />
          <div className="flex space-x-3 absolute right-3 top-1/2 -translate-y-1/2 items-center">
            <TiMicrophoneOutline className=" text-black-500 cursor-pointer" />
            <div className="w-px h-6 bg-black-500">|</div>
            <LuScanQrCode className="text-black-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}
