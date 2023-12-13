import type { MetadataRoute } from 'next'

export type Menu = {
    title: string
    name: string
    path: string
    icon?: string

    changefreq?: MetadataRoute.Sitemap[number]['changeFrequency']
    priority?: MetadataRoute.Sitemap[number]['priority']
}

export default [
    {
        title: 'Ana Sayfa', // TODO: t('Ana Sayfa', 'Home')
        name: 'home',
        path: '/',
        changefreq: 'always',
        priority: 1,
    },
    {
        title: 'Paketler', // TODO: t('Paketler', 'Packages')
        name: 'pricing',
        path: '/packages',
        changefreq: 'daily',
        priority: 0.9,
    },
    {
        title: 'İletişim', // TODO: t('İletişim', 'Contact')
        name: 'contact',
        path: '/contact',
        changefreq: 'monthly',
        priority: 0.8,
    },
    {
        title: 'Referanslar', // TODO: t('Referanslar', 'References')
        name: 'references',
        path: '/references',
        changefreq: 'weekly',
        priority: 0.8,
    },
    {
        title: 'Projeler', // TODO: t('Projeler', 'Projects')
        name: 'projects',
        path: '/projects',
        changefreq: 'weekly',
        priority: 0.8,
    },
    {
        title: 'Blog',
        name: 'blog',
        path: '/blog',
        changefreq: 'weekly',
        priority: 0.8,
    },
    {
        title: 'Kullanıcılar',
        name: 'user',
        path: '/user',
        changefreq: 'weekly',
        priority: 0.8,
    },
    {
        title: 'Hakkımda', // TODO: t('Hakkımda', 'About')
        name: 'about',
        path: '/about',
        changefreq: 'monthly',
        priority: 0.7,
    },
] as Menu[]
