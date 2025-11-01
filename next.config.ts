import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Simplified configuration for Netlify compatibility
  images: {
    unoptimized: true,
  },
  // Ensure proper static generation
  trailingSlash: false,
  // Disable problematic features for edge functions
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  
};

export default nextConfig;
