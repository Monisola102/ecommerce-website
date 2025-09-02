import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="bg-gray-100 px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[12px]">FOOTER1</p>
            <Link href="/Women" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Men" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Kids" className="text-gray-500 text-[10px]">Item</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[12px]">FOOTER2</p>
            <Link href="/Women" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Men" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Kids" className="text-gray-500 text-[10px]">Item</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[12px]">FOOTER3</p>
            <Link href="/Sale" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Men" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Kids" className="text-gray-500 text-[10px]">Item</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[12px]">FOOTER4</p>
            <Link href="/Women" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Men" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Kids" className="text-gray-500 text-[10px]">Item</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[12px]">FOOTER5</p>
            <Link href="/Sale" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Women" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Men" className="text-gray-500 text-[10px]">Item</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-[12px]">FOOTER6</p>
            <Link href="/Kids" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Women" className="text-gray-500 text-[10px]">Item</Link>
            <Link href="/Men" className="text-gray-500 text-[10px]">Item</Link>
          </div>
        </div>
      </div>
      <div className="bg-indigo-900 p-4">
        <div className="flex items-center justify-center">
          <Image width={24} height={24} src="/symbol.png" alt="symbol" />
        </div>
      </div>
    </footer>
  );
}
