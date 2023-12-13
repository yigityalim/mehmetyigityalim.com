import type { MetadataRoute } from 'next'
import useMenu from 'utils/menu'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return useMenu().map(({ name, changefreq, priority }) => ({
        url: `https://www.mehmetyigityalim.com/${name}`,
        lastmod: new Date(),
        changefreq,
        priority,
    }))
}
