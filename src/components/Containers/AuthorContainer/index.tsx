import React from 'react'
import Image from 'next/image'
import { formatDateTime } from 'lib/utils'
import Link from 'next/link'
import { Blog } from 'lib/types'

type Props = {
    blogs: Blog
}

export default function AuthorContainer({ blogs }: Props): React.JSX.Element {
    return (
        <Link href={`/blog/${blogs.slug}`} className='relative flex h-full w-full flex-col gap-y-2 p-2 pl-0 transition'>
            <span className='absolute bottom-0 left-0 top-0 z-10 h-full w-0.5 rounded-full bg-black dark:bg-white' />
            <div className='flex h-full w-full flex-col gap-y-2 pl-4'>
                <div className='flex h-full w-full flex-col gap-y-2'>
                    <div className='flex flex-row items-center justify-between'>
                        <span className='text-md font-bold italic md:text-lg lg:text-xl xl:text-2xl'>
                            {blogs.title}
                        </span>
                    </div>
                    <div className='flex flex-row items-center justify-between gap-y-2'>
                        <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                            {formatDateTime(new Date(blogs.datePublished), 'tr-TR')}
                        </span>
                        <span className='text-md text-black/50 dark:text-white/60'>{blogs.datePublished}</span>
                    </div>
                </div>
                <div className='flex h-full w-full flex-col items-start justify-center gap-y-4 md:items-start md:justify-start md:gap-x-12'>
                    <Image
                        className='w-full object-contain'
                        alt='blog'
                        src={blogs.coverPhoto.url}
                        width={blogs.coverPhoto.width}
                        height={blogs.coverPhoto.height}
                    />
                </div>
            </div>
        </Link>
    )
}
