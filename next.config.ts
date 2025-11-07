import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "be-if-merch-recreate.test" },
    ],
  },
};

export default nextConfig;
