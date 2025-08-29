import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Learn() {
    const router = useRouter();
const handleClick = () => {
router.push('/support');

}
  return (
    <div className="container mb-[200px] sm:mb-[250px] lg:mb-[300px]">
      <div className="flex justify-start mt-[50px]">
        <div className="
          relative left-0 p-6 sm:p-8 lg:p-10 bg-zinc-400 text-white 
          w-full sm:w-[600px] md:w-[700px] lg:w-[800px] 
          h-auto lg:h-[320px]
        ">
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
          <button onClick={handleClick} className="mt-4 bg-inherit border border-white text-white p-2 w-fit">
            <FaArrowRight />
          </button>

          {/* Image Section */}
          <div
            className="
              hidden sm:block absolute 
              right-[-120px] md:right-[-230px] lg:right-[-300px]
              top-10 sm:top-14 md:top-18 lg:top-22
            "
          >
            <Image
              src="/frameLearn2.jpg"
              alt="learnFrame"
              width={700}
              height={280}
              className="
                w-[400px] h-[200px] 
                sm:w-[380px] sm:h-[220px] 
                md:w-[570px] md:h-[250px] 
                lg:w-[700px] lg:h-[280px]
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
