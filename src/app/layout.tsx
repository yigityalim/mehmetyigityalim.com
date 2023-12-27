import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins, Noto_Sans } from 'next/font/google'
import './globals.css'
import React from 'react'

import Providers from 'components/Providers/clientSideProvider'
import ProductionMode from 'components/ProductionMode'
import { cn } from '@/utils'
import { Toaster } from 'components/ui/sonner'

const inter = Inter<'--font-inter'>({ subsets: ['latin'] })

const poppins = Poppins<'--font-poppins'>({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})
const notoSans = Noto_Sans<'--font_noto_sans'>({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

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

type RootLayoutProps = Readonly<{
    children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
    return (
        <html lang='en'>
            <body className={cn(inter.variable, poppins.variable, notoSans.variable)}>
                <Providers attribute='class' defaultTheme='dark' forcedTheme='dark'>
                    <ProductionMode>{children}</ProductionMode>
                </Providers>
                <Analytics />
                {/*
                    <TailwindIndicator />
                */}
                <Toaster />
            </body>
        </html>
    )
}
