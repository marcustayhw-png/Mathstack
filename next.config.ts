import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },
    typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['better-auth', 'better-call', 'zod', 'framer-motion'],
};

export default nextConfig;
// Orchids restart: 1767971900629
