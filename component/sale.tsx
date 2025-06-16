import Link from "next/link";
import women from "@/public/women.jpg";
import men from "@/public/men.jpg";
import kids from "@/public/kids.jpg";
import { StaticImageData } from "next/image";

interface SalesType {
  para: string;
  para2: string;
  link: string;
  img: StaticImageData;
}

export default function Sales() {
  const collections = [
    {
      link: "/Women",
      para: "Women's",
      para2: "Shop the collection",
      img: women,
    },
    {
      link: "/Men",
      para: "Men's",
      para2: "Shop the collection",
      img: men,
    },
    {
      link: "/Kids",
      para: "Kid's",
      para2: "Shop the collection",
      img: kids,
    },
  ];

  const Collection = ({ c }: { c: SalesType }) => (
    <div>
      <div
        className="h-[400px] w-[300px] bg-cover bg-center rounded-md flex flex-col p-2 justify-end"
        style={{ backgroundImage: `url(${c.img.src})` }}
      >
        <Link
          className="text-sm text-white font-bold hover:underline hover:cursor-pointer"
          href={c.link}
        >
          {c.para2}
        </Link>
        <p className="text-xl font-semibold text-blue-400">{c.para}</p>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <div className="bg-[url('/salebg.jpg')] bg-cover bg-center h-[500px]">
        <h1 className=" py-[100px] text-center text-5xl font-bold text-white">
          Mid-Season Sale
        </h1>
        <button className="flex items-center rounded-3xl text-[16px]  justify-center w-[200px] max-w-[90%] mx-auto bg-blue-400/60 text-white font-bold px-4 py-3 border border-white -translate-y-6 hover:cursor-pointer hover:bg-inherit hover:backdrop-blur-sm  hover:text-blue-400">
          Shop Collection
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[50px] p-4 absolute bottom-[-280px] left-[97px]">
        {collections.map((c, i) => (
          <Collection key={i} c={c} />
        ))}
      </div>
    </div>
  );
}
