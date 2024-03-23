import '@/styles/globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Header } from '@/components/site-header'
import { Footer } from '@/components/site-footer'
import { Intro } from '@/components/intro'
import { Analytics } from '@/components/analytics'
import { SpeedInsights } from '@/components/speed-insights'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    applicationName: 'mehmetyigityalim.com',
    authors: {
        url: 'https://mehmetyigityalim.com',
        name: 'Mehmet Yiğit Yalım',
    },
    creator: 'Mehmet Yiğit Yalım',
    referrer: 'no-referrer',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        shortcut: '/favicon-16x16.png',
    },
    manifest: `${new URL(siteConfig.url).pathname}/manifest.webmanifest`,
} as Metadata satisfies Metadata

export default async function RootLayout({ children }: React.PropsWithChildren): Promise<React.JSX.Element> {
    return (
        <html lang='tr' suppressHydrationWarning>
            <body className={cn(fontSans.className, 'min-h-screen bg-background font-sans antialiased')}>
                <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Intro />
                    <Header />
                    {children}
                    <Footer />
                </Providers>
                <Analytics />
                <SpeedInsights />
                <TailwindIndicator />
                <Toaster />
            </body>
        </html>
    )
}
