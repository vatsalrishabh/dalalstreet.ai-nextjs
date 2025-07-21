import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      // add other allowed domains here
    ],
  },
};

export default nextConfig;
