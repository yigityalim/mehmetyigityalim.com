'use client'
import React from 'react'
import { VercelProject } from 'lib/types/vercel'
import { SiVercel as Vercel } from 'react-icons/si'
import { ArrowRight } from 'components/Icon'
import { motion, Variants } from 'framer-motion'
import { format } from 'date-fns'
import { Badge } from 'components/ui/badge'

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

export function VercelProject({ projects }: { projects: VercelProject }): React.JSX.Element {
    return (
        <motion.li
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='flex w-full flex-col items-center justify-center gap-y-4'
        >
            {projects.projects.map((project) => (
                <motion.a
                    href={project.latestDeployments[0].url}
                    variants={childrenVariants}
                    key={project.id}
                    className='group relative z-50 flex w-full cursor-pointer items-center justify-between gap-x-2 rounded border border-black px-4 py-2 transition hover:scale-[0.99] active:scale-[0.99] dark:border-zinc-600 dark:hover:border-zinc-600'
                >
                    <Vercel className='absolute -left-2 -top-2' />
                    <h1>{project.name}</h1>
                    <Badge>{format(new Date(project.latestDeployments[0].createdAt), 'dd.MM.yy')}</Badge>
                    <span className='absolute -right-2 -top-2 z-[100] rounded-full border-2 border-white bg-white dark:border-black dark:bg-black'>
                        <ArrowRight className='h-4 w-4 -rotate-45 fill-black dark:fill-white' />
                    </span>
                </motion.a>
            ))}
        </motion.li>
    )
}
