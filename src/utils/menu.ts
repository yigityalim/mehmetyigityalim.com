import { useLanguage } from 'store/language'
import type { MetadataRoute } from 'next'

export type Menu = {
    title: string
    name: string
    path: string
    icon?: string

    changefreq?: MetadataRoute.Sitemap[number]['changeFrequency']
    priority?: MetadataRoute.Sitemap[number]['priority']
}

export default function useMenu(): Menu[] {
    const { t } = useLanguage()
    return [
        {
            title: t('Anasayfa', 'Home'),
            name: 'home',
            path: '/',
            changefreq: 'always',
            priority: 1,
        },
        {
            title: t('Paketler', 'Packages'),
            name: 'pricing',
            path: '/packages',
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            title: t('İletişim', 'Contact'),
            name: 'contact',
            path: '/contact',
            changefreq: 'monthly',
            priority: 0.8,
        },
        {
            title: t('Referanslar', 'References'),
            name: 'references',
            path: '/references',
            changefreq: 'weekly',
            priority: 0.8,
        },
        {
            title: t('Projeler', 'Projects'),
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
            title: t('Kullanıcılar', 'Users'),
            name: 'user',
            path: '/user',
            changefreq: 'weekly',
            priority: 0.8,
        },
        {
            title: t('Hakkımda', 'About'),
            name: 'about',
            path: '/about',
            changefreq: 'monthly',
            priority: 0.7,
        },
    ] as Menu[]
}
