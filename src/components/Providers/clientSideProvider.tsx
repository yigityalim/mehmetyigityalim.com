'use client'

import * as React from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ClientSideProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
