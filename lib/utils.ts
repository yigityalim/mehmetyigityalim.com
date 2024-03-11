import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
    format as _format,
    formatDistanceToNow,
    differenceInDays,
    differenceInMonths,
    parseISO,
    format,
    addMonths,
} from 'date-fns'
import { tr } from 'date-fns/locale'

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase())
    if (!result) return { r: 0, g: 0, b: 0 }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    }
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
    }).format(price)
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

export function formatReadMinute(minute: number): string {
    if (minute > 60) {
        const hour = Math.floor(minute / 60)
        const _minute = minute % 60
        return `${hour} saat ${_minute} dakika okuma süresi`
    } else {
        return `${minute} dakika okuma süresi`
    }
}

export function formatDateTimeInMonths(date: string): string {
    const now = new Date()
    const _date = parseISO(date)
    const ayFarki = differenceInMonths(now, _date)

    if (ayFarki < 1) {
        if (differenceInDays(now, _date) < 30) {
            return formatDistanceToNow(_date, { addSuffix: true, locale: tr })
        } else {
            return format(addMonths(_date, ayFarki), 'PP', { locale: tr })
        }
    }
    return format(_date, 'dd MMMM yyyy', { locale: tr })
}
