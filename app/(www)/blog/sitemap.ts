import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return allPosts.map((post) => ({
        url: `www.mehmetyigityalim.com/blog${post.slug}`,
        lastModified: post.date,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))
}
