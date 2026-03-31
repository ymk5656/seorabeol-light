import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/seorabeol-light',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
