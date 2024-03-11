import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return allPosts.map((post) => ({
        url: `${siteConfig.url}/blog${post.slug}`,
        lastModified: post.date,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))
}
