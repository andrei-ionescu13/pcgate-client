const { i18n } = require('./next-i18next.config')

const config = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_PATH}/:path*` // Proxy to Backend
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n,
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['img.youtube.com', 'res.cloudinary.com', 'www.youtube.com', 'avatars.dicebear.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = config