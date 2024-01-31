import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import React from 'react'

import Providers from 'components/Providers/clientSideProvider'
import ProductionMode from 'components/ProductionMode'
import { cn } from '@/utils'
import { Toaster } from 'components/ui/sonner'
import i18n, { type Locale } from '@/i18n.config'

export const metadata: Metadata = {
    title: 'Mehmet Yiğit Yalım',
    description: "Mehmet Yiğit Yalım's personal website.",
    keywords:
        'Mehmet Yiğit Yalım, mehmet-yigit-yalim, mehmet yigit yalim, mehmet yalim, mehmet-yalim, mehmet yalım, mehmet-yalım, mehmet, yalim, yalım, yigit, yıgıt, yıgıt, yigit, yalım, yalim',
    applicationName: 'mehmetyigityalim.com',
    authors: {
        url: 'https://mehmetyigityalim.com',
        name: 'Mehmet Yiğit Yalım',
    },
    referrer: 'no-referrer',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

type RootLayoutProps = Readonly<{ children: React.ReactNode; params: { lang: Locale } }>

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({ children, params }: RootLayoutProps): React.JSX.Element {
    return (
        <html lang={params.lang} suppressHydrationWarning>
            <body className={cn(GeistSans.className)}>
                <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <ProductionMode>{children}</ProductionMode>
                </Providers>
                <Analytics />
                <SpeedInsights />
                {/*
                    <TailwindIndicator />
                */}
                <Toaster />
            </body>
        </html>
    )
}
