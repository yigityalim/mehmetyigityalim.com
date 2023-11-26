'use client'

import * as React from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ClientSideProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
    return (
        <NextUIProvider>
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </NextUIProvider>
    )
}
