import { MetadataRoute } from 'next'
import { plans } from 'lib/plans'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return plans.map((plan) => ({
        url: `www.mehmetyigityalim.com/plans/${plan.type}`,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))
}
