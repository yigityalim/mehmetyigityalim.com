import { createLocalizedPathnamesNavigation, Pathnames as NextIntlPathnames } from 'next-intl/navigation'
import { locales } from '@/config/locale'

export const localePrefix = 'always' as const
export const pathnames = {
    '/': '/',
    '/blog': '/blog',
    '/projects': '/projects',
    '/contact': '/contact',
    '/plans': '/plans',
    '/references': '/references',

    '/blog/[id]': '/blog/[id]',
    '/plans/[type]': '/plans/[type]',
} satisfies NextIntlPathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames,
})

export { locales }
export type { Locale } from '@/config/locale'
export type Pathnames = typeof pathnames
