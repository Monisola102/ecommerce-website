"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty, IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
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
}

interface trendInterface {
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

export default function TrendCard({ trend }: { trend: trendInterface }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [addToCart] = useAddToCartMutation();

  const { data: reviews } = useGetReviewsQuery(trend._id);
  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        reviews.length
      : 0;

  const isLiked = likedProductIds.includes(trend._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(trend._id));

    try {
      if (isLiked) {
        await removeFavorite({ productId: trend._id, size: selectedSize }).unwrap();
      } else {
        await addFavorite({ productId: trend._id, size: selectedSize }).unwrap();
      }
    } catch (error) {
      toast.error("Failed to update favorite.");
      dispatch(toggleLike(trend._id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      const pendingItem = {
        productId: trend._id,
        size: selectedSize,
        quantity: 1,
      };
      localStorage.setItem("pendingCartItem", JSON.stringify(pendingItem));
      router.push(`/login?redirect=/cart`);
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
        productId: trend._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success(`${trend.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <div className="relative w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-3 rounded-lg shadow-sm bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* ❤️ Like button */}
      <div
        className="absolute top-2 right-2 bg-white p-1 text-black text-md rounded-full shadow z-10 cursor-pointer hover:bg-gray-100 transition"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>

      {/* 📸 Clickable Product Image + Name */}
      <Link href={`/product/${trend._id}`} className="block">
        <div className="w-full h-44 sm:h-48 md:h-52 lg:h-56 relative rounded overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            src={trend.image}
            fill
            alt={trend.name}
            priority
          />
        </div>
        <p className="text-gray-500 text-[10px] mt-1 truncate">{trend.brand?.name}</p>
        <p className="text-black text-[12px] font-medium truncate">{trend.name}</p>
      </Link>

      {/* 💰 Price */}
      <div className="flex gap-2 mt-1 items-center">
        <p className="text-black font-bold text-[14px]">{trend.price}&#163;</p>
        <span className="line-through text-gray-400 text-[12px] italic">
          110,00&#163;
        </span>
      </div>

      {/* ⭐ Dynamic Rating */}
      <div className="flex items-center text-[10px] mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <IoMdStar
            key={i}
            className={i < avgRating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-gray-500 text-[9px]">
          ({reviews?.length || 0})
        </span>
      </div>

      {/* 👕 Sizes */}
      <div className="mt-2">
        <select
          className="text-[10px] border rounded w-full px-2 py-1"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {trend.sizes.map((s, index) => (
            <option key={index} value={s.size} disabled={s.stock === 0}>
              Size {s.size} {s.stock === 0 ? "(Out of stock)" : `- ${s.stock} left`}
            </option>
          ))}
        </select>
      </div>

      {/* 🛒 Add to Cart */}
      <div className="flex justify-center mt-3">
        <button
          disabled={loadingCart}
          className="bg-blue-400 text-black rounded-3xl px-4 py-2 text-[10px] flex items-center gap-1 hover:opacity-90 transition duration-300 disabled:opacity-50"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4" />
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
