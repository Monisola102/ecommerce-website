"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openCart } from "@/store/Features/cart/cart-slice";
import { useRouter } from "next/navigation";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { toast } from "react-toastify";
import { toggleLike } from "@/store/Features/like/like-slice";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/store/Features/like/like-api";

interface SizeType {
  size: string;
  stock: number;
  _id: string;
}

interface MenInterface {
  _id: string;
  image: string;
  brand: {
    _id: string;
    name: string;
  };
  name: string;
  price: number;
  sizes: SizeType[];
}

export default function MenCard({ men }: { men: MenInterface }) {
  const [loadingCart, setLoadingCart] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const isLiked = likedProductIds.includes(men._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(men._id));

    try {
      if (isLiked) {
        await removeFavorite({
          productId: men._id,
          size: selectedSize,
        }).unwrap();
      } else {
        await addFavorite({ productId: men._id, size: selectedSize }).unwrap();
      }
    } catch (error) {
      toast.error("Failed to update favorite.");
      dispatch(toggleLike(men._id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart");
      const pendingItem = {
        productId: men._id,
        quantity: 1,
        size: selectedSize,
      };
      localStorage.setItem("pendingCartItem", JSON.stringify(pendingItem));
      router.push(`/account?redirect=/cart`);
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    if (loadingCart) return;
    setLoadingCart(true);
    try {
      await addToCart({
        productId: men._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success(`${men.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const imageSrc = men.image || "/fallback.jpg";

  return (
    <div className="relative w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] p-2 rounded-lg shadow-sm">
      {/* ❤️ Like button */}
      <div
        className="absolute top-1 right-2 bg-white p-1 text-black text-sm sm:text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>

      {/* 📸 Clickable product preview */}
      <Link href={`/product/${men._id}`} className="block">
        <Image
          className="w-[140px] h-[160px] sm:w-[160px] sm:h-[175px] md:w-[170px] md:h-[185px] object-cover mx-auto"
          src={imageSrc}
          width={170}
          height={185}
          alt={men.name}
        />
        <p className="text-gray-400 text-[9px] sm:text-[10px] font-inter">
          {men.brand?.name}
        </p>
        <p className="text-black text-[11px] sm:text-[12px] font-inter">
          {men.name}
        </p>
        <div className="flex gap-2">
          <p className="text-black font-bold text-[12px] sm:text-[14px]">
            {men.price}&#163;
          </p>
          <span className="line-through text-gray-400 text-[10px] sm:text-[12px] italic">
            110,00&#163;
          </span>
        </div>
        <div className="flex text-[9px] sm:text-[10px]">
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
        </div>
      </Link>

      {/* 👕 Size dropdown */}
      <div className="mt-2">
        <select
          className="text-[9px] sm:text-[10px] border rounded w-full px-2 py-1"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {men.sizes.map((s, index) => (
            <option key={index} value={s.size} disabled={s.stock === 0}>
              Size {s.size}{" "}
              {s.stock === 0 ? "(Out of stock)" : `- ${s.stock} left`}
            </option>
          ))}
        </select>
      </div>

      {/* 🛒 Add to cart */}
      <div className="flex justify-center mt-3">
        <button
          className="bg-gradient-to-r from-blue-700 via-green-600 to-gray-800 text-white rounded-3xl px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-[10px] flex items-center gap-1 hover:cursor-pointer disabled:opacity-50"
          onClick={handleAddToCart}
          disabled={loadingCart}
        >
          <ShoppingCart className="w-3 sm:w-4 text-white" />{" "}
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
