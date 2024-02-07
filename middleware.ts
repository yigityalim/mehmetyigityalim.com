import type { NextRequest } from 'next/server'

import i18n from './i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore
    const locales: string[] = i18n.locales
    const languages: string[] = new Negotiator({ headers: negotiatorHeaders }).languages()
    return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const pathnameHasLocale = i18n.locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: ["/((?!.*\\.).*)", "/favicon.ico"],
}