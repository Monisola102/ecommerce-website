"use client";

import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] bg-gray-100 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300" />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to My Shop</h1>
        <p className="text-lg md:text-xl mb-8">
          Explore our best products and find what suits you.
        </p>
        <a
          href="/support#faq"
          className="inline-flex flex-col items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowDown className="text-3xl animate-bounce" />
          <span className="mt-2 text-sm md:text-base">Go to FAQ</span>
        </a>
      </div>

      {/* Hero Image (only hidden between 600px - 680px) */}
      <div className="absolute bottom-0 left-10">
        <Image
          src="/hero-image.png"
          alt="Hero"
          width={400} // fixed width
          height={400} // fixed height
          className="object-contain"
        />
      </div>

      {/* Custom Media Query for hiding image between 600px - 680px */}
      <style jsx>{`
        @media (min-width: 600px) and (max-width: 680px) {
          section div > :global(img) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
