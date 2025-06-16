import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/component/header";
import Footer from "@/component/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <div
      >
       <Header/> 
        {children}
        <Footer/>
      </div>
    </html>
  );
}
