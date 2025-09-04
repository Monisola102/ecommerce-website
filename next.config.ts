import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-ecommerce-deployment.onrender.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://my-shoe-shop-backend.vercel.app/api/:path*",
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
