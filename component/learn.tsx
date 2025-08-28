import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Learn() {
  return (
    <div className="container mb-[300px]">
      <div className="flex flex-col lg:flex-row justify-start mt-[50px] items-center lg:items-start">
        {/* Left Text Section */}
        <div className="relative left-0 p-10 bg-zinc-400 text-white w-full lg:w-[800px] h-auto lg:h-[320px]">
          <div className="max-w-[300px] flex flex-col">
            <h6 className="mb-5 font-bold text-[18px] tracking-wider">
              It's all about you
            </h6>
            <p className="font-bold text-[14px] leading-relaxed">
              Try now, pay later. We want that you're really confident and happy
              with your purchase - you have 30 days before we charge you!
              Learn more about our policy.
            </p>
          </div>

          {/* Button */}
          <button className="mt-4 bg-inherit border border-white text-white p-2">
            <FaArrowRight />
          </button>
        </div>

        {/* Right Image Section */}
        <div className="mt-6 lg:mt-0 lg:ml-[-100px]">
          <Image
            width={700}
            height={280}
            src="/Frame1.png"
            alt="learnFrame"
            className="w-full max-w-[700px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
