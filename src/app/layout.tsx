import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import React from 'react'

import Providers from 'components/Providers/clientSideProvider'
import ProductionMode from 'components/ProductionMode'
import TailwindIndicator from 'components/TailwindIndicator'

const fontSans = FontSans({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Mehmet Yiğit Yalım',
    description: "Mehmet Yiğit Yalım's personal website.",
}

type RootLayoutProps = Readonly<{
    children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
    return (
        <html lang='en'>
            <body className={fontSans.className}>
                <Providers attribute='class' defaultTheme='system' enableSystem>
                    <ProductionMode>{children}</ProductionMode>
                </Providers>
                <Analytics />
                <TailwindIndicator />
            </body>
        </html>
    )
}
