"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import MenCard from "./menCard";
import menhero1 from "@/public/menhero1.jpg";
import menhero2 from "@/public/menhero2.jpg";

const heroImages = [menhero1, menhero2];
interface SizeType {
  size: string;
  stock: number;
   _id: string;
}
interface MenInterface {
  _id: string;
  image: string;
   brand: {
  _id: string;
  name: string;
};
  name: string;
  price: number;
  sizes: SizeType[];
}

export default function MenPage() {
  const [products, setProducts] = useState<MenInterface[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = "trends".trim();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${category}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.error("Error fetching men products:", err);
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
    responsive: [
    {
      breakpoint: 1280, // below xl (desktop large)
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 1024, // below lg (laptop/tablet landscape)
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768, // below md (tablet portrait)
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480, // mobile
      settings: { slidesToShow: 1 },
    },
  ],
  };

  return (
  <div className="container">
    {/* Hero Section */}
    <div className="w-full h-[70vh] sm:h-[80vh] lg:h-[90vh]">
      <Slider {...heroSliderSettings}>
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden"
          >
            <Image
              src={img}
              alt={`Hero ${i}`}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center px-4">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5">
                For Every Step He Takes
              </h1>
              <button
                onClick={() => {
                  const section = document.getElementById("available-section");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-700 via-green-600 to-gray-800 text-white font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition duration-300 text-sm sm:text-base"
              >
                Shop the Collection
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>

    {/* Available Section */}
    <h1
      id="available-section"
      className="font-bold text-black text-lg sm:text-xl mt-[30px] sm:mt-[45px] mb-3 sm:mb-4 ml-4 sm:ml-[64px]"
    >
      AVAILABLE
    </h1>

    {/* Product Slider */}
    <div className="w-[95%] sm:w-[90%] mx-auto max-h-[370px] overflow-hidden">
      <Slider
        {...{
          ...trendSliderSettings,
          responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ],
        }}
      >
        {products.map((product) => (
          <MenCard key={product._id} men={product} />
        ))}
      </Slider>
    </div>
  </div>
);

}
