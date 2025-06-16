export default function Hero() {
  return (
    <div className="h-[75vh] bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="container mx-auto h-full flex items-center text-left text-white px-[40px] ">
        <div className="mt-[100px] w-[40px] flex flex-col gap-y-2  ">
          <h1 className="text-[66.94px] font-bold tracking-[2px] font-inter">NEW COLLECTION</h1>
          <p className="text-[29.29px] font-bold">SPRING/SUMMER2021</p>
        </div>
      </div>
    </div>
  );
}
