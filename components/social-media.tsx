'use client'

import { JSX } from 'react'
import { BsDiscord, BsGithub, BsInstagram, BsLinkedin, BsSnapchat, BsSpotify, BsTwitterX } from 'react-icons/bs'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { socialMedia } from '@/lib/socialMedia'

type SoicalMediaContainerProps = Readonly<{ type: 'grid' | 'list' }>

const Icons = [
    {
        icon: <BsInstagram size={48} />,
        title: 'Instagram',
    },
    {
        icon: <BsLinkedin size={48} />,
        title: 'Linkedin',
    },
    {
        icon: <BsSnapchat size={48} />,
        title: 'Snapchat',
    },
    {
        icon: <BsDiscord size={48} />,
        title: 'Discord',
    },
    {
        icon: <BsSpotify size={48} />,
        title: 'Spotify',
    },
    {
        icon: <BsGithub size={48} />,
        title: 'Github',
    },
    {
        icon: <BsTwitterX size={48} />,
        title: 'twitter',
    },
]

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

export function SocialMedia({ type }: SoicalMediaContainerProps): JSX.Element {
    return type === 'grid' ? (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='grid w-full grid-cols-2 gap-4 md:grid-cols-3'
        >
            {socialMedia.map(({ id, social, url }, index) => {
                const icon: JSX.Element | undefined = Icons.find(({ title }) => title.toLowerCase() === social)?.icon
                return (
                    <motion.a
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                        variants={childrenVariants}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        key={id}
                        className={cn(
                            'dark:bg-wash-dark flex aspect-square w-full flex-col items-center justify-center gap-y-2 overflow-hidden rounded-lg bg-muted p-8 shadow-md'
                            //index % 2 === 0 && 'col-span-2'
                        )}
                    >
                        <div className={cn('flex flex-col items-center gap-y-2')}>
                            {icon && <span className='text-4xl'>{icon}</span>}
                            <span className='text-base font-semibold tracking-wide'>{social.toUpperCase()}</span>
                        </div>
                    </motion.a>
                )
            })}
        </motion.div>
    ) : (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='flex w-full flex-col items-center justify-start gap-y-4'
        >
            {socialMedia.map(({ id, social, url }) => {
                const icon: JSX.Element | undefined = Icons.find(({ title }) => title.toLowerCase() === social)?.icon
                return (
                    <motion.a
                        href={url}
                        target='_blank'
                        rel='noopener noreferrer'
                        variants={childrenVariants}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        key={id}
                        className={cn(
                            'bg-wash dark:bg-wash-dark flex w-full flex-row items-center justify-between gap-x-4 overflow-hidden rounded-lg p-8 shadow-md'
                        )}
                    >
                        <div className={cn('flex flex-row items-center gap-x-4')}>
                            {icon && <>{icon}</>}
                            <span className='text-xs font-semibold tracking-wide'>{social.toUpperCase()}</span>
                        </div>
                    </motion.a>
                )
            })}
        </motion.div>
    )
}
