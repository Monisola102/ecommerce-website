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
        className="h-[400px] w-[300px] bg-cover bg-center rounded-2xl overflow-hidden"
        style={{ backgroundImage: `url(${c.img.src})` }}
      >
        <div className="absolute inset-0 bg-black/5" />
      <div className="relative z-10 flex flex-col justify-end h-full p-4">
        <p className="text-xl font-semibold text-white mb-2">{c.para}</p>
        <Link
          href={c.link}
          className="inline-block text-center bg-blue-400/70 text-white font-semibold text-[16px] px-4 py-2 rounded-full  hover:cursor-pointer hover:bg-inherit hover:backdrop-blur-sm hover:text-white transition-all duration-300"
        >
          {c.linkText}
        </Link>
      </div>
      </div>
  );

  return (
    <div className="container">
    <div className="relative pb-[300px]">
      <div className="w-full bg-[url('/salebg.jpg')] bg-cover bg-center h-[90vh] flex flex-col items-center justify-center">
        <h1 className=" text-center text-5xl font-bold text-white mb-8">
          Mid-Season Sale
        </h1>
        <button className="flex items-center rounded-3xl text-[16px]  justify-center w-[200px] max-w-[90%] mx-auto bg-blue-400/60 text-white font-bold px-4 py-3 border border-white  hover:cursor-pointer hover:bg-inherit hover:backdrop-blur-sm  hover:text-blue-400 transition-all duration-300">
          Shop Collection
        </button>
      </div>
      <div className="relative pb-[200px]">
      <div className="flex absolute bottom-[-150px] left-1/2 transform -translate-x-1/2 gap-4">
        {collections.map((c, i) => (
          <Collection key={i} c={c} />
        ))}
      </div>
      </div>
    </div>
    </div>
  );
}
