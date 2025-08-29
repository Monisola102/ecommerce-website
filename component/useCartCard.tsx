"use client";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hook";
import {
  useAddToCartMutation,
  useSubtractFromCartMutation,
  useDeleteFromCartMutation
} from "@/store/Features/cart/cart-api";
import { openCart } from "@/store/Features/cart/cart-slice";

// Only the fields to display
export interface CartItemDisplay {
  productName: string;
  productImage: string;
  price: number;
  size: string;
  quantity: number;
  _originalId: string; // internal use only
}

interface Props {
  item: CartItemDisplay;
  originalCart: any[]; // full cart from backend
}

export default function CartCard({ item, originalCart }: Props) {
  const dispatch = useAppDispatch();
  const [addToCart] = useAddToCartMutation();
  const [subtractFromCart] = useSubtractFromCartMutation();
  const [deleteFromCart] = useDeleteFromCartMutation();

  // Find the original cart item to get the _id for mutations
  const originalItem = originalCart.find(
  ci => ci._id === item._originalId
);

  const handleAdd = async () => {
    try {
      await addToCart({ productId: originalItem.product._id, size: item.size, quantity: 1 }).unwrap();
      dispatch(openCart());
    } catch {
      toast.error("Failed to add");
    }
  };

  const handleSubtract = async () => {
    try {
      await subtractFromCart({ productId: originalItem.product._id, size: item.size }).unwrap();
      dispatch(openCart());
    } catch {
      toast.error("Failed to subtract");
    }
  };

  const handleRemove = async () => {
    try {
      await deleteFromCart({ productId: originalItem.product._id, size: item.size }).unwrap();
      toast.success("Removed from cart");
      dispatch(openCart());
    } catch {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="relative w-full p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center gap-4">
      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:text-red-700 z-10 shadow"
        title="Remove from cart"
      >
        <FaTrash size={16} />
      </button>

      {/* Product Image */}
      <div className="border border-gray-200 rounded-md overflow-hidden w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        <Image
          src={item.productImage}
          alt={item.productName}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 text-center sm:text-left gap-1">
        <p className="font-semibold text-[12px]">{item.productName}</p>
        <p className="text-black font-bold text-[12px]">₦{item.price}</p>
        {item.size && <p className="text-gray-400 text-[10px]">Size: {item.size}</p>}

        {/* Quantity controls */}
        <div className="flex flex-col mt-2 gap-1">
          <p className="text-black font-semibold text-[10px]">Quantity</p>
          <div className="flex items-center gap-2 bg-black p-1 rounded w-max">
            <button onClick={handleSubtract} className="p-1 rounded bg-white hover:bg-gray-100 transition">
              <IoMdRemove size={16} />
            </button>
            <span className="font-semibold text-white text-sm px-2">{item.quantity}</span>
            <button onClick={handleAdd} className="p-1 rounded bg-white hover:bg-gray-100 transition">
              <IoMdAdd size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
