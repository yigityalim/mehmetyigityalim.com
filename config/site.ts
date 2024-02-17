export const siteConfig = {
    name: 'Mehmet Yiğit Yalım',
    url: 'https://mehmetyigityalim.com',
    ogImage: 'https://mehmetyigityalim.com/og-image.png',
    description: 'Mehmet Yiğit Yalım personal website.',
    keywords: ['Mehmet Yiğit Yalım', 'mehmet yalim', 'mehmet', 'yalim', 'yalım', 'yigit', 'yalım'],
    links: {
        github: 'https://github.com/yigityalim',
        linkedin: 'https://www.linkedin.com/in/yigityalim',
        twitter: 'https://twitter.com/yigityalim',
        instagram: 'https://www.instagram.com/mehmet_yigit_yalim',
    },
} as const

export type SiteConfig = typeof siteConfig
