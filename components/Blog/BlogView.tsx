'use client'
import React from 'react'
import { Separator } from 'components/ui/separator'
import { motion } from 'framer-motion'
import * as fns from 'date-fns'
import * as locale from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from 'components/Icon'
import { allPosts } from 'contentlayer/generated'

export default function BlogView(): React.JSX.Element {
    return (
        <motion.div
            layout
            id='blog-container'
            className='flex w-full flex-col flex-wrap items-center justify-between gap-4 md:flex-row'
        >
            <h1 className='w-full text-start text-xl font-semibold'>Tüm Bloglar</h1>
            {allPosts.map(
                ({ _id, title, description, published, readMinutes, date, coverImage, body, author, slug }, index) => (
                    <React.Fragment key={_id}>
                        <div className='relative flex w-full flex-col gap-y-2 overflow-hidden'>
                            <span className='absolute bottom-0 left-0 top-0 z-10 h-full w-0.5 rounded-full bg-black dark:bg-white' />
                            <div className='flex w-full flex-col justify-between gap-y-8 pl-4'>
                                <div className='flex w-full flex-row items-center justify-between gap-x-2'>
                                    <div className='flex flex-col items-start justify-between gap-y-2'>
                                        <span className='text-lg font-bold capitalize italic lg:text-xl xl:text-2xl'>
                                            {title}
                                        </span>
                                        <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                                            {fns.formatDistance(new Date(date), new Date(), {
                                                addSuffix: true,
                                                locale: locale.tr,
                                            })}
                                        </span>
                                        <span className='text-sm text-black/30 dark:text-white/40 md:text-base'>
                                            {readMinutes > 60
                                                ? `${Math.floor(readMinutes / 60)} saat ${readMinutes % 60} dakika`
                                                : `${readMinutes} dakika` + ' okuma süresi'}
                                        </span>
                                    </div>
                                    <div className='flex h-full flex-col items-end justify-between gap-y-2'>
                                        <Image
                                            loading='lazy'
                                            className='ml-2 aspect-square h-8 w-8 rounded-full object-cover'
                                            alt='user'
                                            src={author.avatar}
                                            width={500}
                                            height={500}
                                        />
                                        <span className='text-md overflow-hidden text-ellipsis whitespace-nowrap text-black/50 dark:text-white/60'>
                                            {author.name}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center justify-between gap-y-2'>
                                    <Link
                                        href={`/blog/${slug}`}
                                        className='flex h-full w-full flex-row items-center justify-between gap-x-2 rounded bg-black px-4 py-0.5 text-end text-white dark:bg-white dark:text-black'
                                    >
                                        Blog&apos;a git
                                        <Icon name='arrow-right' className='h-4 w-4 fill-white dark:fill-black' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {index !== allPosts.length - 1 && <Separator className='md:hidden' />}
                    </React.Fragment>
                )
            )}
        </motion.div>
    )
}
