'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Blog } from 'lib/types/blog'
import { cn, formatDateTime } from '@/utils'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'components/Icon'

type BlogContainerProps = Readonly<{
    blog: Blog
}>

export default function BlogContiner({
    blog: {
        author: { picture, name },
        coverPhoto: { url, height, width },
        datePublished,
        slug,
        title,
        id,
    },
}: BlogContainerProps): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <AnimatePresence>
            <motion.div
                key={id}
                initial={{ height: 100 }}
                animate={{ height: open ? 'auto' : 100 }}
                exit={{ height: 100 }}
                className='relative flex w-full flex-col gap-y-2 overflow-hidden md:w-[30rem]'
            >
                <span className='absolute bottom-0 left-0 top-0 z-10 h-full w-0.5 rounded-full bg-black dark:bg-white' />
                <div className='flex w-full flex-col gap-y-2 pl-4'>
                    <div className='flex w-full flex-col gap-y-2'>
                        <div className='flex w-full flex-row items-center justify-between'>
                            <span className='text-md overflow-hidden text-ellipsis whitespace-nowrap font-bold capitalize italic md:text-lg lg:text-xl xl:text-2xl'>
                                {title}
                            </span>
                            <Image
                                loading='lazy'
                                className='ml-2 aspect-square h-8 w-8 rounded-full object-cover'
                                alt='user'
                                src={picture.url}
                                width={picture.width}
                                height={picture.height}
                            />
                        </div>
                        <div className='flex flex-row items-center justify-between gap-y-2'>
                            <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                                {formatDateTime(datePublished)}
                            </span>
                            <span className='text-md text-black/50 dark:text-white/60'>{name}</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between gap-y-2'>
                        <button
                            className='flex w-full flex-row gap-x-2'
                            onClick={async (event) => {
                                event.stopPropagation()
                                setOpen((open) => !open)
                            }}
                        >
                            <ChevronDown
                                className={cn(
                                    'h-6 w-6 text-black/50 transition-all duration-200 dark:text-white/40',
                                    open && 'rotate-180 transform'
                                )}
                            />
                            <span className='text-sm text-black/50 dark:text-white/40'>Daha fazla</span>
                        </button>
                        <Link
                            href={`/blog/${slug}`}
                            className='flex h-full w-full flex-row items-center justify-between gap-x-2 rounded bg-black px-4 py-0.5 text-end text-white dark:bg-white dark:text-black'
                        >
                            Blog&apos;a git
                            <ArrowRight className='h-4 w-4 fill-white dark:fill-black' />
                        </Link>
                    </div>
                    <div className='flex flex-col items-start justify-center gap-y-4 md:justify-between md:gap-x-12'>
                        <Image
                            loading='lazy'
                            className='w-full object-contain lg:w-[28rem] xl:w-[30rem]'
                            alt='blog'
                            src={url}
                            width={width}
                            height={open ? height : 0}
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
