import { MetadataRoute } from 'next'
import useMenu from 'utils/menu'
export default function sitemap(): MetadataRoute.Sitemap {
    return useMenu().map(({ name }) => ({
        url: `https://www.mehmetyigityalim.com/${name}`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
    }))
}
