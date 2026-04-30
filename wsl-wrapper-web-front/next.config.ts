import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  // Replace 'wsl_wrapper_public' with your actual GitHub repository name
  basePath: '/wsl_wrapper_public',
  // This ensures assets like /favicon.ico work correctly
  assetPrefix: '/wsl_wrapper_public/', 
};

export default nextConfig;