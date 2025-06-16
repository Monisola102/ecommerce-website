"use client";
import image from "@/public/Image.png";
import image2 from "@/public/Image2.png";
import image3 from "@/public/Image3.png";
import image4 from "@/public/Image4.png";
import image5 from "@/public/Image5.png";
import image6 from "@/public/Image6.jpg";
import TrendCard from "../component/trendCard";
import Slider from "react-slick";

const trends = [
  {
    img: image,
    brand: "Nike/Sneakers",
    name: "Nike Air Max ",
    price: "74,94£",
    discount: "-42% OFF",
  },
  {
    img: image2,
    brand: "Nike/Sneakers",
    name: "Air Max 1'87 - Safety Orange",
    price: "89,99£",
  },

  {
    img: image3,
    brand: "Nike/Sneakers",
    name: "Nike Air Max 90",
    price: "98,75£",
    discount: "-42% OFF",
  },

  {
    img: image4,
    brand: "Nike/Sneakers",
    name: "Nike Red Heart",
    price: "84,56£",
  },

  {
    img: image5,
    brand: "Nike/Sneakers",
    name: "Nike Air Max 1 ",
    price: "92,45£",
  },

  {
    img: image6,
    brand: "Nike/Sneakers",
    name: "Air Force 1 '07 - Triple White",
    price: "87,67£",
    discount: "-42% OFF",
  },
];

export default function TrendComp() {
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
    <div>
      <h1 className="font-bold text-black text-xl mt-[45px] mb-4 ml-[64px] ">TRENDING NOW</h1>
      <div className="w-[90%] mx-auto">
        <Slider {...play}>
            {trends.map((trend, i) => (
              <TrendCard key={i} trend={trend} />
            ))}
  
        </Slider>
      </div>
    </div>
  );
}
