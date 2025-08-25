"use client";

import { useGetFavoritesQuery, useRemoveFavoriteMutation } from "@/store/Features/like/like-api";
import { toggleLike } from "@/store/Features/like/like-slice";
import { useAppDispatch } from "@/store/hook";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Favourite() {
  const { data: favorites, isLoading } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const dispatch = useAppDispatch();

  if (isLoading) return <p className="p-6">Loading...</p>;

  const handleRemove = async (productId: string) => {
    dispatch(toggleLike(productId)); // Optimistic UI update
    try {
      await removeFavorite(productId).unwrap();
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Failed to remove favorite");
      dispatch(toggleLike(productId)); // Revert on error
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Favourites</h1>

      {favorites?.length === 0 ? (
        <p>No liked items yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:items-start border p-3 rounded-md relative hover:shadow-md transition"
            >
              {/* Remove Favorite Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove from favorites"
              >
                <FaHeart size={16} />
              </button>

              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-md"
              />

              <div className="mt-2 sm:mt-0 sm:ml-4 flex flex-col justify-center text-center sm:text-left">
                <p className="text-sm sm:text-xs text-gray-500">{item.brand}</p>
                <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                <p className="text-orange-500 font-bold text-sm sm:text-base">₤{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
