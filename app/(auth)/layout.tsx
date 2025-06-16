import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div
      >
        {children}
      </div>
    </html>
  );
}
