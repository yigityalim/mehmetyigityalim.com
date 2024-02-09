'use client'

import * as React from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { Locale } from '@/config/locale'

export interface ClientSideProviderProps extends ThemeProviderProps {
    locale: Locale
    messages: AbstractIntlMessages
}

export function ClientSideProvider({ children, locale, messages, ...props }: Readonly<ClientSideProviderProps>) {
    return (
        <NextThemesProvider {...props}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </NextThemesProvider>
    )
}