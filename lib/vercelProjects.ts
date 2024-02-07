import bcrypt from 'bcrypt'

interface VercelProject {
    id: string;
    name: string;
    url: string;
    description: string;
    coverImage: string;
    tags: string[];
    published: boolean;
    publishedAt: Date;
    createdAt: Date;
    framework:
        | 'nextjs'
        | 'gatsby'
        | 'remix'
        | 'astro'
        | 'preact'
        | 'solidstart'
        | 'vue'
        | 'angular'
        | 'svelte'
        | 'sveltekit'
        | 'sveltekit-1'
        | 'create-react-app'
        | 'nuxtjs'
        | 'vite'
        | 'vitepress'
        | 'vuepress'
        | 'sanity'
        | 'storybook';
    github: string;
}

const vercelProjects: VercelProject[] = [
    {
        id: bcrypt.hashSync('1', 10),
        name: 'mehmetyigityalim.com',
        url: 'https://mehmetyigityalim.com',
        description: 'kendi portfolyo sitem. Nextjs 14, tailwindcss, framer motion ve zustand kullanılarak geliştirildi.',
        coverImage: '/images/vercelProjects/mehmetyigityalim.png',
        tags: ['nextjs', 'tailwindcss', 'framer motion', 'zustand', 'typescript', 'vercel', 'react'],
        published: true,
        publishedAt: new Date('2024-01-31'),
        createdAt: new Date('2021-01-31'),
        framework: 'nextjs',
        github: 'https://github.com/yigityalim/mehmetyigityalim.com.git',
    },
] as VercelProject[]

export default vercelProjects
export type { VercelProject }