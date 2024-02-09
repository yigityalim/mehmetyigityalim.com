'use client'
import React from 'react'
import type { VercelProject } from '@/lib/types/vercel'
import { SiVercel as Vercel } from 'react-icons/si'
import { motion, Variants } from 'framer-motion'
import frameworks from 'lib/frameworks'
import { cn } from 'lib/utils'

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

type VercelProjectProps = {
    projects: VercelProject
    //domains: VercelDomain
}

export function VercelProject({ projects }: Readonly<VercelProjectProps>): React.JSX.Element {
    return (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='flex w-full flex-col items-center justify-center gap-y-4'
        >
            {projects.projects.map((project) => {
                const frameworkInfo = frameworks.find((fw) => fw.framework === project.framework)
                const frameworkIcon: React.ReactNode = frameworkInfo ? frameworkInfo.icon : null

                return (
                    <motion.a
                        href={`https://${project.latestDeployments[0].url}`}
                        variants={childrenVariants}
                        key={project.id}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group relative z-50 flex w-full cursor-pointer items-center justify-between gap-x-2 rounded border border-black px-4 py-2 transition hover:scale-[0.99] active:scale-[0.99] dark:border-zinc-600 dark:hover:border-zinc-600'
                    >
                        <Vercel className='absolute -left-2 -top-2' />
                        <h1>{project.name}</h1>
                        <div className='flex flex-row items-center justify-center gap-x-2'>
                            <span
                                className={cn(
                                    'inline-block size-2.5 rounded-full',
                                    project.latestDeployments[0].readyState === 'READY' && 'bg-[#50e3c2]',
                                    project.latestDeployments[0].readyState === 'ERROR' && 'bg-red-300',
                                    project.latestDeployments[0].readyState === 'BUILDING' && 'bg-[#f5a623]'
                                )}
                            />
                            {frameworkIcon && <div className='size-6'>{frameworkIcon}</div>}
                        </div>
                    </motion.a>
                )
            })}
        </motion.div>
    )
}
