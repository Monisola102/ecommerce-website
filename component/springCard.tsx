"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty, IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
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

interface SpringInterface {
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

export default function SpringCard({ spring }: { spring: SpringInterface }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [loadingCart, setLoadingCart] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addToCart] = useAddToCartMutation();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // ✅ Fetch reviews and always ensure it's an array
  const { data: reviewsResponse } = useGetReviewsQuery(spring._id);
  const reviews = reviewsResponse?.data ?? [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        reviews.length
      : 0;

  const isLiked = likedProductIds.includes(spring._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(spring._id));

    try {
      if (isLiked) {
        await removeFavorite({
          productId: spring._id,
          size: selectedSize,
        }).unwrap();
      } else {
        await addFavorite({
          productId: spring._id,
          size: selectedSize,
        }).unwrap();
      }
    } catch (error) {
      toast.error("Failed to update favorite.");
      dispatch(toggleLike(spring._id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      const pendingItem = {
        productId: spring._id,
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
        productId: spring._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success(`${spring.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const imageSrc = spring.image || "/fallback.jpg";

  return (
    <div className="relative w-full max-w-[240px] p-2 rounded-lg shadow-sm">
      <div
        className="absolute top-1 right-2 bg-white p-1 text-black text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>

      <Link href={`/product/${spring._id}`} className="block">
        <Image
          className="w-full h-[185px] object-cover"
          src={imageSrc}
          width={250}
          height={240}
          alt={spring.name}
        />
        <p className="text-gray-400 text-[10px] font-inter mt-1">
          {spring.brand?.name}
        </p>
        <p className="text-black text-[12px] font-inter">{spring.name}</p>
        <div className="flex gap-2">
          <p className="text-black font-bold text-[14px]">
            {spring.price}&#163;
          </p>
          <span className="line-through text-gray-400 text-[12px] italic">
            110,00&#163;
          </span>
        </div>
        <div className="flex items-center text-[10px] mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoMdStar
              key={i}
              className={i < avgRating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="ml-1 text-gray-500 text-[9px]">
            ({reviews.length})
          </span>
        </div>
      </Link>
      <div className="mt-2">
        <select
          className="text-[10px] border rounded w-full px-2 py-1"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {spring.sizes.map((s, index) => (
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
          className="bg-blue-400 text-black rounded-3xl px-4 py-2 text-[9px] flex items-center gap-1 hover:cursor-pointer disabled:opacity-50"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4" />{" "}
          {loadingCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
