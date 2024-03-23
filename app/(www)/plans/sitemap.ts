import { MetadataRoute } from 'next'
import { plans } from '@/lib/plans'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return plans.map((plan) => ({
        url: `${siteConfig.url}/plans/${plan.type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }))
}
