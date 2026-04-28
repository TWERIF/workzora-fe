import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";
const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  localeDetection: false,
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
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
