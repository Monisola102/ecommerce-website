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
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        {/* Category Filter */}
        <div>
          <label className="mr-2 font-medium text-gray-700">Category:</label>
          <select
            value={category || ""}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="trend">Trend</option>
            <option value="recommended">Recommended</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="mr-2 font-medium text-gray-700">Sort by:</label>
          <select
            value={sort || ""}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((product: any) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="group border rounded-xl shadow-sm hover:shadow-md bg-white transition-transform transform hover:-translate-y-1 flex flex-col"
          >
            <div className="w-full aspect-square overflow-hidden rounded-t-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                {product.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                ₦{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
