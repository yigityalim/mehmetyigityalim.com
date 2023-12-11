import { ButtonProps } from 'components/ui/button'
import crypto from 'crypto'

export type Framework = 'HTML, CSS, JS' | 'Vite.js' | 'Next.js'

export type Pricing = {
    id: string
    name: string
    type: 'basic' | 'standart' | 'advanced'
    description?: string
    price: number

    pageNumber: number
    revision: number
    framework: {
        id: number
        index: boolean
        name: Framework
        description: string
        cost: number
    }[]
    typeScript: boolean
    testing: boolean
    design: boolean
    auth: boolean
    payment: boolean
    seo: boolean
    analytics: boolean
    hosting: boolean
    dns: boolean
    i18n: boolean

    mostPopular?: boolean
    recommended?: boolean

    [key: string]: any

    color?: {
        heading: string
        backdrop?: string
        border?: string
        top?: string
        icon?: string
        addPrice?: string
    }

    button: Array<{
        border: boolean
        text: string
        href: string
        colorVariant?: ButtonProps['variant']
        [key: string]: any
    }>
}
export const pricing: Pricing[] = [
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Başlangıç',
        type: 'basic',
        description:
            'Temel web siteleri için ideal bir başlangıç. HTML, CSS ve JS ile oluşturulmuş, kullanımı kolay ve hızlı.',
        price: 5000,
        pageNumber: 3,
        revision: 2,
        framework: [
            {
                index: true,
                name: 'HTML, CSS, JS',
                cost: 0,
            },
            {
                name: 'Vite.js',
                description: 'Hızlı Web Uygulamaları için',
                cost: 1000,
            },
        ],
        typeScript: false,
        testing: false,
        design: true,
        auth: false,
        payment: false,
        seo: false,
        analytics: false,
        hosting: true,
        dns: true,
        i18n: false,
        color: { addPrice: 'text-white bg-zinc-500 dark:bg-zinc-700 dark:text-zinc-300' },
        button: [
            {
                border: false,
                colorVariant: 'default',
                text: 'Hemen Başla',
                href: 'basic',
            },
        ],
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Orta',
        type: 'standart',
        description:
            'Vite.js ile güçlendirilmiş, hızlı ve modern web siteleri için ideal. TypeScript desteğiyle performansı artırın.',
        price: 10000,
        pageNumber: 5,
        revision: 3,
        framework: [
            {
                id: 0,
                index: true,
                name: 'Vite.js',
                description: 'Hızlı Web Uygulamaları için',
                cost: 0,
            },
            {
                id: 1,
                name: 'Next.js',
                description: 'En Gelişmiş Web Uygulamaları için',
                cost: 1000,
            },
        ],
        typeScript: true,
        testing: false,
        design: true,
        auth: false,
        payment: false,
        seo: false,
        analytics: true,
        hosting: false,
        dns: true,
        i18n: true,
        color: {
            heading: 'text-indigo-500 dark:text-indigo-600',
            backdrop: 'bg-gradient-to-r from-pink-900 to-purple-600',
            border: 'z-30 border-2 border-indigo-500 dark:border-indigo-700',
            top: 'border-indigo-400 text-indigo-400 dark:border-indigo-700 dark:bg-zinc-950 dark:text-indigo-600',
            addPrice: 'text-white bg-indigo-500 dark:bg-indigo-700 dark:text-indigo-300',
        },
        mostPopular: true,
        button: [
            {
                border: true,
                text: 'Teklif Al',
                href: 'standart',
                colorVariant: 'indigo',
            },
        ],
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Gelişmiş',
        type: 'advanced',
        description:
            'Next.js ile en gelişmiş web sitelerini oluşturun. TypeScript, testler, oturum yönetimi, ödeme entegrasyonu ve SEO desteği ile güçlendirilmiş.',
        price: 15000, // 'Custom',
        pageNumber: 10,
        revision: 5,
        framework: [
            {
                id: 0,
                index: true,
                name: 'Next.js',
                description: 'En Gelişmiş Web Uygulamaları için',
                cost: 0,
            },
        ],
        typeScript: true,
        testing: true,
        design: true,
        auth: true,
        payment: true,
        seo: true,
        analytics: true,
        hosting: true,
        dns: true,
        //i18n: true,
        color: {
            heading: 'text-red-500 dark:text-red-600',
            backdrop: 'bg-gradient-to-r from-red-900 to-yellow-800',
            border: 'z-30 border-2 border-red-500 dark:border-red-700',
            top: 'border-red-500 text-red-500 dark:border-red-700 dark:bg-zinc-950 dark:text-red-600',
            button: 'indigo',
            addPrice: 'text-white bg-red-500 dark:bg-red-700 dark:text-red-300',
        },
        recommended: true,
        button: [
            {
                border: true,
                text: 'Destek Al',
                href: 'contact',
                supPage: true as boolean,
                colorVariant: 'default',
            },
            {
                border: false,
                text: 'Özel Teklif Al',
                href: 'advanced',
                colorVariant: 'red',
            },
        ],
    },
] as Pricing[]

export type AddPricing = {
    pageNumber: number
    revision: number
    framework: {
        tech: Framework
        cost: number
    }[]
    typeScript: number
    testing: number
    design: number
    auth: number
    payment: number
    seo: number
    analytics: number
    hosting: number
    dns: number
    i18n: number
}
export const addPricing: AddPricing = {
    pageNumber: 500,
    revision: 500,
    framework: [
        {
            tech: 'Vite.js',
            cost: 1000,
        },
        {
            tech: 'Next.js',
            cost: 1000,
        },
    ],
    typeScript: 500,
    testing: 500,
    design: 500,
    auth: 500,
    payment: 500,
    seo: 500,
    analytics: 500,
    hosting: 500,
    dns: 500,
    i18n: 500,
} as AddPricing

export type HasAddPricing = {
    type: Pricing['type']
    add: Array<keyof typeof addPricing>
    priceValue: {
        min: number
        max: number
    }
}
export const hasAddPricing: HasAddPricing[] = [
    {
        type: 'basic',
        add: ['pageNumber', 'revision', 'dns', 'design', 'hosting'],
        priceValue: {
            min: 5000,
            max: 7999,
        },
    },
    {
        type: 'standart',
        add: ['pageNumber', 'design', 'revision', 'typeScript', 'testing', 'analytics', 'dns', 'i18n'],
        priceValue: {
            min: 8000,
            max: 14999,
        },
    },
    {
        type: 'advanced',
        add: [
            'pageNumber',
            'revision',
            'typeScript',
            'testing',
            'design',
            'auth',
            'payment',
            'seo',
            'analytics',
            'hosting',
            'dns',
            'i18n',
        ],
        priceValue: {
            min: 15000,
            max: Infinity,
        },
    },
] as HasAddPricing[]
