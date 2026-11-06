import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hide the Next.js "N" badge during local development.
  devIndicators: false,
};

export default nextConfig;
