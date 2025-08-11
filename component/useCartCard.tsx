"use client";

import Image from "next/image";
import { useDeleteFromCartMutation, useSubtractFromCartMutation, useAddToCartMutation } from "@/store/Features/cart/cart-api";
import { CartItem } from "@/store/Features/cart/cart-api";
import { toast } from "react-toastify";

export default function CartCard({ item }: { item: CartItem }) {
  const [addToCart] = useAddToCartMutation();
  const [subtractFromCart] = useSubtractFromCartMutation();
  const [deleteFromCart] = useDeleteFromCartMutation();

  const handleAdd = async () => {
    try {
      await addToCart({ productId: item.product._id, quantity: 1, size: item.size }).unwrap();
    } catch (err) {
      toast.error("Could not increase quantity");
    }
  };

  const handleSubtract = async () => {
    try {
      await subtractFromCart({ productId: item.product._id, size: item.size }).unwrap();
    } catch (err) {
      toast.error("Could not decrease quantity");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFromCart({ productId: item.product._id, size: item.size }).unwrap();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-sm flex gap-4 items-center">
      <Image
        src={item.product.image}
        alt={item.product.name}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div className="flex-1">
        <h2 className="font-semibold">{item.product.name}</h2>
        <p className="text-sm">Size: {item.size}</p>
        <p className="text-sm">₦{item.product.price.toLocaleString()} x {item.quantity}</p>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <button onClick={handleAdd} className="px-2 py-1 bg-green-200 rounded">+</button>
        <span>{item.quantity}</span>
        <button onClick={handleSubtract} className="px-2 py-1 bg-yellow-200 rounded">-</button>
        <button onClick={handleDelete} className="text-red-500 text-sm mt-2">Remove</button>
      </div>
    </div>
  );
}
