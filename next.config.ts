import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true
  },
  output: "export",
};

export default nextConfig;
