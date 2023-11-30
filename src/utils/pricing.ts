export type Pricing = {
    id: number
    name: string
    description?: string
    price: number | 'Custom'
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
    button: Array<{
        border: boolean
        text: string
        href: string
        [key: string]: any
    }>
}

export default [
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
                text: 'Hemen Başla',
                href: 'baslangic',
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
        mostPopular: true,
        button: [
            {
                border: true,
                text: 'Yükselt',
                href: 'orta',
            },
        ],
    },
    {
        id: 3,
        name: 'Gelişmiş',
        description:
            'Next.js ile en gelişmiş web sitelerini oluşturun. TypeScript, testler, oturum yönetimi, ödeme entegrasyonu ve SEO desteği ile güçlendirilmiş.',
        price: 'Custom',
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
        i18n: true,
        recommended: true,
        button: [
            {
                border: true,
                text: 'Yükselt',
                href: 'gelistirilmis',
            },
            {
                border: false,
                text: 'Özel Teklif Al',
                href: 'teklif',
            },
        ],
    },
] as Pricing[]
