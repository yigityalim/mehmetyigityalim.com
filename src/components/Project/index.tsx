'use client'
import React from 'react'
import { ArrowRight } from 'components/Icon'
import { motion } from 'framer-motion'

export default function Project({
    name,
    html_url,
    index,
}: {
    name: string
    html_url: string
    index: number
}): React.JSX.Element {
    return (
        <motion.li
            initial={{ opacity: 0, y: index * 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='w-full'
            key={index}
        >
            <a
                href={html_url}
                target='_blank'
                rel='noreferrer'
                className='group relative z-50 flex cursor-pointer items-center justify-between gap-x-2 rounded border border-black px-4 py-2 transition hover:scale-[0.99] active:scale-[0.99] dark:border-zinc-600 dark:hover:border-zinc-600'
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
                <span className='phone:text-base overflow-hidden text-sm font-bold capitalize italic sm:text-lg'>
                    {name}
                </span>
                <ArrowRight className='h-4 w-4 -rotate-45 fill-black dark:fill-white' />
            </a>
        </motion.li>
    )
}
