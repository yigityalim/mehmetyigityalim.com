import crypto from 'crypto'
import type { Plan, OptionPrices, HasAddPlan } from 'lib/types/plan'

export const plans: Plan[] = [
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Başlangıç',
        type: 'basic',
        description:
            'Temel web siteleri için ideal bir başlangıç. HTML, CSS ve JS ile oluşturulmuş, kullanımı kolay ve hızlı.',
        price: 10000,
        pageNumbers: {
            page: 2,
            min: 1,
            max: 3,
            cost: 1000,
        },
        revisions: {
            revision: 2,
            min: 0,
            max: 5,
            cost: 1000,
        },
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
        optionals: {
            typeScript: { cost: 0, has: false },
            testing: { cost: 0, has: false },
            design: { cost: 0, has: false },
            auth: { cost: 0, has: false },
            payment: { cost: 0, has: false },
            seo: { cost: 0, has: false },
            analytics: { cost: 0, has: false },
            hosting: { cost: 0, has: false },
            dns: { cost: 0, has: false },
            i18n: { cost: 0, has: false },
        },
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
        price: 15000,
        pageNumbers: {
            page: 3,
            min: 1,
            max: 5,
            cost: 1000,
        },
        revisions: {
            revision: 4,
            min: 0,
            max: 7,
            cost: 1000,
        },
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
        optionals: {
            typeScript: { cost: 0, has: true },
            testing: { cost: 0, has: false },
            design: { cost: 0, has: true },
            auth: { cost: 0, has: false },
            payment: { cost: 0, has: false },
            seo: { cost: 0, has: false },
            analytics: { cost: 0, has: true },
            hosting: { cost: 0, has: false },
            dns: { cost: 0, has: true },
            i18n: { cost: 0, has: true },
        },
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
        price: 20000,
        pageNumbers: {
            page: 4,
            min: 1,
            max: 7,
            cost: 1000,
        },
        revisions: {
            revision: 6,
            min: 0,
            max: 10,
            cost: 1000,
        },
        framework: [
            {
                id: 0,
                index: true,
                name: 'Next.js',
                description: 'En Gelişmiş Web Uygulamaları için',
                cost: 0,
            },
        ],
        optionals: {
            typeScript: { cost: 2000, has: true },
            testing: { cost: 4000, has: true },
            design: { cost: 3000, has: true },
            auth: { cost: 5000, has: true },
            payment: { cost: 5000, has: true },
            seo: { cost: 5000, has: true },
            analytics: { cost: 2000, has: true },
            hosting: { cost: 1500, has: true },
            dns: { cost: 1000, has: true },
            i18n: { cost: 2000, has: true },
        },
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
] as Plan[]

export const optionPrices: OptionPrices = {
    pageNumber: 1000,
    revision: 800,
    framework: [
        {
            tech: 'Vite.js',
            cost: 2000,
        },
        {
            tech: 'Next.js',
            cost: 4000,
        },
    ],
    typeScript: 1000,
    testing: 2000,
    design: 500,
    auth: 5000,
    payment: 5000,
    seo: 3000,
    analytics: 1000,
    hosting: 1000,
    dns: 500,
    i18n: 2000,
} as OptionPrices

export const hasAddPlan = [
    {
        type: 'basic',
        add: ['pageNumber', 'revision', 'dns', 'design', 'hosting'],
        priceValue: {
            min: 8000,
            max: 14999,
        },
    },
    {
        type: 'standart',
        add: ['pageNumber', 'design', 'revision', 'typeScript', 'testing', 'analytics', 'dns', 'i18n'],
        priceValue: {
            min: 15000,
            max: 19999,
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
            min: 20000,
            max: Infinity,
        },
    },
] as HasAddPlan[]
