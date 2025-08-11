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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Favourites</h1>
      {favorites?.length === 0 ? (
        <p>No liked items yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites?.map((item) => (
            <div key={item._id} className="border p-4 rounded-md relative">
              {/* Remove Favorite Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove from favorites"
              >
                <FaHeart size={18} />
              </button>

              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={150}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="text-sm text-gray-500 mt-2">{item.brand}</p>
              <p className="font-semibold">{item.name}</p>
              <p className="text-orange-500 font-bold">₤{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
