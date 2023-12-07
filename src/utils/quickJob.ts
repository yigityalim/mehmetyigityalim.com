import crypto from 'crypto'

export type QuickJobs = {
    id: string
    name: string
    type: 'quickjob' | string
    description?: string
    price: {
        value: number
        type: 'fixed' | 'hourly' | 'monthly' | 'yearly'
    }
    color: {
        heading?: string
        border?: string
    }
}

export const quickJobs = [
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'TailwindCSS',
        type: 'quickjob',
        description: "TailwindCSS ile tasarımınızın HTML ve CSS'ini çıkartalım.",
        price: {
            value: 500,
            type: 'fixed',
        },
        color: {
            heading: 'text-indigo-500 dark:text-indigo-600',
            border: 'z-30 border-2 border-indigo-500 dark:border-indigo-700',
            button: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'TypeScript',
        type: 'quickjob',
        description: 'TypeScript desteği ekleyelim.',
        price: {
            value: 500,
            type: 'fixed',
        },
        color: {
            heading: 'text-[#3178c6] dark:text-[#3178c6]',
            border: 'z-30 border-2 border-[#3178c6] dark:border-[#3178c6]',
            button: 'bg-[#3178c6] hover:bg-[#2a6da5] dark:bg-[#3178c6] dark:hover:bg-[#2a6da5]',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Destek | Ders',
        type: 'quickjob',
        description: 'Web Teknolojileri için yardımcı olalım.',
        price: {
            value: 300,
            type: 'hourly',
        },
        color: {
            heading: 'text-[#fbbf24] dark:text-[#fbbf24]',
            border: 'z-30 border-2 border-[#fbbf24] dark:border-[#fbbf24]',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Oturum Yönetimi',
        type: 'quickjob',
        description: 'Oturum yönetimi ekleyelim.',
        price: {
            value: 1000,
            type: 'yearly',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Ödeme Entegrasyonu',
        type: 'quickjob',
        description: 'Ödeme entegrasyonu ekleyelim.',
        price: {
            value: 1500,
            type: 'yearly',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'SEO',
        type: 'quickjob',
        description: 'SEO Optimizasyonu ekleyelim.',
        price: {
            value: 1000,
            type: 'fixed',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Analitik',
        type: 'quickjob',
        description: 'Analitik ekleyelim.',
        price: {
            value: 1000,
            type: 'yearly',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Hosting',
        type: 'quickjob',
        description: 'Hosting ekleyelim.',
        price: {
            value: 500,
            type: 'monthly',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'DNS',
        type: 'quickjob',
        description: 'DNS ekleyelim.',
        price: {
            value: 300,
            type: 'yearly',
        },
    },
    {
        id: crypto.randomBytes(4).toString('hex'),
        name: 'Çoklu Dil',
        type: 'quickjob',
        description: 'Çoklu dil desteği ekleyelim.',
        price: {
            value: 1000,
            type: 'fixed',
        },
    },
] as QuickJobs[]