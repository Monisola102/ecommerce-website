import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full relative h-[65vh] sm:h-[45vh] md:h-[60vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh]">
      {/* Hero background */}
      <Image
        src="/heroooo-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Content */}
      <div className="h-full flex items-center px-4 sm:px-6 md:px-10 lg:px-20 text-white">
        <div className="mt-[50px] sm:mt-[70px] md:mt-[100px] w-full sm:w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide font-inter">
            NEW COLLECTION
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            SPRING / SUMMER 2025
          </p>
        </div>
      </div>
    </div>
  );
}
