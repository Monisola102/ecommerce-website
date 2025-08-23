export default function Hero() {
  return (
    <div className="container mx-auto px-4">
      <div className="h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh] bg-[url('/heroooo-bg.jpg')] bg-cover bg-center relative">
        <div className="h-full flex items-center px-4 sm:px-6 md:px-10 lg:px-20 text-white">
          <div className="mt-[50px] sm:mt-[70px] md:mt-[100px] w-full sm:w-[80%] md:w-[60%] lg:w-[50%] flex flex-col gap-y-2">
            <h1 className="text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[66.94px] font-bold tracking-[1px] sm:tracking-[1.5px] md:tracking-[2px] font-inter">
              NEW COLLECTION
            </h1>
            <p className="text-[18px] sm:text-[22px] md:text-[25px] lg:text-[28px] xl:text-[29.29px] font-bold">
              SPRING/SUMMER2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
