import '@/styles/globals.css'
import React from 'react'
import { Analytics } from 'components/Analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { fontSans } from 'lib/fonts'
import { ClientSideProvider } from '@/components/Providers/clientSideProvider'
import { cn } from 'lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/TailwindIndicator'
import { siteConfig } from '@/config/site'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Intro } from '@/components/Intro'

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
    manifest: `${siteConfig.url}/manifest.webmanifest`,
} as Metadata satisfies Metadata

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export default async function RootLayout({ children }: RootLayoutProps): Promise<React.JSX.Element> {
    return (
        <html lang='tr' suppressHydrationWarning>
            <body className={cn(fontSans.className, 'bg-background min-h-screen font-sans antialiased')}>
                <ClientSideProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Intro />
                    <Header />
                    {children}
                    <Footer />
                </ClientSideProvider>
                <Analytics />
                <SpeedInsights />
                <TailwindIndicator />
                <Toaster />
            </body>
        </html>
    )
}
