
"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProductByIdQuery } from "@/store/products/product-api";
import { useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { openCart } from "@/store/Features/cart/cart-slice";
import { toast } from "react-toastify";
import { useState } from "react";
import ProductReviews from "./productReviews";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (isLoading) return <p>Loading product...</p>;
  if (error || !data?.data)
    return <p className="text-red-500">Product not found.</p>;

  const product = data.data;

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      const pendingItem = {
        productId: product._id,
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

    try {
      await addToCart({
        productId: product._id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();
      toast.success(`${product.name} (Size ${selectedSize}) added to cart!`);
      dispatch(openCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="relative w-full overflow-hidden rounded-md shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center brightness-105 contrast-110"
        />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-black font-semibold mt-1 text-lg sm:text-xl">{product.price}&#163;</p>
      <p className="mt-2 text-sm sm:text-base text-gray-600">{product.description}</p>
      {/* Size Selector */}
      <div className="mt-3">
        <p className="font-medium mb-1">Select Size:</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s: any) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s.size)}
              disabled={s.stock <= 0}
              className={`px-3 py-1 border rounded-md text-sm sm:text-base transition-colors ${
                selectedSize === s.size
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-gray-100 border-gray-300"
              } ${s.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {s.size}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6">
        <ProductReviews productId={product._id} />
      </div>

      {/* Add to Cart Button */}
   <button
  onClick={handleAddToCart}
  disabled={isAdding}
  className="mt-6 w-full bg-gradient-to-r from-purple-500 to-green-500 text-black font-semibold py-3 rounded-md hover:opacity-90 disabled:opacity-50 transition"
>
  {isAdding ? "Adding..." : "Add to Cart"}
</button>
    </div>
  );
}
