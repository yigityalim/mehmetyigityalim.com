import React from 'react'
import Image from 'next/image'
import { formatDateTime } from 'lib/utils'
import Link from 'next/link'
import { Blog } from 'lib/types'

export default function BlogContiner({
    blog: {
        author: { picture },
        coverPhoto: { url, height, width },
        datePublished,
        slug,
        title,
        id,
    },
}: {
    blog: Blog
}): React.JSX.Element {
    return (
        <Link
            href={`/blog/${slug}`}
            key={id}
            className='relative flex w-full flex-col gap-y-2 p-2 pl-0 transition active:scale-90 md:w-[30rem]'
        >
            <span className='absolute bottom-0 left-0 top-0 z-10 h-full w-0.5 rounded-full bg-black dark:bg-white' />
            <div className='flex w-full flex-col gap-y-2 pl-4'>
                <div className='flex w-full flex-col gap-y-2'>
                    <div className='flex w-full flex-row items-center justify-between'>
                        <span className='text-md font-bold italic md:text-lg lg:text-xl xl:text-2xl'>{title}</span>
                        <Image
                            loading='lazy'
                            className='ml-2 h-8 w-8 rounded-full'
                            alt='user'
                            src={picture.url}
                            width={picture.width}
                            height={picture.height}
                        />
                    </div>
                    <div className='flex flex-row items-center justify-between gap-y-2'>
                        <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                            {formatDateTime(new Date(datePublished), 'tr-TR')}
                        </span>
                        <span className='text-md text-black/50 dark:text-white/60'>{datePublished}</span>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-center gap-y-4 md:justify-between md:gap-x-12 '>
                    <Image
                        className='w-full object-contain lg:w-[28rem] xl:w-[30rem]'
                        alt='blog'
                        src={url}
                        width={width}
                        height={height}
                    />
                </div>
            </div>
        </Link>
    )
}
