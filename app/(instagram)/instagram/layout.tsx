import React from 'react'
import type { Metadata, Viewport } from 'next'
import { cn } from 'lib/utils'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'

export const metadata = {
    title: 'Instagram view',
    description: 'Instagram view description',
} satisfies Metadata

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
} satisfies Viewport

type LayoutProps = Readonly<{ children: React.ReactNode }>

export default function Layout({ children }: LayoutProps): React.ReactElement {
    return (
        <html lang='tr' suppressHydrationWarning>
            <body className={cn('min-h-screen font-sans antialiased', GeistSans.className)}>{children}</body>
        </html>
    )
}
