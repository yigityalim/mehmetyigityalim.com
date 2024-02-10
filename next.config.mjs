import createNextIntlPlugin from 'next-intl/plugin'
import createJiti from 'jiti'

const jiti = createJiti(new URL(import.meta.url).pathname)

jiti('./env')

const withNextIntl = createNextIntlPlugin()

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
};

export default withNextIntl(nextConfig)