import { Plan, Features } from 'lib/types/plan'

export const features = {
    typescript: {
        id: 'typescript',
        name: 'Typescript',
        description: 'TypeScript ile güçlü ve güvenli kodlama.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
    },
    vitejs: {
        id: 'vitejs',
        name: 'Vitejs',
        description: 'Vite.js ile hızlı ve modern geliştirme.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
    },
    nextjs: {
        id: 'nextjs',
        name: 'Nextjs',
        description: 'Next.js ile SEO uyumlu ve performanslı uygulamalar.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
    },
    hosting: {
        id: 'hosting',
        name: 'Hosting',
        description: 'Hosting ile hızlı ve güvenli yayınlama.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
    },
    analytics: {
        id: 'analytics',
        name: 'Analytics',
        description: 'Vercel Analytics ile veri analizi ve raporlama.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
    },
    seo: {
        id: 'seo',
        name: 'SEO',
        description: 'SEO ile arama motoru optimizasyonu.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
    },
} as Features

export const plans = [
    {
        id: 'basic',
        type: 'basic',
        name: 'Başlangıç',
        description: 'Başlangıç seviyesi plan. Herkes için uygun. Vite.js ile pratik çözüm.',
        price: {
            monthly: 1000,
            yearly: 11000,
        },
        features: [features.hosting],
        details: ['Typescript', 'Vitejs', 'Hosting', 'Domain', 'SSL'],
        pageCount: {
            default: 1,
            min: 1,
            max: 3,
            price: 1000,
        },
        revisionCount: {
            default: 1,
            min: 1,
            max: 3,
            price: 500,
        },
        href: '/plans/basic',
        buttonText: 'Hemen Başla',
        buttonVariant: 'default',
    },
    {
        id: 'standart',
        type: 'standart',
        name: 'Standart',
        top: 'En Popüler',
        description:
            'Standart seviyesi plan. İşletmeniz için ideal. Typescript ve Vite.js ile performans arttırın. Hosting ve Domain ile yayınlayın. Vercel Analytics ile veri analizi yapın.',
        price: {
            monthly: 2000,
            yearly: 22000,
        },
        features: [features.typescript, features.vitejs, features.analytics],
        details: ['Typescript', 'Vitejs', 'Hosting', 'Domain', 'SSL', 'SEO'],
        pageCount: {
            default: 3,
            min: 3,
            max: 5,
            price: 2000,
        },
        revisionCount: {
            default: 3,
            min: 3,
            max: 5,
            price: 1500,
        },
        href: '/plans/standart',
        buttonText: 'Planı Seç',
        buttonVariant: 'indigo',
    },
    {
        id: 'advanced',
        type: 'advanced',
        name: 'Gelişmiş',
        top: 'Önerilen',
        description:
            'Gelişmiş seviyesi plan. İşletmeniz için en iyisi. Next.js ile profesyonel sonuçlar alın. SEO optimizasyonu ile rakiplerinizin önüne geçin. Hosting ve Vercel Analytics ile güçlü bir altyapı oluşturun.',
        price: {
            monthly: 3000,
            yearly: 33000,
        },
        features: [features.typescript, features.nextjs, features.hosting, features.analytics, features.seo],
        details: ['Typescript', 'Nextjs', 'Hosting', 'Domain', 'SSL', 'SEO', 'Analytics'],
        pageCount: {
            default: 5,
            min: 5,
            max: 10,
            price: 3000,
        },
        revisionCount: {
            default: 5,
            min: 5,
            max: 10,
            price: 2200,
        },
        href: '/plans/advanced',
        buttonText: 'Geçiş Yap',
        buttonVariant: 'destructive',
    },
] as Plan[]
