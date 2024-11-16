import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['aceternity.com' , 'assets.aceternity.com', 'images.unsplash.com', 'media.licdn.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "media.licdn.com"
      }
    ]
  }
};

export default nextConfig;
