import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Learn() {
  return (
    <div className="flex items-center mb-[100px]">
      <div className=" relative p-10 bg-zinc-400 text-white w-[800px] h-[320px]">
        <div className="w-[40%] flex flex-col">
          <h6 className="mb-5 font-bold font-inter text-[18px] tracking-wider">
            It's all about you
          </h6>
          <p className="font-bold font-inter text-[14px]">
            Try now, pay later. We want that you're really confident and happy
            with your purchase - you have 30 days before we have charge you!
            Learn more about our policy.
          </p>
        </div>

        <button className=" mt-4 bg-inherit border border-white text-white p-2 ">
          <FaArrowRight />
        </button>
        <div className="absolute right-[-350px] top-10 ">
          <Image width={700} height={280} src="/Frame1.png" alt="learnFrame" />
        </div>
      </div>
    </div>
  );
}
