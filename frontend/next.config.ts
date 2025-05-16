import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {

    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      }
    ],
  },
};

export default nextConfig;
