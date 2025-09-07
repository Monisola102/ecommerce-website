"use client";

import Image from "next/image";
import { Trash } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/Features/like/like-api";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { openCart } from "@/store/Features/cart/cart-slice";
import { toggleLike } from "@/store/Features/like/like-slice";
export default function Favorites() {
  const { data : favorites = [], isLoading } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [addToCart] = useAddToCartMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  if (isLoading) return <p className="p-6 text-center">Loading...</p>;

  const handleRemove = async (productId: string, size: string) => {
  try {
    await removeFavorite({ productId, size }).unwrap();
    dispatch(toggleLike(productId));
    toast.success("Removed from favorites");
  } catch {
    toast.error("Failed to remove favorite");
  }
};

  const handleAddToCart = async (productId: string, size?: string) => {
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
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Favourites</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No liked items yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map((fav) => {
            const size =
              fav.size ||
              fav.product.sizes?.[0]?.size ||
              "";

            return (
              <div
                key={`${fav.product._id}-${size}`}
                className="relative w-full p-2 bg-white rounded-lg shadow-sm flex flex-col items-center sm:flex-row sm:items-start gap-4 hover:shadow-md transition"
              >
                <button
                  onClick={() => handleRemove(fav.product._id, size)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700 z-10 shadow"
                  title="Remove from favorites"
                >
                 <Trash size={16} />

                </button>

                <div className="border border-gray-200 rounded-md overflow-hidden w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                  <Image
                    src={fav.product.image}
                    alt={fav.product.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex flex-col justify-center flex-1 text-sm text-center sm:text-left gap-0.5">
                  <p className="text-gray-400 text-[10px]">
                    {typeof fav.product.brand === "object"
                      ? fav.product.brand.name
                      : fav.product.brand}
                  </p>
                  <p className="text-black font-medium text-[12px]">{fav.product.name}</p>
                  <p className="text-black font-bold text-[12px]">₤{fav.product.price}</p>
                  {size && <p className="text-gray-400 text-[10px]">Size: {size}</p>}

                  <button
                    className="mt-2 bg-blue-400 text-black rounded-3xl px-4 py-1 text-[10px] flex items-center gap-1 hover:opacity-90 transition w-max self-center sm:self-start"
                    onClick={() => handleAddToCart(fav.product._id, size)}
                  >
                    <ShoppingCart className="w-3" />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
