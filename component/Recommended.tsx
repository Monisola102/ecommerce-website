"use client";
import image12 from "@/public/image12.jpg";
import image13 from "@/public/Image13.png";
import image14 from "@/public/Image14.png";
import image15 from "@/public/Image15.png";
import image16 from "@/public/Image16.png";
import image17 from "@/public/Image17.png";
import Card from "../component/RecommendedCard";
import Slider from "react-slick";

const props = [
  {
    img: image17,
    brand: "Nike/Sneakers",
    name: "Air Max 1'87 - Safety Orange",
    price: "74,94£",
    discount: "-42% OFF",
  },
  {
    img: image16,
    brand: "Nike/Sneakers",
    name: "Nike Air Max",
    price: "89,99£",
  },

  {
    img: image15,
    brand: "Nike/Sneakers",
    name: "Nike Air Max 90",
    price: "98,75£",
    discount: "-42% OFF",
  },

  {
    img: image14,
    brand: "Nike/Sneakers",
    name: "Air Force 1 '07 - Triple White",
    price: "84,56£",
  },

  {
    img: image13,
    brand: "Nike/Sneakers",
    name: "Nike Air Max",
    price: "92,45£",
  },

  {
    img: image12,
    brand: "Nike/Sneakers",
    name: "Nike Air Max",
    price: "87,67£",
    discount: "-42% OFF",
  },
];

export default function RecommendedComp() {
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
      <h1 className="font-bold text-black text-xl  mb-4 ml-[64px] ">
        RECOMMENDED FOR YOU
      </h1>
      <div className="w-[90%] mx-auto mb-[50px]">
        <Slider {...play}>
          {props.map((prop, i) => (
            <Card key={i} prop={prop} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
