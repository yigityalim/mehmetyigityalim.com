import '@/styles/globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { fontSans } from 'lib/fonts'
import { Providers } from '@/components/Providers'
import { cn } from 'lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/TailwindIndicator'
import { siteConfig } from '@/config/site'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Intro } from '@/components/Intro'
import { Analytics } from '@/components/Analytics'
import { SpeedInsights } from '@/components/SpeedInsights'

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
