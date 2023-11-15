import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import React from 'react'

import Providers from 'components/Providers/clientSideProvider'
import ProductionMode from 'components/ProductionMode'

const fontSans = FontSans({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Mehmet Yiğit Yalım',
    description: "Mehmet Yiğit Yalım's personal website.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={fontSans.className}>
                <Providers attribute='class' defaultTheme='system' enableSystem>
                    <ProductionMode>{children}</ProductionMode>
                </Providers>
            </body>
        </html>
    )
}
