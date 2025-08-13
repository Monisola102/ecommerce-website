"use client";

import { useEffect, useState } from "react";
import SpringCard from "./springCard";
import Slider from "react-slick";

export default function SpringComp() {
  const [springs, setSprings] = useState([]);

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
  };

  return (
    <div className="container">
      <h1 className="font-bold text-black text-xl  mb-4 ml-[64px]">
        SUMMER/SPRING 2021
      </h1>
      <div className="w-[90%] mx-auto max-h-[370px] overflow-hidden">
        <Slider {...play}>
         {springs && springs.length > 0 ? (
  springs?.map((spring, i) => (
    <SpringCard key={i} spring={spring} />
  ))
) : (
  <p>No spring products found.</p>
)}
        </Slider>
      </div>
    </div>
  );
}
