import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Helps reduce hydration warnings in development
  swcMinify: true,
  experimental: {
    // Add any experimental features here
  },
  compiler: {
    emotion: true, // Enable emotion compiler optimization
  },
};

export default nextConfig;
