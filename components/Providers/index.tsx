'use client'

import * as React from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export interface ClientSideProviderProps extends ThemeProviderProps {}

export function Providers({ children, ...props }: Readonly<ClientSideProviderProps>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
