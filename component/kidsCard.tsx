"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty, IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { openCart } from "@/store/Features/cart/cart-slice";
import { useRouter } from "next/navigation";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { toast } from "react-toastify";
import { toggleLike } from "@/store/Features/like/like-slice";
import { useAddFavoriteMutation, useRemoveFavoriteMutation } from "@/store/Features/like/like-api";
import { useGetReviewsQuery } from "@/store/products/product-api";

interface SizeType {
  size: string;
  stock: number;
  _id: string;
}

interface KidsInterface {
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

export default function KidsCard({ kids }: { kids: KidsInterface }) {
  const [loadingCart, setLoadingCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [addToCart] = useAddToCartMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const isLiked = likedProductIds.includes(kids._id);

  // ✅ Fetch reviews safely like TrendCard
  const { data: reviewsResponse } = useGetReviewsQuery(kids._id);
  const reviews = reviewsResponse?.data ?? []; // always array
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length
      : 0;

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(kids._id));

    try {
      if (isLiked) {
        await removeFavorite({ productId: kids._id, size: selectedSize }).unwrap();
      } else {
        await addFavorite({ productId: kids._id, size: selectedSize }).unwrap();
      }
    } catch (error) {
      toast.error("Failed to update favorite.");
      dispatch(toggleLike(kids._id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      const pendingItem = { productId: kids._id, size: selectedSize, quantity: 1 };
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
      await addToCart({ productId: kids._id, size: selectedSize, quantity: 1 }).unwrap();
      toast.success(`${kids.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const imageSrc = kids.image || "/fallback.jpg";

  return (
    <div className="relative w-full max-w-[160px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] p-2 rounded-lg shadow-sm">
      {/* ❤️ Like Button */}
      <div
        className="absolute top-1 right-2 bg-white p-1 text-black text-sm sm:text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>
      <Link href={`/product/${kids._id}`} className="block">
        <div className="flex justify-center">
          <Image
            className="w-[140px] h-[160px] sm:w-[170px] sm:h-[185px] md:w-[190px] md:h-[200px] lg:w-[210px] lg:h-[230px] object-cover rounded-md"
            src={imageSrc}
            width={210}
            height={230}
            alt={kids.name}
          />
        </div>

        {/* Product Info */}
        <div className="mt-2">
          <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs font-inter truncate">
            {kids.brand?.name}
          </p>
          <p className="text-black text-[11px] sm:text-[12px] md:text-sm font-inter truncate">
            {kids.name}
          </p>

          {/* Price */}
          <div className="flex gap-2 items-center">
            <p className="text-black font-bold text-xs sm:text-sm md:text-base">{kids.price}&#163;</p>
            <span className="line-through text-gray-400 text-[10px] sm:text-xs italic">
              110,00&#163;
            </span>
          </div>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoMdStar
                key={i}
                className={
                  i < avgRating
                    ? "text-yellow-500 text-[8px] sm:text-[10px] md:text-xs"
                    : "text-gray-300 text-[8px] sm:text-[10px] md:text-xs"
                }
              />
            ))}
            <span className="ml-1 text-gray-500 text-[8px] sm:text-[9px] md:text-xs">
              ({reviews.length})
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-2">
        <select
          className="text-[9px] sm:text-[10px] md:text-xs border rounded w-full px-2 py-1"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {kids.sizes.map((s, index) => (
            <option key={index} value={s.size} disabled={s.stock === 0}>
              Size {s.size} {s.stock === 0 ? "(Out of stock)" : `- ${s.stock} left`}
            </option>
          ))}
        </select>
      </div>

      {/* 🛒 Add to Cart */}
      <div className="flex justify-center mt-3">
        <button
          className="bg-gradient-to-r from-pink-200 via-blue-200 to-green-200 text-gray-700 rounded-3xl px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] md:text-xs flex items-center gap-1 hover:brightness-105 hover:scale-105 transition duration-300"
          onClick={handleAddToCart}
          disabled={loadingCart}
        >
          <ShoppingCart className="w-3 sm:w-4" />
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
