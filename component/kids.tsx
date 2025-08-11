"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import KidsCard from "./kidsCard";
import kids from "@/public/kids.jpg"
import kidshero from "@/public/kidshero1.jpg"

const heroImages = [kidshero, kids];
interface SizeType {
  size: string;
  stock: number;
}

interface Product {
  _id: string;
  image: string;
  brand: string;
  name: string;
  price: number;
  size: SizeType[];
}

export default function KidPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = "kids".trim();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${category}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching kids products:", err);
      }
    };

    fetchProducts();
  }, []);

  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const trendSliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="container">
      <div className="w-full h-[90vh]">
        <Slider {...heroSliderSettings}>
          {heroImages.map((img, i) => (
            <div key={i} className="relative w-full h-[90vh] overflow-hidden">
              <Image
                src={img}
                alt={`Hero ${i}`}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center px-4">
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-5">
                  For Every little step they take
                </h1>
               <button
  onClick={() => {
    const section = document.getElementById("available-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }}
  className="bg-gradient-to-r from-pink-200 via-blue-200 to-green-200 text-gray-700 rounded-3xl px-6 py-2 text-sm font-semibold shadow-md hover:brightness-105 hover:scale-105 transition duration-300"
>
  Shop the Collection
</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <h1 id="available-section" className="font-bold text-black text-xl mt-[45px] mb-4 ml-[64px]">
        AVAILABLE
      </h1>
      <div className="w-[90%] mx-auto">
        <Slider {...trendSliderSettings}>
          {products.map((product) => (
            <KidsCard key={product._id} kids={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
