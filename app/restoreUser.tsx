"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { restoreUser } from "@/store/Features/auth/auth-slice";

export default function RestoreUser() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) dispatch(restoreUser(data));
        })
        .catch(() => localStorage.removeItem("token"));
    }
  }, [dispatch]);

  return null;
}
