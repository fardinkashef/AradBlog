import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // This allows production builds to complete even if there are ESLint errors, otherwise the production build will fail if there are eslint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This allows production builds to complete even if there are TypeScript errors, otherwise the production build will fail if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
