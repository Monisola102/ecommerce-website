import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Learn() {
  return (
    <div className="container mb-[300px]">
      <div className="flex justify-start mt-[50px]">
        <div
          className="relative left-0 p-10 bg-zinc-400 text-white 
                     w-full sm:w-[800px] h-auto sm:h-[320px] rounded-lg"
        >
          {/* Text Block */}
          <div className="w-full sm:w-[300px] flex flex-col">
            <h6 className="mb-5 font-bold text-[18px] tracking-wider">
              It's all about you
            </h6>
            <p className="font-bold text-[14px]">
              Try now, pay later. We want that you're really confident and happy
              with your purchase – you have 30 days before we charge you! Learn
              more about our policy.
            </p>
          </div>

          {/* Button → Scroll to FAQ inside Support Page */}
          <Link href="/support#faq">
            <button className="mt-4 bg-inherit border border-white text-white p-2 flex items-center gap-2">
              <span>Go to FAQ</span>
              <FaArrowRight />
            </button>
          </Link>

          {/* Image (hidden on mobile, responsive on tablet & desktop) */}
          <div className="absolute top-10 hidden sm:block 
                          right-[-150px] md:right-[-250px] lg:right-[-350px] 
                          w-[300px] md:w-[500px] lg:w-[700px]">
            <Image
              src="/Frame1.png"
              alt="learnFrame"
              width={700}
              height={280}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
