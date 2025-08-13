"use client";

import { useEffect, useState } from "react";
import TrendCard from "../component/trendCard";
import Slider from "react-slick";
import { fetchWithCredentials } from "@/utils/fetchhelper";

export default function TrendComp() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const category = "trends".trim();
        const res = await fetchWithCredentials(
          `/products?category=${category}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch trending products");
        }
        const data = await res.json();
        setTrends(data.data || []);
      } catch (error) {
        console.error("Error fetching trends:", error);
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
  };

  return (
    <div className="container">
      <h1 className="font-bold text-black text-xl mt-[45px] mb-4 ml-[64px]">
        TRENDING NOW
      </h1>
      <div className="w-[90%] mx-auto max-h-[370px] overflow-hidden">
        <Slider {...play}>
          {trends?.map((trend, i) => (
            <TrendCard key={i} trend={trend} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
