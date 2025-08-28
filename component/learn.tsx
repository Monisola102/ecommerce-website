import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function Learn() {
  return (
    <div className="container mb-[300px]">
      <div className="flex justify-start mt-[50px]">
        <div className="relative left-0 p-10 bg-zinc-400 text-white w-[800px] h-[320px]">
          {/* Text Section */}
          <div className="w-[300px] flex flex-col">
            <h6 className="mb-5 font-bold text-[18px] tracking-wider">
              It's all about you
            </h6>
            <p className="font-bold text-[14px]">
              Try now, pay later. We want that you're really confident and happy
              with your purchase - you have 30 days before we charge you!
              Learn more about our policy.
            </p>
          </div>

          {/* Button */}
          <button className="mt-4 bg-inherit border border-white text-white p-2">
            <FaArrowRight />
          </button>

          {/* Image Section */}
          <div
            className="
              absolute right-[-350px] top-10
              hidden sm:block
              sm:right-[-350px]
              md:right-[-350px]
              lg:right-[-350px]
              
              [@media(min-width:600px)]:hidden 
              [@media(min-width:681px)]:block
            "
          >
            <Image
              width={700}
              height={280}
              src="/Frame1.png"
              alt="learnFrame"
              className="w-[700px] h-[280px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
