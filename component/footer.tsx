import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <div className="bg-gray-100 p-[80px] ">
        <div className="flex justify-between text-white items-center w-[100%]">
          <div className="flex flex-col gap-2 ">
            <p className="text-black font-bold text-[10px]">FOOTER1</p>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[10px]">FOOTER2</p>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[10px]">FOOTER3</p>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[10px]">FOOTER4</p>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[10px]">FOOTER5</p>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[10px]">FOOTER6</p>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
            <Link href="/" className="text-gray-400 text-[8px]">
              Item
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 p-[20px]">
        <div className="flex items-center justify-center">
          <Image width={20} height={20} src="/symbol.png" alt="symbol" />
        </div>
      </div>
    </div>
  );
}
