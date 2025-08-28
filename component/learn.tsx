import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Learn() {
  return (
    <div className="container mb-[100px] sm:mb-[200px] lg:mb-[300px]">
      <div className="flex justify-start mt-[50px]">
        <div className="relative left-0 p-6 sm:p-8 lg:p-10 bg-zinc-400 text-white 
                        w-full sm:w-[600px] lg:w-[900px] xl:w-[1000px] 
                        h-auto lg:h-[320px] rounded-lg">

          {/* Text Section */}
          <div className="w-full sm:w-[300px] flex flex-col">
            <h6 className="mb-5 font-bold text-[16px] sm:text-[18px] tracking-wider">
              It's all about you
            </h6>
            <p className="font-bold text-[14px] sm:text-[15px]">
              Try now, pay later. We want that you're really confident and happy
              with your purchase - you have 30 days before we have to charge you!
              Learn more about our policy.
            </p>
          </div>

          {/* Button */}
          <button className="mt-4 bg-inherit border border-white text-white p-2 w-fit">
            <FaArrowRight />
          </button>

          {/* Image Section (hidden on small/medium, visible only from lg and up) */}
          <div className="hidden lg:block absolute right-[-200px] xl:right-[-350px] top-10 
                          w-[500px] xl:w-[700px]">
            <Image
              width={700}
              height={280}
              src="/Frame1.png"
              alt="learnFrame"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
