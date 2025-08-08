import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {},
});

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_PATH}/:path*`, // Proxy to Backend
      },
    ];
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200],
    domains: [
      'img.youtube.com',
      'res.cloudinary.com',
      'www.youtube.com',
      'api.dicebear.com',
      'sm.ign.com',
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(config);
