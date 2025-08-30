"use client";

import { useEffect, useState } from "react";
import SpringCard from "./springCard";
import Slider from "react-slick";

export default function SpringComp() {
  const [springs, setSprings] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    const fetchSprings = async () => {
      try {
        const category = "spring".trim();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${category}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch spring products");
        }

        const data = await res.json();
              console.log("Spring products:", data.data);
        setSprings(data.data);
      } catch (error) {
        console.error("Error fetching spring:", error);
      }finally {
        setLoading(false); // <-- stop loading regardless of success/failure
      }
    };

    fetchSprings();
  }, []);

  const play = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
     responsive: [
        {
          breakpoint: 1280, // below xl
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1024, // below lg
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768, // below md
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480, // below sm
          settings: {
            slidesToShow: 1,
          },
        },
      ],
  };
if (loading) {
    // <-- simple placeholder while backend wakes up
    return (
      <div className="flex justify-center items-center h-[370px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-3 text-black">Loading spring...</p>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="font-bold text-black text-xl  mb-4 ml-[64px]">
        SUMMER/SPRING 2025
      </h1>
      <div className="w-[90%] mx-auto max-h-[370px] overflow-hidden">
        <Slider {...play}>
  {springs?.map((spring, i) => (
    <SpringCard key={i} spring={spring} />
))}
        </Slider>
      </div>
    </div>
  );
}
