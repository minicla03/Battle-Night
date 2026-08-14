/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow HMR to work when accessing via network IP (e.g. 192.168.x.x)
  devIndicators: false,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
      }
    }
    return config
  },
}

export default nextConfig
