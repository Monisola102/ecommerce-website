"use client";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleLike } from "@/store/Features/like/like-slice";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/Features/like/like-api";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { openCart } from "@/store/Features/cart/cart-slice";

export default function Favorites() {
  const { data: favorites, isLoading } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [addToCart] = useAddToCartMutation();
  const dispatch = useAppDispatch();
const {user} = useAppSelector((state)=> state.auth)
  if (isLoading) return <p className="p-6">Loading...</p>;

  const handleRemove = async (productId: string, size: string) => {
    dispatch(toggleLike(productId));
    try {
      await removeFavorite({ productId, size }).unwrap();
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove favorite");
      dispatch(toggleLike(productId));
    }
  };

 const handleAddToCart = async (productId: string, size: string) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    try {
      await addToCart({ productId, size, quantity: 1 }).unwrap();
      toast.success("Added to cart!");
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Favourites</h1>

      {favorites?.length === 0 ? (
        <p>No liked items yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites?.map((fav) => (
            <div
              key={`${fav.product._id}-${fav.size}`}
              className="flex flex-col items-center border p-4 rounded-md hover:shadow-md transition relative"
            >
              {/* Remove button */}
              <button
                onClick={() => handleRemove(fav.product._id, fav.size)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove from favorites"
              >
                <FaHeart size={16} />
              </button>

              {/* Image */}
              <Image
                src={fav.product.image}
                alt={fav.product.name}
                width={150}
                height={150}
                className="object-cover rounded-md"
              />

              {/* Info stacked vertically */}
              <div className="flex flex-col items-center mt-3 gap-1 text-center">
                <p className="text-gray-500 text-sm">
  {typeof fav.product.brand === "object" ? fav.product.brand.name : fav.product.brand}
</p>
                <p className="font-semibold text-sm">{fav.product.name}</p>
                <p className="text-black font-semi-bold text-sm">₤{fav.product.price}</p>
                {fav.size && <p className="text-gray-400 text-sm">Size: {fav.size}</p>}

                <button
                  className="mt-2 bg-blue-400 text-black rounded-3xl px-4 py-1 text-sm hover:opacity-90 transition"
                  onClick={() => handleAddToCart(fav.product._id, fav.size)}
                >
                  <ShoppingCart className="inline w-4 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
