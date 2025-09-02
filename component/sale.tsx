import Link from "next/link";
import women from "@/public/women.jpg";
import men from "@/public/men.jpg";
import kids from "@/public/kids.jpg";
import { StaticImageData } from "next/image";

interface SalesType {
  para: string;
  link: string;
  linkText: string;
  img: StaticImageData;
}

export default function Sales() {
  const collections = [
    {
      link: "/Women",
      para: "Women's",
      linkText: "Shop Women's",
      img: women,
    },
    {
      link: "/Men",
      para: "Men's",
      linkText: "Shop Men's",
      img: men,
    },
    {
      link: "/Kids",
      para: "Kid's",
      linkText: "Shop Kids",
      img: kids,
    },
  ];

  const Collection = ({ c }: { c: SalesType }) => (
    <div
      className="relative w-[250px] sm:w-[280px] md:w-[300px] lg:w-[320px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-cover bg-center rounded-2xl overflow-hidden flex-shrink-0"
      style={{ backgroundImage: `url(${c.img.src})` }}
    >
      <div className="absolute inset-0 bg-black/5" />
      <div className="relative z-10 flex flex-col justify-end h-full p-4">
        <p className="text-lg sm:text-xl font-semibold text-white mb-2">{c.para}</p>
        <Link
          href={c.link}
          className="inline-block text-center bg-blue-400/70 text-white font-semibold text-sm sm:text-[16px] px-3 sm:px-4 py-2 rounded-full hover:cursor-pointer hover:bg-inherit hover:backdrop-blur-sm hover:text-white transition-all duration-300"
        >
          {c.linkText}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="w-full bg-[url('/salebg.jpg')] bg-cover bg-center h-[70vh] sm:h-[80vh] md:h-[90vh] flex flex-col items-center justify-center relative">
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
          Mid-Season Sale
        </h1>
        <button className="flex items-center justify-center rounded-3xl text-sm sm:text-[16px] w-[180px] sm:w-[200px] max-w-[90%] bg-blue-400/60 text-white font-bold px-4 py-3 border border-white hover:cursor-pointer hover:bg-inherit hover:backdrop-blur-sm hover:text-blue-400 transition-all duration-300">
          Shop Collection
        </button>
      </div>
      <div className="w-full py-20 sm:py-28 px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 overflow-x-auto scrollbar-hide">
          {collections.map((c, i) => (
            <Collection key={i} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
