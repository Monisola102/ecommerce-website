"use client";

import Image from "next/image";
import { useGetFavoritesQuery, useRemoveFavoriteMutation } from "@/store/Features/like/like-api";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { toast } from "react-toastify";
import { useState } from "react";

export default function FavoritesPage() {
  const { data: favorites, isLoading } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [addToCart] = useAddToCartMutation();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  if (isLoading) return <p className="text-center p-6">Loading favorites...</p>;
  if (!favorites || favorites.length === 0) return <p className="text-center p-6">No favorites yet.</p>;

  const handleAddToCart = async (productId: string) => {
const size =
  selectedSizes[productId] ||
  favorites.find((f: any) => f.product._id === productId)?.product.sizes?.[0]?.size;

    if (!size) {
      toast.error("Please select a size.");
      return;
    }

    try {
      await addToCart({ productId, size, quantity: 1 }).unwrap();
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favorites.map((fav: any) => (
        <div key={fav._id} className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition bg-white">
          <Image
            src={fav.image}
            alt={fav.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-xl"
          />

          <div className="mt-3">
            <h3 className="text-lg font-semibold">{fav.name}</h3>
            <p className="text-gray-600">${fav.price}</p>

            {/* Size Dropdown */}
            {fav.sizes && fav.sizes.length > 0 && (
              <select
                className="mt-2 w-full border rounded-lg p-2 text-sm"
                value={selectedSizes[fav._id] || ""}
                onChange={(e) => setSelectedSizes({ ...selectedSizes, [fav._id]: e.target.value })}
              >
                <option value="">Select size</option>
                {fav.sizes.map((s: any, idx: number) => (
                  <option key={idx} value={s.size}>
                    {s.size} ({s.stock} left)
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => removeFavorite(fav._id)}
            >
              Remove
            </button>
            <button
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleAddToCart(fav._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
