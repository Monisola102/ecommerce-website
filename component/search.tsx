"use client";

import { useSearchParams } from "next/navigation";
import ProductList from "./productList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearch, setCategory } from "@/store/products/product-slice";

const validCategories = [
  "women", "men", "kids", "sale", "new",
  "clothing", "shoes", "accessories",
  "brands", "trends", "spring", "recommended"
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(setSearch(""));
  dispatch(setCategory(""));

  const normalizedQuery = query.toLowerCase();
  console.log("Normalized Query:", normalizedQuery);

  if (validCategories.includes(normalizedQuery)) {
   console.log("Normalized Query:", normalizedQuery);
    dispatch(setCategory(normalizedQuery));
  } else {
  console.log("Dispatching search:", query);
    dispatch(setSearch(query));
  }
}, [query, dispatch]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl font-bold mb-6">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h1>
      <ProductList />
    </div>
  );
}
