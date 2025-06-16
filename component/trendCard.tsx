import Image from "next/image";
import { StaticImageData } from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { useState } from "react";

interface trendInterface {
  img: StaticImageData;
  brand: string;
  name: string;
  price: string;
  discount?: string;
}

export default function TrendCard({ trend }: { trend: trendInterface }) {
  const [liked, setLiked] = useState<boolean>(false);
  return (
    <div className=" relative w-full max-w-[200px] hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer ">
      <div
        className=" absolute top-1 right-8 bg-white p-1 text-black text-md"
        onClick={() => setLiked(!liked)}
      >
        {liked ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
      </div>
      <div>
        <Image
          className="w-[160.24px] h-[175px] object-cover"
          src={trend.img}
          alt="trendImage"
        />
      </div>
      {trend.discount && (
        <div className=" absolute top-[148px] left-1 bg-orange-400 text-white px-4 py-1 text-[9px] font-inter">
          <p className="text-white">{trend.discount}</p>
        </div>
      )}
      <div>
        <p className="text-gray-400 text-[10px] font-inter">{trend.brand}</p>
        <p className="text-black text-[12px] font-inter">{trend.name}</p>
        <div className="flex gap-2">
        <p className="text-black font-bold text-[14px]">{trend.price}</p>
        <span className="line-through  text-gray-400 text-[12px] italic ">
                  110,00&#163;
                </span>
                </div>
        <div className="flex text-[10px]">
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
          <IoMdStar />
        </div>
      </div>
    </div>
  );
}
