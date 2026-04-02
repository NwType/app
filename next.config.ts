import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Enable Next.js optimized image serving (auto-converts to WebP, resizes)
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [200, 400, 640, 900, 1280],
    imageSizes: [100, 200, 400],
    minimumCacheTTL: 3600,
  },
  async headers() {
    return [
      {
        source: '/music/:path*',
        headers: [
          { key: 'Accept-Ranges', value: 'bytes' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ]
  },
}

export default nextConfig
