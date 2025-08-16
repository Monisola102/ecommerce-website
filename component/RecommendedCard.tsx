"use client";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
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

interface recommendedInterface {
  _id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  sizes: SizeType[];
}
export default function RecommendedCard({
  prop,
}: {
  prop: recommendedInterface;
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const likedProductIds = useAppSelector((state) => state.like.likedProductIds);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [addToCart] = useAddToCartMutation();

  const isLiked = likedProductIds.includes(prop._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(prop._id));

    try {
      if (isLiked) {
        await removeFavorite(prop._id).unwrap();
      } else {
        await addFavorite(prop._id).unwrap();
      }
    } catch (error) {
      toast.error("Failed to update favorite.");
      dispatch(toggleLike(prop._id));
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      const pendingItem = {
        productId: prop._id,
        size: selectedSize,
        quantity: 1,
      };
      localStorage.setItem("pendingCartItem", JSON.stringify(pendingItem));
      router.push(`/account?redirect=/cart`);
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (loadingCart) return;

    setLoadingCart(true);
    try {
      await addToCart({
        productId: prop._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();

      toast.success(`${prop.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };
 const imageSrc = prop.image?.startsWith("http")
    ? prop.image
    : prop.image
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.image.startsWith("/") ? prop.image : "/" + prop.image}`
    : "/fallback.jpg";

  return (
    <div className="container relative w-full max-w-[200px]  p-2 rounded-lg shadow-sm">
      <div
       className="absolute top-1 right-2 bg-white p-1 text-black text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>
      <div>
        <Image
          className="w-[180px] h-[185px] object-cover"
          src={imageSrc}
          alt={prop.name}
          width={180}
          height={185}
        />
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-inter">{prop.brand}</p>
        <p className="text-black text-[12px] font-inter">{prop.name}</p>
        <p className="text-black font-bold text-[14px]">{prop.price}</p>
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
            <option value="" disabled>Select Size</option>
            {prop.sizes.map((s, index) => (
              <option key={index} value={s.size} disabled={s.stock === 0}>
                Size {s.size}{" "}
                {s.stock === 0 ? "(Out of stock)" : `- ${s.stock} left`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center mt-3">
          <button
            className="bg-blue-400  text-black rounded-3xl  px-4 py-2 text-[9px] flex items-center gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className=" w-4" />
            {loadingCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
