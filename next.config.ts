import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";
const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  localeDetection: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // Дозволяє всі шляхи на цьому хості
      },
    ],
  },
};

export default nextConfig;
