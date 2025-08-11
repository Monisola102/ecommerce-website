"use client";

import Image from "next/image";
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
}

interface menInterface {
  _id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  size: SizeType[];
}

export default function MenCard({ men }: { men: menInterface }) {
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
        await removeFavorite(men._id).unwrap();
      } else {
        await addFavorite(men._id).unwrap();
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
const imageSrc = men.image?.startsWith("http")
    ? men.image
    : men.image
    ? `http://localhost:5000${
        men.image.startsWith("/") ? men.image : "/" + men.image
      }`
    : "/fallback.jpg";
  return (
    <div className="relative w-full max-w-[200px] ">
      <div
        className=" absolute top-1 right-8 bg-white p-1 text-black text-md"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>
      <div>
        <Image
          className="w-[170.24px] h-[185px] object-cover"
          src={imageSrc}
          width={170}
          height={185}
          alt="trendImage"
        />
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-inter">{men.brand}</p>
        <p className="text-black text-[12px] font-inter">{men.name}</p>
        <div className="flex gap-2">
          <p className="text-black font-bold text-[14px]">{men.price}&#163;</p>
          <span className="line-through  text-gray-400 text-[12px] italic ">
            110,00&#163;
          </span>
        </div>
        <div className="flex text-[10px]">
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
        </div>
        <div className="mt-2">
          <select
            className="text-[10px] border rounded w-full px-2 py-1"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {men.size.map((s, index) => (
              <option key={index} value={s.size} disabled={s.stock === 0}>
                Size {s.size} {s.stock === 0 ? "(Out of stock)" : `- ${s.stock} left`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-3">
          <button
            className="bg-gradient-to-r from-blue-700 via-green-600 to-gray-800 text-white rounded-3xl  px-4 py-2 text-[9px] flex items-center gap-1 hover: cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingCart className=" w-4 text-white" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
