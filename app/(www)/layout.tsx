import '@/styles/globals.css'
import React from 'react'
import { Analytics } from 'components/Analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { fontSans } from 'lib/fonts'
import { ClientSideProvider } from '@/components/Providers/clientSideProvider'
import Intro from 'components/Intro'
import { cn } from 'lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { TailwindIndicator } from '@/components/TailwindIndicator'

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
} as Metadata satisfies Metadata

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
} as Viewport satisfies Viewport

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

export default async function RootLayout({ children }: RootLayoutProps): Promise<React.JSX.Element> {
    return (
        <html lang='tr' suppressHydrationWarning>
            <body className={cn(fontSans.className, 'bg-background min-h-screen font-sans antialiased')}>
                <ClientSideProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Intro>{children}</Intro>
                </ClientSideProvider>
                <Analytics />
                <SpeedInsights />
                <TailwindIndicator />
                <Toaster />
            </body>
        </html>
    )
}
