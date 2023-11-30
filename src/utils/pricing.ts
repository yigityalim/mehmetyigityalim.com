import { ButtonProps } from 'components/ui/button'

export type Pricing = {
    id: number
    name: string
    description?: string
    price: number
    pageNumber: number
    revision: number
    framework: string | null
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
    }

    button: Array<{
        border: boolean
        text: string
        href: string
        colorVariant?: ButtonProps['variant']
        [key: string]: any
    }>
}

const prices = [
    {
        id: 1,
        name: 'Başlangıç',
        description:
            'Temel web siteleri için ideal bir başlangıç. HTML, CSS ve JS ile oluşturulmuş, kullanımı kolay ve hızlı.',
        price: 5000,
        pageNumber: 3,
        revision: 2,
        framework: 'HTML, CSS, JS',
        typeScript: false,
        testing: false,
        design: true,
        auth: false,
        payment: false,
        seo: false,
        analytics: true,
        hosting: false,
        dns: true,
        i18n: false,
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
        id: 2,
        name: 'Orta',
        description:
            'Vite.js ile güçlendirilmiş, hızlı ve modern web siteleri için ideal. TypeScript desteğiyle performansı artırın.',
        price: 10000,
        pageNumber: 5,
        revision: 3,
        framework: 'Vite.js',
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
            border: 'z-50 animate-tilt border-2 border-indigo-500 dark:border-indigo-700',
            top: 'border-indigo-400 text-indigo-400 dark:border-indigo-700 dark:bg-zinc-950 dark:text-indigo-600',
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
        id: 3,
        name: 'Gelişmiş',
        description:
            'Next.js ile en gelişmiş web sitelerini oluşturun. TypeScript, testler, oturum yönetimi, ödeme entegrasyonu ve SEO desteği ile güçlendirilmiş.',
        price: 15000, // 'Custom',
        pageNumber: 10,
        revision: 5,
        framework: 'Next.js',
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
            backdrop: 'bg-gradient-to-r from-red-900 to-yellow-600',
            border: 'z-50 animate-tilt border-2 border-red-500 dark:border-red-700',
            top: 'border-red-500 text-red-500 dark:border-red-700 dark:bg-zinc-950 dark:text-red-600',
            button: 'indigo',
        },
        recommended: true,
        button: [
            {
                border: true,
                text: 'Destek Al',
                href: 'contact',
                supPage: true,
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

export default prices

export const PlanPrice: Array<Record<string, number>> = [
    {
        typeScript: 3000,
        testing: 3000,
        design: 3000,
        auth: 3000,
        payment: 3000,
        seo: 3000,
        analytics: 3000,
        hosting: 2000,
        dns: 300,
        i18n: 3000,
    },
]

export function calculatePrice(planName: Pricing['name']): number {
    const selectedPlan: Pricing | undefined = prices.find((plan) => plan.name === planName)

    if (selectedPlan) {
        const basePrice: number = selectedPlan.price
        const planFeaturePrices: Record<string, number> = PlanPrice[selectedPlan.id - 1]
        let total: number = basePrice

        for (const feature in planFeaturePrices) {
            if (selectedPlan[feature]) {
                total += planFeaturePrices[feature]
            }
        }

        return total
    }
    return prices[0].price
}
