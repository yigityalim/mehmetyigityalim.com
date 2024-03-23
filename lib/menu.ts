import type { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import { plans } from '@/lib/plans'

export type Menu = {
    title: string
    name: string
    path: `/${string}`
    icon?: string
    changefreq?: MetadataRoute.Sitemap[number]['changeFrequency']
    priority?: MetadataRoute.Sitemap[number]['priority']
    children?: Menu[]
}

export const menu = [
    {
        title: 'Anasayfa',
        name: 'home',
        path: '/',
        changefreq: 'always',
        priority: 1,
    },
    {
        title: 'Paketler',
        name: 'plans',
        path: '/plans',
        changefreq: 'daily',
        priority: 0.9,
        children: plans.map((plan) => ({
            title: plan.name,
            name: plan.href,
            path: plan.href,
            changefreq: 'daily',
            priority: 0.9,
        })),
    },
    {
        title: 'İletişim',
        name: 'contact',
        path: '/contact',
        changefreq: 'monthly',
        priority: 0.8,
    },
    {
        title: 'Referanslar',
        name: 'references',
        path: '/references',
        changefreq: 'weekly',
        priority: 0.8,
    },
    {
        title: 'Projeler',
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
        children: allPosts.map((post) => ({
            title: post.title,
            name: post.slug,
            path: `/blog${post.slug}`,
            changefreq: 'weekly',
            priority: 0.7,
        })),
    },
] satisfies Menu[]
