import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/component/header";

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
        
      </div>
    </html>
  );
}
