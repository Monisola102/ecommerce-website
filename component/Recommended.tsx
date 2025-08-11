"use client";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import RecommendedCard from "./RecommendedCard";

export default function RecommendedComp() {
 const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
         const category = "recommended".trim();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?category=${category}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch recommended products");
        }

        const data = await res.json();
              console.log("Recommended products response:", data.data); 
        setRecommended(data.data);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    };

    fetchRecommended();
  }, []);

  const play = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div className="container">
      <h1 className="font-bold text-black text-xl mt-5 mb-4 ml-[64px] ">
        RECOMMENDED FOR YOU
      </h1>
      <div className="w-[90%] mx-auto max-h-[370px] overflow-hidden" >
        <Slider {...play}>
          {recommended.map((prop, i) => (
            <RecommendedCard key={i} prop={prop} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
