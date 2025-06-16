"use client";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { useState } from "react";

export default function Spring() {
  const [liked, setLiked] = useState<boolean>(false);
  return (
    <div>
      <h1 className="font-bold text-black text-xl mt-[60px] mb-4 ml-[64px] ">
        SPRING/SUMMER 2021
      </h1>
      <div className="w-[90%] mx-auto">
        <div className="flex items-center gap-[50px]">
          <div className=" w-[350px] h-[400px] flex flex-col relative hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer">
            <div>
              <Image
                width={350}
                height={200}
                src="/image9.png"
                alt="springImage"
                className="object-cover h-200px w-full"
              />
            </div>
            <div className="absolute top-[112px] left-1 space-y-1">
              <div className="bg-sky-300 px-2 py-1 w-fit rounded-[2px]">
                <p className="text-white text-[9px] font-inter">ECO</p>
              </div>
              <div className=" bg-orange-500 w-fit px-3 py-1 rounded-[2px] ">
                <p className="text-white text-[9px] font-inter ">-42% OFF</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-[10px] font-inter">Nike/Sneakers</p>
              <p className="text-black text-[12px] font-inter">
                Nike Air Max
              </p>
              <div className="flex gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/item6.png"
                  alt="Item6"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item7.png"
                  alt="Item7"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item8.png"
                  alt="Item8"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item9.png"
                  alt="Item9"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item10.png"
                  alt="Item10"
                  className="w-[10px] h-[10px]"
                />
                <p className="text-black text-[10px]">&#43;5 MORE</p>
              </div>
              <div className="flex gap-2">
                <p className="text-black font-bold text-[14px]">83,54&#163;</p>
                <span className="line-through text-gray-400 text-[12px] italic">
                  110,00 &#163;
                </span>
              </div>
              <div className="flex text-[10px]">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <span className="text-black text-[8px]">(45)</span>
              </div>
            </div>
          </div>
          <div className="w-[177px] h-[400px] flex flex-col relative hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer">
            <div
              className=" absolute top-1 right-1 bg-white p-1 text-black text-md"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <IoMdHeartEmpty />
              )}
            </div>
            <div>
              <Image
                width={177}
                height={165}
                src="/image7.png"
                alt="springImage"
                className="object-cover h-[165px] w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-[10px] font-inter">Nike/Sneakers</p>
              <p className="text-black text-[12px] font-inter">
                Nike Air Max 1
              </p>
              <div className="flex gap-2">
                <p className="text-black font-bold text-[14px]">83,54&#163;</p>
                <span className="line-through text-gray-400 text-[12px] italic">
                  110,00&#163;
                </span>
              </div>
              <div className="flex text-[10px]">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <span className="text-black text-[8px]">(45)</span>
              </div>
            </div>
          </div>
          <div className=" relative flex flex-col w-[177px] h-[400px] hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer">
            <div
              className=" absolute top-1 right-1 bg-white p-1 text-black text-md"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <IoMdHeartEmpty />
              )}
            </div>
            <div>
              <Image
                width={177}
                height={165}
                src="/image8.png"
                alt="springImage"
                className="object-cover w-full h-[165px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-[10px] font-inter">Nike/Sneakers</p>
              <p className="text-black text-[12px] font-inter">
                Nike Air Max
              </p>
              <div className="flex gap-2">
                <p className="text-black font-bold text-[14px]">83,54&#163;</p>
                <span className="line-through text-gray-400 text-[12px] italic">
                  110,00&#163;
                </span>
              </div>
              <div className="flex text-[10px]">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <span className="text-black text-[8px]">(45)</span>
              </div>
            </div>
          </div>
          <div className=" w-[320px] h-[400px] flex flex-col relative hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer">
            <div>
              <Image
                width={350}
                height={165}
                src="/image11.png"
                alt="springImage"
                className=" object-cover h-[165px] w-full  "
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-[10px] font-inter">Nike/Sneakers</p>
              <p className="text-black text-[12px] font-inter">
              Nike Air Force 1
              </p>
              <div className="flex gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/item6.png"
                  alt="Item6"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item7.png"
                  alt="Item7"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item8.png"
                  alt="Item8"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item9.png"
                  alt="Item9"
                  className="w-[10px] h-[10px]"
                />
                <Image
                  width={20}
                  height={20}
                  src="/item10.png"
                  alt="Item10"
                  className="w-[10px] h-[10px]"
                />
                <p className="text-black text-[10px]">&#43;5 MORE</p>
              </div>
              <div className="flex gap-2">
                <p className="text-black font-bold text-[14px]">83,54&#163;</p>
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
                <span className="text-black text-[8px]">(45)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
