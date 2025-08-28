import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Learn() {
  return (
    <div className="container mb-[300px]">
      <div className="flex justify-start mt-[50px] relative">
        {/* Content Box */}
        <div className="relative left-0 p-6 sm:p-8 md:p-10 bg-zinc-400 text-white 
                        w-full sm:w-[500px] md:w-[650px] lg:w-[800px] h-auto md:h-[320px] rounded-lg">
          <div className="max-w-[300px] flex flex-col">
            <h6 className="mb-5 font-bold text-[16px] md:text-[18px] tracking-wider">
              It's all about you
            </h6>
            <p className="font-bold text-[13px] md:text-[14px] leading-relaxed">
              Try now, pay later. We want that you're really confident and happy
              with your purchase - you have 30 days before we charge you!
              Learn more about our policy.
            </p>
          </div>

          {/* Button */}
          <button className="mt-4 bg-inherit border border-white text-white p-2 rounded-md">
            <FaArrowRight />
          </button>

          {/* Image (hidden on small) */}
          <div className="
            absolute top-10 hidden sm:block 
            right-[-150px] md:right-[-250px] lg:right-[-350px]
          ">
            <Image
              width={700}
              height={280}
              src="/Frame1.png"
              alt="learnFrame"
              className="max-w-[250px] md:max-w-[400px] lg:max-w-[700px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
