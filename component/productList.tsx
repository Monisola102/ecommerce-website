"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useGetProductsQuery } from "@/store/products/product-api";
import Link from "next/link";
import { setCategory, setSort } from "@/store/products/product-slice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { search, category, sort, page, limit } = useSelector(
    (state: RootState) => state.product
  );

  const { data, error, isLoading } = useGetProductsQuery({
    search,
    category,
    sort,
    page,
    limit,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load products.</p>;
  if (!data?.data?.length) return <p>No products found.</p>;

  return (
    <div>
      {/* --- Filters & Sorting --- */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        {/* Category Filter */}
        <div>
          <label className="mr-2 font-semibold">Category:</label>
          <select
            value={category || ""}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="mr-2 font-semibold">Sort by:</label>
          <select
            value={sort || ""}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value="">Default</option>
            <option value="price:asc">Price: Low to High</option>
            <option value="price:desc">Price: High to Low</option>
            <option value="name:asc">Name: A-Z</option>
            <option value="name:desc">Name: Z-A</option>
            <option value="createdAt:desc">Newest</option>
          </select>
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.data.map((product: any) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition block"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">₦{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
