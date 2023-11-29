'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { GithubRepositoryType } from '@/lib/types/github'
import { Badge } from 'components/ui/badge'
import { format } from 'date-fns'
import { textColorForBackground } from '@/utils'

const containerVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const childrenVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

export let languagesColors = {
    PHP: '#4F5D95',
    JavaScript: '#F7DF1E',
    TypeScript: '#2F74C0',
    HTML: '#E34F26',
    CSS: '#1572B6',
    SCSS: '#CC6699',
    'C#': '#178600',
    'C++': '#00599C',
    C: '#A8B9CC',
    Java: '#B07219',
    Python: '#3572A5',
} as const

type GithubProjectProps = Readonly<{
    repo: GithubRepositoryType[]
}>

export function GithubProject({ repo }: GithubProjectProps): React.JSX.Element {
    return (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='flex w-full flex-col items-center justify-center gap-y-4'
        >
            {repo.map(({ id, name, html_url, created_at, language }) => (
                <motion.div key={id} className='w-full' variants={childrenVariants}>
                    <a
                        href={html_url}
                        target='_blank'
                        rel='noreferrer'
                        className='group relative z-50 flex w-full cursor-pointer items-center justify-between gap-x-2 rounded border border-black px-4 py-2 transition hover:scale-[0.99] active:scale-[0.99] dark:border-zinc-600 dark:hover:border-zinc-600'
                    >
                        <span className='absolute -left-2 -top-2 z-[100] rounded-full border-2 border-white bg-white dark:border-black dark:bg-black'>
                            <svg
                                height='20'
                                aria-hidden='true'
                                viewBox='0 0 16 16'
                                version='1.1'
                                width='20'
                                data-view-component='true'
                                className='fill-[#171515] text-xl dark:fill-white'
                            >
                                <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z'></path>
                            </svg>
                        </span>
                        <span className='phone:text-base overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold italic sm:text-lg'>
                            {name}
                        </span>
                        <div className='flex flex-row items-center justify-center gap-x-2'>
                            {language && (
                                <Badge
                                    style={{
                                        backgroundColor: languagesColors[language] ?? null,
                                        color: textColorForBackground(languagesColors[language] ?? null),
                                    }}
                                >
                                    {language}
                                </Badge>
                            )}
                            <Badge className='hidden md:flex'>{format(new Date(created_at), 'dd.MM.yy')}</Badge>
                        </div>
                    </a>
                </motion.div>
            ))}
        </motion.div>
    )
}

/*
<span className='absolute -right-2 -top-2 z-[100] rounded-full border-2 border-white bg-white dark:border-black dark:bg-black'>
    <ArrowRight className='h-4 w-4 -rotate-45 fill-black dark:fill-white' />
</span>
 */
