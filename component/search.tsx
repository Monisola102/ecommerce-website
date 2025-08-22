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
  const categoryParam = searchParams.get("category") || ""; // 👈 support category in URL
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      dispatch(setSearch(query));
    }
    if (categoryParam && validCategories.includes(categoryParam)) {
      dispatch(setCategory(categoryParam));
    }
  }, [query, categoryParam, dispatch]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-xl font-bold mb-6">
        Showing results
        {query && <> for "<span className="text-blue-600">{query}</span>"</>}
        {categoryParam && <> in <span className="text-green-600">{categoryParam}</span></>}
      </h1>
      <ProductList />
    </div>
  );
}
