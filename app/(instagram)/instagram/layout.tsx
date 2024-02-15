import React from 'react'
import type { Metadata, Viewport } from 'next'
import { cn } from 'lib/utils'
import '@/styles/globals.css'
import { fontSans } from 'lib/fonts'

export const metadata: Metadata = {
    title: 'Instagram view',
    description: 'Instagram view description',
} as Metadata satisfies Metadata

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
} as Viewport satisfies Viewport

type LayoutProps = Readonly<{ children: React.ReactNode }>

export default function Layout({ children }: LayoutProps): React.ReactElement {
    return (
        <html lang='tr' suppressHydrationWarning>
            <body className={cn(fontSans.className, 'bg-background min-h-screen font-sans antialiased')}>
                {children}
            </body>
        </html>
    )
}
