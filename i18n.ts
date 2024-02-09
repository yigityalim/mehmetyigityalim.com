import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { type Locale, locales } from '@/config/locale'

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as Locale)) notFound()
    return {
        messages: (await import(`./messages/${locale}.json`)).default,
        timeZone: 'Europe/Istanbul',
        now: new Date(),
    }
})
