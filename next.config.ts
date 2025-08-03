import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'], 
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
