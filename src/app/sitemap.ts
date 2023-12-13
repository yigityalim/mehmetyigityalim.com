import type { MetadataRoute } from 'next'
import menu from 'utils/menu'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return menu.map(({ name, changefreq, priority }) => ({
        url: `https://www.mehmetyigityalim.com/${name}`,
        lastmod: new Date(),
        changefreq,
        priority,
    }))
}
