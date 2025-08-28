import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Learn() {
  return (
    <div className="container mb-[300px]">
      <div className="flex justify-start mt-[50px]">
        <div className="relative left-0 p-10 bg-zinc-400 text-white max-w-[800px] h-auto md:h-[320px] rounded-lg">
          <div className="w-full md:w-[300px] flex flex-col">
            <h6 className="mb-5 font-bold text-[18px] tracking-wider">
              It's all about you
            </h6>
            <p className="font-bold text-[14px]">
              Try now, pay later. We want that you're really confident and happy
              with your purchase - you have 30 days before we charge you! Learn more
              about our policy.
            </p>
          </div>

          {/* Button links to Support page FAQ */}
          <Link href="/support#faq">
            <button className="mt-4 bg-inherit border border-white text-white p-2 rounded hover:bg-white hover:text-zinc-800 transition">
              <FaArrowRight />
            </button>
          </Link>

          <div className="absolute right-[-350px] top-10 hidden md:block">
            <Image width={700} height={280} src="/Frame1.png" alt="learnFrame" />
          </div>
        </div>
      </div>
    </div>
  );
}
