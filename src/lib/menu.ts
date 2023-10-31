export type Menu = {
    title: string
    name: string
    path: string
    icon?: string
}

export default [
    {
        title: 'Anasayfa',
        name: 'home',
        path: '/',
    },
    {
        title: 'İletişim',
        name: 'contact',
        path: '/contact',
    },
    {
        title: 'Projelerim',
        name: 'projects',
        path: '/projects',
    },
    {
        title: 'Blog',
        name: 'blog',
        path: '/blog',
    },
    {
        title: 'Kullanıcılar',
        name: 'user',
        path: '/user',
    },
    {
        title: 'Hakkımda',
        name: 'about',
        path: '/about',
    },
] as Menu[]
