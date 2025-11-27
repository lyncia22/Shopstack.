import type { NextConfig } from 'next';
require('dotenv').config();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ],
  }),
};

export default nextConfig;
