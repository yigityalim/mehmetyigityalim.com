import createJiti from 'jiti'
import { createContentlayerPlugin } from 'next-contentlayer'
const jiti = createJiti(new URL(import.meta.url).pathname)

jiti('./env')

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
    transpilePackages: ['lucide-react'],
}

const withContentlayer = createContentlayerPlugin({
    // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
