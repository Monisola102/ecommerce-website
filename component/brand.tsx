"use client";

import { useGetProductsQuery } from "@/store/products/product-api";

export default function BrandProductsPage({ brand }: { brand: string }) {
  const { data, isLoading, isError } = useGetProductsQuery({ brand });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products</p>;

  const products = data?.data || [];

  return (
    <div>
      <h1>Products for {brand}</h1>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
