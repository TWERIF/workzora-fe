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
  typescript: {
    // Увага: це дозволить успішно завершити білд, 
    // навіть якщо є помилки TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
