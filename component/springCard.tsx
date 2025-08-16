import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
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

interface SizeType {
  size: string;
  stock: number;
}

interface SpringInterface {
  _id: string;
  image: string;
  brand: string;
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

  const isLiked = likedProductIds.includes(spring._id);

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("Please log in to like products.");
      return;
    }

    dispatch(toggleLike(spring._id));

    try {
      if (isLiked) {
        await removeFavorite(spring._id).unwrap();
      } else {
        await addFavorite(spring._id).unwrap();
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
      router.push(`/account?redirect=/cart`);
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
    <div className="relative w-full max-w-[200px] p-2 rounded-lg shadow-sm ">
      <div
        className="absolute top-1 right-2 bg-white p-1 text-black text-md cursor-pointer z-10"
        onClick={handleToggleLike}
      >
        {isLiked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>
      <div>
        <Image
          className="w-full h-[185px] object-cover"
          src={imageSrc}
          width={170}
          height={185}
          alt="springImage"
        />
      </div>
      <div>
        <p className="text-gray-400 text-[10px] font-inter">{spring.brand}</p>
        <p className="text-black text-[12px] font-inter">{spring.name}</p>
        <div className="flex gap-2">
          <p className="text-black font-bold text-[14px]">
            {spring.price}&#163;
          </p>
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
            className="bg-blue-400  text-black rounded-3xl  px-4 py-2 text-[9px] flex items-center gap-1 hover: cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingCart className=" w-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
