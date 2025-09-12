"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty, IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { openCart } from "@/store/Features/cart/cart-slice";
import { toggleLike } from "@/store/Features/like/like-slice";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/store/Features/like/like-api";
import { useGetReviewsQuery } from "@/store/products/product-api";

interface SizeType {
  size: string;
  stock: number;
  _id: string;
}

interface WomenInterface {
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

export default function WomenCard({ women }: { women: WomenInterface }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { data: reviewsResponse } = useGetReviewsQuery(women._id);
  const reviews = reviewsResponse?.data ?? []; 
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length
      : 0;

  const isLiked = likedProductIds.includes(women._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(women._id));

    try {
      if (isLiked) {
        await removeFavorite({ productId: women._id, size: selectedSize }).unwrap();
      } else {
        await addFavorite({ productId: women._id, size: selectedSize }).unwrap();
      }
    } catch (error) {
      toast.error("Failed to update favorite.");
      dispatch(toggleLike(women._id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to your cart.");
      const pendingItem = { productId: women._id, size: selectedSize, quantity: 1 };
      localStorage.setItem("pendingCartItem", JSON.stringify(pendingItem));
      router.push(`/login?redirect=/cart`);
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (loadingCart) return;

    setLoadingCart(true);
    try {
      await addToCart({ productId: women._id, size: selectedSize, quantity: 1 }).unwrap();
      toast.success(`${women.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const imageSrc = women.image || "/fallback.jpg";

  return (
    <div className="relative w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] p-2 rounded-lg shadow-sm">
      <div
        className="absolute top-1 right-2 bg-white p-1 text-black text-sm sm:text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>
      <Link href={`/product/${women._id}`} className="block">
        <Image
          className="w-[140px] h-[160px] sm:w-[160px] sm:h-[175px] md:w-[170px] md:h-[185px] object-cover mx-auto"
          src={imageSrc}
          width={170}
          height={185}
          alt={women.name}
        />
        <p className="text-gray-400 text-[9px] sm:text-[10px] font-inter mt-1">
          {women.brand?.name}
        </p>
        <p className="text-black text-[11px] sm:text-[12px] font-inter">
          {women.name}
        </p>
        <div className="flex gap-2">
          <p className="text-black font-bold text-[12px] sm:text-[14px]">
            {women.price}&#163;
          </p>
          <span className="line-through text-gray-400 text-[10px] sm:text-[12px] italic">
            110,00&#163;
          </span>
        </div>
        <div className="flex items-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoMdStar
              key={i}
              className={
                i < avgRating
                  ? "text-yellow-500 text-[9px] sm:text-[10px]"
                  : "text-gray-300 text-[9px] sm:text-[10px]"
              }
            />
          ))}
          <span className="ml-1 text-gray-500 text-[8px] sm:text-[9px]">
            ({reviews.length})
          </span>
        </div>
      </Link>
      <div className="mt-2">
        <select
          className="text-[9px] sm:text-[10px] border rounded w-full px-2 py-1"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {women.sizes.map((s, index) => (
            <option key={index} value={s.size} disabled={s.stock === 0}>
              Size {s.size}{" "}
              {s.stock === 0 ? "(Out of stock)" : `- ${s.stock} left`}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center mt-3">
        <button
          disabled={loadingCart}
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-3xl px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-[10px] flex items-center gap-1 hover:cursor-pointer disabled:opacity-50"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-3 sm:w-4 text-white" />{" "}
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
