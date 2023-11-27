import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format as _format } from 'date-fns'
import { tr } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase())
    if (!result) {
        return { r: 0, g: 0, b: 0 }
    }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    }
}

export function textColorForBackground(color: string): string {
    const { r, g, b } = hexToRgb(color)
    return (r * 299 + g * 587 + b * 114) / 1000 >= 128 ? 'black' : 'white'
}

export function darkenColor(hex: string, percent: number): string {
    const num: number = parseInt(hex.slice(1), 16)
    const amt: number = Math.round(2.55 * percent)
    const R: number = (num >> 16) - amt > 0 ? (num >> 16) - amt : 0
    const G: number = ((num >> 8) & 255) - amt > 0 ? ((num >> 8) & 255) - amt : 0
    const B: number = (num & 255) - amt > 0 ? (num & 255) - amt : 0

    return `#${(1 << 24) + (R << 16) + (G << 8) + B}`
}

export function formatDateTime(date: Date, format?: string): string {
    return _format(new Date(date), format ?? 'dd MMMM yyyy')
}

export function getPostedAtText(date: Date | string, i18n: 'tr' | 'en' = 'tr'): string {
    if (!date) return ''

    const now: Date = new Date()
    const postedAt: Date = new Date(date)
    const timeDiff: number = now.getTime() - postedAt.getTime()
    const secondsDiff: number = Math.floor(timeDiff / 1000)
    const minutesDiff: number = Math.floor(secondsDiff / 60)
    const hoursDiff: number = Math.floor(minutesDiff / 60)
    const daysDiff: number = Math.floor(hoursDiff / 24)

    const i18nText: Record<string, Record<string, string>> = {
        tr: {
            second: 'saniye',
            minute: 'dakika',
            hour: 'saat',
            yesterday: 'Dün',
            day: 'gün',
            month: 'ay',
        },
        en: {
            second: 'second',
            minute: 'minute',
            hour: 'hour',
            yesterday: 'Yesterday',
            day: 'day',
            month: 'month',
        },
    }

    const getI18nText = (unit: string, count: number): string => {
        const text = i18nText[i18n][unit]
        if (i18n === 'tr') {
            return `${count} ${text} önce`
        } else {
            if (count === 1 && unit === 'day') {
                return i18nText[i18n].yesterday
            }
            return `${count} ${text}${count > 1 ? 's' : ''} ago`
        }
    }

    if (secondsDiff < 60) {
        return getI18nText('second', secondsDiff)
    } else if (minutesDiff < 60) {
        return getI18nText('minute', minutesDiff)
    } else if (hoursDiff < 24) {
        return getI18nText('hour', hoursDiff)
    } else if (daysDiff === 1) {
        return getI18nText('day', daysDiff)
    } else if (daysDiff < 30) {
        return getI18nText('day', daysDiff)
    } else {
        const monthsDiff = Math.floor(daysDiff / 30)
        return getI18nText('month', monthsDiff)
    }
}
