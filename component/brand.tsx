"use client";

import { useParams } from "next/navigation";
import { useGetProductsQuery } from "@/store/products/product-api";

export default function BrandProductsPage() {
  const { brand } = useParams(); // 👈 dynamic brand from URL
  const { data, isLoading, isError } = useGetProductsQuery({ brand: brand as string });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products</p>;

  const products = data?.data || [];

  return (
    <div>
      <h1>Products for {brand}</h1>
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
