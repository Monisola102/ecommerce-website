"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import WomenCard from "./womenCard";
import marai2 from "@/public/maria2.jpg"
import women5 from "@/public/women5.jpg";

const heroImages = [marai2, women5];

interface SizeType {
  size: string;
  stock: number;
    _id: string;
}

interface WomenInterface {
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

export default function WomenPage() {
  const [women, setWomen] = useState<WomenInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = "women".trim();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${category}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);

        const data = await res.json();
        setWomen(data.data);
      } catch (err) {
        console.error("Error fetching women products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
        <div key={i} className="relative w-full h-full sm:h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
          <Image
            src={img}
            alt={`Hero ${i}`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5">
              For Every Step She Takes
            </h1>
            <button
              onClick={() => {
                const section = document.getElementById("available-section");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold py-2 px-4 sm:px-6 rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition duration-300 text-sm sm:text-base"
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
    {loading ? (
      <p className="text-center">Loading products...</p>
    ) : women.length > 0 ? (
      <Slider {...trendSliderSettings}>
        {women.map((w) => (
          <WomenCard key={w._id} women={w} />
        ))}
      </Slider>
    ) : (
      <p className="text-center">No products found</p>
    )}
  </div>
</div>
  );
}

