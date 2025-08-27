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
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">₦{product.price}</p>
      <p className="mt-4 text-sm text-gray-600">{product.description}</p>
      <div className="mt-4">
        <p className="font-medium">Select Size:</p>
        <div className="flex gap-2 mt-2">
          {product.sizes.map((s: any) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s.size)}
              disabled={s.stock <= 0}
              className={`px-4 py-2 border rounded ${
                selectedSize === s.size
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100"
              } ${s.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {s.size}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <ProductReviews productId={product._id} />
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
