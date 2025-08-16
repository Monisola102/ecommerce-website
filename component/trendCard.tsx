"use client";

import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { ShoppingCart } from "lucide-react";
import { useState , useEffect} from "react";
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

interface SizeType {
  size: string;
  stock: number;
}

interface trendInterface {
  _id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  sizes: SizeType[];
}

export default function TrendCard({ trend }: { trend: trendInterface }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const { user, loading: authLoading } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [addToCart] = useAddToCartMutation();

  const isLiked = likedProductIds.includes(trend._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(trend._id));

    try {
      if (isLiked) {
        await removeFavorite(trend._id).unwrap();
      } else {
        await addFavorite(trend._id).unwrap();
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
  }
  useEffect(() => {
    if (user) {
      const pendingItem = localStorage.getItem("pendingCartItem");
      if (pendingItem) {
        const { productId, size, quantity } = JSON.parse(pendingItem);
        addToCart({ productId, size, quantity })
          .unwrap()
          .then(() => {
            toast.success("Item added to cart after login!");
            dispatch(openCart());
            localStorage.removeItem("pendingCartItem");
          })
          .catch(() => {
            toast.error("Failed to add pending item to cart.");
          });
      }
    }
  }, [user, addToCart, dispatch]);
    if (authLoading) return null;

  return (
    <div className="relative w-full max-w-[200px] p-2 rounded-lg shadow-sm">
      <div
        className="absolute top-1 right-2 bg-white p-1 text-black text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>

      <div>
        <Image
          className="w-[170px] h-[185px] object-cover"
          src={trend.image}
          width={170}
          height={185}
          alt={trend.name}
        />
      </div>

      <div className="mt-2">
        <p className="text-gray-400 text-[10px]">{trend.brand}</p>
        <p className="text-black text-[12px]">{trend.name}</p>

        <div className="flex gap-2 mt-1">
          <p className="text-black font-bold text-[14px]">
            {trend.price}&#163;
          </p>
          <span className="line-through text-gray-400 text-[12px] italic">
            110,00&#163;
          </span>
        </div>

        <div className="flex text-[10px] text-yellow-500 mt-1">
          <IoMdStar /> <IoMdStar /> <IoMdStar /> <IoMdStar /> <IoMdStar />
        </div>

        <div className="mt-2">
          <select
            className="text-[10px] border rounded w-full px-2 py-1"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {trend.sizes.map((s, index) => (
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
            className="bg-blue-400 text-black rounded-3xl px-4 py-2 text-[9px] flex items-center gap-1 hover:opacity-90 transition disabled:opacity-50"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4" />
            {loadingCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
