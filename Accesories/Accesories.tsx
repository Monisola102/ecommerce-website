"use client";
import image18 from "@/public/Image18.png";
import image13 from "@/public/Image13.png";
import image19 from "@/public/Image19.png";
import image20 from "@/public/Image20.png";
import image16 from "@/public/Image16.png";
import image21 from "@/public/Image21.png";
import Accesoriescard from "./AccesoriesCard";
import Slider from "react-slick";

const props = [
  {
    img: image18,
    brand: "Nike/Accesories",
    name: "Tennis Ball ",
    price: "14,94£",
    discount: "-42% OFF",
  },
  {
    img: image19,
    brand: "Nike/Accesories",
    name: "Jumping Rope",
    price: "29,99£",
  },

  {
    img: image16,
    brand: "Nike/Sneakers",
    name: "Nike Air Max 90",
    price: "98,75£",
    discount: "-42% OFF",
  },

  {
    img: image20,
    brand: "Nike/Accesories",
    name: "Dumbbell",
    price: "64,56£",
  },

  {
    img: image13,
    brand: "Nike/Sneakers",
    name: "Nike Air Max 1 ",
    price: "92,45£",
  },

  {
    img: image21,
    brand: "Nike/Sneakers",
    name: "Air Force 1 '07 ",
    price: "87,67£",
    discount: "-42% OFF",
  },
];

export default function AccesoriesComp() {
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
        NEW IN...ACCESORIES
      </h1>
      <div className="w-[90%] mx-auto mb-[50px]">
        <Slider {...play}>
          {props.map((prop, i) => (
            <Accesoriescard key={i} prop={prop} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
