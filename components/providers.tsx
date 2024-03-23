'use client'

import * as React from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {}
export interface ClientSideProviderProps extends ThemeProviderProps, Props {}

export function Providers({ children, ...props }: Readonly<ClientSideProviderProps>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
