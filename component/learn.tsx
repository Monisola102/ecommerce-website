import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Learn() {
  return (
    <div className="container mb-[300px]">
      <div className="flex justify-start mt-[50px]">
        <div
          className="relative left-0 p-10 bg-zinc-400 text-white 
                     w-full sm:w-[800px] h-auto sm:h-[320px] rounded-lg
                     flex flex-col sm:flex-row justify-between items-center gap-6"
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

            {/* Button → Scroll to FAQ inside Support Page */}
            <Link href="/support#faq">
              <button className="mt-4 bg-inherit border border-white text-white p-2 flex items-center gap-2">
                <span>Go to FAQ</span>
                <FaArrowRight />
              </button>
            </Link>
          </div>

          {/* Image Block (inline + responsive) */}
          <div className="w-[80%] sm:w-[50%] md:w-[60%] lg:w-[700px]">
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
