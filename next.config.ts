import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Helps reduce hydration warnings in development
  swcMinify: true,
  experimental: {
    // Add any experimental features here
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
  compiler: {
    emotion: true, // Enable emotion compiler optimization
  },
  typescript: {
    // !! WARNING: This will ignore all TS errors !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
