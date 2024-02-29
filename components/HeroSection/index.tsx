import React from 'react'
import Image from 'next/image'
import { Spinner } from 'components/Spinner'

export default function HeroSection() {
    return (
        <>
            <div className='relative w-full md:px-10'>
                <React.Suspense fallback={<Spinner />}>
                    <Image
                        src='/images/hero.png'
                        alt='Picture of the author'
                        quality={100}
                        priority
                        className='h-full w-full object-cover md:rounded md:pt-[100px]'
                        width={1920}
                        height={1080}
                    />
                </React.Suspense>
                <div className='absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-white via-transparent to-transparent dark:from-background md:hidden' />
                <h1 className='absolute bottom-4 left-0 right-0 scroll-m-20 pl-4 text-start text-5xl font-extrabold tracking-tight text-black dark:text-white md:static md:mt-6 md:w-full md:pl-0 md:pr-8 md:text-start md:text-6xl'>
                    Mehmet Yiğit
                </h1>
            </div>
        </>
    )
}
