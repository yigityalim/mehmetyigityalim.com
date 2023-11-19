const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com',
            },
            {
                protocol: 'https',
                hostname: 'assets.vercel.com',
            },
            {
                protocol: 'https',
                hostname: 'vitejs.dev',
            },
            {
                protocol: 'https',
                hostname: 'astro.build',
            },
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = withContentlayer(nextConfig)
