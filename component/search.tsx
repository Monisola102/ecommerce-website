"use client";

import { useSearchParams } from "next/navigation";
import ProductList from "./productList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearch, setCategory } from "@/store/products/product-slice";

const validCategories = ["Women", "Men", "Kids", "Sale", "New", "Clothing", "Shoes", "Accesories", "Brands", "Trends", "Spring", "Recommended"];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset both search and category first
    dispatch(setSearch(""));
    dispatch(setCategory(""));

    if (validCategories.includes(query)) {
      dispatch(setCategory(query)); 
    } else {
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
