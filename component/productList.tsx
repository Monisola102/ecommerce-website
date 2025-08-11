"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetProductsQuery } from "@/store/products/product-api";
import Link from "next/link";
export default function ProductList() {
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
  );
 
}
