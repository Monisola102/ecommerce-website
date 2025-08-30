"use client";

import { useEffect, useState } from "react";
import TrendCard from "../component/trendCard";
import Slider from "react-slick";

export default function TrendComp() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const category = "trends".trim();
        const res = await fetch (
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${category}`,
           {
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch trending products");
        }
        const data = await res.json();
        setTrends(data.data);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }finally {
        setLoading(false); // <-- stop loading regardless of success/failure
      }
    };

    fetchTrends();
  }, []);

  const play = {
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
        <p className="ml-3 text-black">Loading trends...</p>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="font-bold text-black text-xl mt-[45px] mb-4 ml-[64px]">
        TRENDING NOW
      </h1>
      <div className="w-full sm:w-[90%] mx-auto max-h-[370px] overflow-hidden">
        <Slider {...play}>
          {trends?.map((trend, i) => (
            <TrendCard key={i} trend={trend} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
