
import type { Metadata } from "next";
import Providers from "@/app/provider";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthCartSync from "@/component/AuthCartSync";
import FavoritesSync from "@/component/FavoriteSync";
export const metadata: Metadata = {
  title: {
    template: "Shoe Shop",
    default: "The Shoe Shop",
  },
  description: "your one stop shop store for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        <Providers>
            <AuthCartSync />
 <FavoritesSync /> 
          {children}
        </Providers>
      </body>
    </html>
  );
}
