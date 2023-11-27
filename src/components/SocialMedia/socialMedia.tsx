'use client'

import { JSX, useState } from 'react'
import { cn } from '@/utils'
import type { Social } from 'lib/types/home'
import { BsInstagram, BsLinkedin, BsSnapchat, BsDiscord, BsSpotify, BsGithub, BsTwitterX } from 'react-icons/bs'
import { motion, Variants } from 'framer-motion'

type SoicalMediaContainerProps = Readonly<{ social: Social[]; type: 'grid' | 'list' }>

const Icons = [
    {
        icon: <BsInstagram size={36} />,
        title: 'Instagram',
    },
    {
        icon: <BsLinkedin size={36} />,
        title: 'Linkedin',
    },
    {
        icon: <BsSnapchat size={36} />,
        title: 'Snapchat',
    },
    {
        icon: <BsDiscord size={36} />,
        title: 'Discord',
    },
    {
        icon: <BsSpotify size={36} />,
        title: 'Spotify',
    },
    {
        icon: <BsGithub size={36} />,
        title: 'Github',
    },
    {
        icon: <BsTwitterX size={36} />,
        title: 'twitter',
    },
]

const iconsWithColors: { [key: string]: string[] } = {
    instagram: ['#405de6', '#5851db', '#833ab4', '#c13584', '#e1306c', '#fd1d1d'],
    linkedin: ['#0077B5', '#0077B5'],
    snapchat: ['#FFFC00', '#FFFC00'],
    discord: ['#7289DA', '#7289DA'],
    spotify: ['#1DB954', '#191414'],
    github: ['#181717', '#181717'],
    twitter: ['#1E9BF0', '#1DA1F2'],
}

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

export function SocialMedia({ social, type }: SoicalMediaContainerProps): JSX.Element {
    return type === 'grid' ? (
        <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='grid w-full grid-cols-2 gap-4'
        >
            {social.map(({ id, social, url }, idx) => {
                const icon: JSX.Element | undefined = Icons.find(({ title }) => title.toLowerCase() === social)?.icon
                return (
                    <motion.div
                        variants={childrenVariants}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        key={id}
                        className={cn(
                            'flex aspect-square w-full flex-col items-center justify-between gap-y-2 overflow-hidden rounded-lg bg-wash p-8 shadow-md dark:bg-wash-dark'
                            // idx === 0 ? 'col-span-2 max-h-[175px] overflow-hidden' : 'col-span-1'
                        )}
                    >
                        <div className={cn('flex flex-col items-center gap-y-2')}>
                            {icon && <>{icon}</>}
                            <span className='text-xs font-semibold tracking-wide'>{social.toUpperCase()}</span>
                            <a
                                href={url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={cn(
                                    'rounded-lg bg-syntax px-4 py-2 text-xs font-semibold tracking-wide dark:bg-wash-dark-2'
                                )}
                            >
                                Takip Et
                            </a>
                        </div>
                    </motion.div>
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
            {social.map(({ id, social, url }, idx) => {
                const icon: JSX.Element | undefined = Icons.find(({ title }) => title.toLowerCase() === social)?.icon
                return (
                    <motion.div
                        variants={childrenVariants}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        key={id}
                        className={cn(
                            'flex w-full flex-row items-center justify-between gap-x-4 overflow-hidden rounded-lg bg-wash p-8 shadow-md dark:bg-wash-dark'
                        )}
                    >
                        <div className={cn('flex flex-row items-center gap-x-4')}>
                            {icon && <>{icon}</>}
                            <span className='text-xs font-semibold tracking-wide'>{social.toUpperCase()}</span>
                        </div>
                        <a
                            href={url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={cn(
                                'rounded-lg bg-syntax px-4 py-2 text-xs font-semibold tracking-wide dark:bg-wash-dark-2'
                            )}
                        >
                            Takip Et
                        </a>
                    </motion.div>
                )
            })}
        </motion.div>
    )
}
