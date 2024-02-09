import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import React from 'react'

import Providers from '@/components/Providers/clientSideProvider'
import Intro from 'components/Intro'
import { cn } from '@/utils'
import { Toaster } from '@/components/ui/toaster'
import i18n, { type Locale } from '@/i18n.config'
import TailwindIndicator from '@/components/TailwindIndicator'

export const metadata: Metadata = {
    title: 'Mehmet Yiğit Yalım',
    description: 'Mehmet Yiğit Yalim personal website.',
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

type RootLayoutProps = Readonly<{
    children: React.ReactNode
    params: { lang: Locale }
}>

export async function generateStaticParams(): Promise<{ lang: Locale }[]> {
    return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({ children, params }: RootLayoutProps): React.ReactElement {
    return (
        <html lang={params.lang} suppressHydrationWarning>
            <body className={cn(GeistSans.className)}>
                <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Intro>{children}</Intro>
                </Providers>
                <Analytics />
                <SpeedInsights />
                <TailwindIndicator />
                <Toaster />
            </body>
        </html>
    )
}
