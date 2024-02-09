import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import React from 'react'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { ClientSideProvider } from '@/components/Providers/clientSideProvider'
import Intro from 'components/Intro'
import { cn } from '@/utils'
import { Toaster } from '@/components/ui/toaster'
import { Locale, locales } from '@/config/locale'
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
    params: { locale: Locale }
}>

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
                                             children,
                                             params: { locale },
                                         }: RootLayoutProps): Promise<React.JSX.Element> {
    unstable_setRequestLocale(locale)
    const messages = await getMessages()
    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn(GeistSans.className)}>
            <ClientSideProvider locale={locale} messages={messages} attribute="class" defaultTheme="system" enableSystem
                                disableTransitionOnChange>
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
