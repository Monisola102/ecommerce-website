"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`, {
          credentials: "include", // add this if using cookies
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error || !product) return <p className="text-red-500">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">₦{product.price}</p>
      <p className="mt-4 text-sm text-gray-600">{product.description}</p>
    </div>
  );
}
