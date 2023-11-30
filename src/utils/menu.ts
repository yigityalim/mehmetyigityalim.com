import { useLanguage } from 'store/language'

export type Menu = {
    title: string
    name: string
    path: string
    icon?: string
}

export default function useMenu(): Menu[] {
    const { t } = useLanguage()
    return [
        {
            title: t('Anasayfa', 'Home'),
            name: 'home',
            path: '/',
        },
        {
            title: t('Fiyatlar', 'Pricing'),
            name: 'pricing',
            path: '/pricing',
        },
        {
            title: t('İletişim', 'Contact'),
            name: 'contact',
            path: '/contact',
        },
        {
            title: t('Projeler', 'Projects'),
            name: 'projects',
            path: '/projects',
        },
        {
            title: 'Blog',
            name: 'blog',
            path: '/blog',
        },
        {
            title: t('Kullanıcılar', 'Users'),
            name: 'user',
            path: '/user',
        },
        {
            title: t('Hakkımda', 'About'),
            name: 'about',
            path: '/about',
        },
    ] as Menu[]
}
