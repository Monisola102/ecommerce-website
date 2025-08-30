import type { Metadata } from "next";
import Providers from "@/app/provider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthCartSync from "@/component/AuthCartSync";
import FavoritesSync from "@/component/FavoriteSync";
import { Suspense } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you want
});

export const metadata: Metadata = {
  title: {
    template: "Shoe Shop",
    default: "The Shoe Shop",
  },
  description: "your one stop shop store for all your needs",
   icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="font-poppins antialiased">
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthCartSync />
            <FavoritesSync />
          </Suspense>

          {children}
        </Providers>
      </body>
    </html>
  );
}
