"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAddToCartMutation } from  "@/store/Features/cart/cart-api";

export default function AuthCartSync() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    const pending = localStorage.getItem("pendingCartItem");
    if (user && pending) {
      const { productId, size, quantity } = JSON.parse(pending);
      addToCart({ productId, size, quantity });
      localStorage.removeItem("pendingCartItem");
    }
  }, [user, addToCart]);

  return null; // this component doesn’t render anything
}
