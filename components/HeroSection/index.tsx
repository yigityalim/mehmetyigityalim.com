import React from 'react'
import { Photo } from 'lib/types/Author'
import Image from 'next/image'
import { Spinner } from 'components/Spinner'

interface HeroSectionProps {
    picture: Photo
    title: string
}

export default function HeroSection({ picture, title }: HeroSectionProps) {
    return (
        <>
            <div className='relative w-full'>
                <React.Suspense fallback={<Spinner />}>
                    <Image
                        src={picture.url}
                        alt='Picture of the author'
                        quality={100}
                        priority
                        className='h-full w-full object-cover'
                        width={picture.width}
                        height={picture.height}
                    />
                </React.Suspense>
                <div className='absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black' />
                <h1 className="absolute bottom-4 left-0 right-0 scroll-m-20 text-start pl-4 text-5xl font-extrabold tracking-tight text-black dark:text-white">
                    {title}
                </h1>
            </div>
        </>
    )
}
