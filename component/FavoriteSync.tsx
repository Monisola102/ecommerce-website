"use client";

import { useEffect } from "react";
import { useGetFavoritesQuery } from "@/store/Features/like/like-api";
import { setLikedProducts } from "@/store/Features/like/like-slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

export default function FavoritesSync() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { data: favorites } = useGetFavoritesQuery(undefined, { skip: !user });

  useEffect(() => {
    if (favorites) {
      dispatch(setLikedProducts(favorites.map((item) => item._id)));
    }
  }, [favorites, dispatch]);

  return null; 
}
