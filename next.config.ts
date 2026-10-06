import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";
const nextConfig: NextConfig = {
  i18n: { ...i18n, localeDetection: false },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", 
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
