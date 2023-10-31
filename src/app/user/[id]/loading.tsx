import React from 'react'
import Container from 'components/Containers'

export default function Loading(): React.JSX.Element {
    return (
        <Container className='gap-y-4'>
            <div className='flex w-full items-center justify-between gap-x-2'>
                <div className='h-24 w-24 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700'></div>
                <div className='h-16 w-1/2 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700'></div>
            </div>
            <div className='flex w-full flex-col items-start justify-center gap-4 md:flex-row'>
                <div className='h-6 w-3/4 animate-pulse rounded-full bg-gray-300 text-center text-sm dark:bg-gray-700 md:text-start md:text-base'></div>
                <div className='h-6 w-1/2 animate-pulse rounded-full bg-gray-300 text-center text-sm dark:bg-gray-700 md:text-start md:text-base'></div>
                <div className='h-6 w-3/4 animate-pulse rounded-full bg-gray-300 text-center text-sm dark:bg-gray-700 md:text-start md:text-base'></div>
            </div>
            <div className='h-12 w-full text-start text-3xl font-bold italic text-gray-300 dark:text-gray-700'>
                Socials
            </div>
            <div className='flex w-full flex-row flex-wrap items-center justify-start gap-4 md:justify-start'>
                <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700'></div>
                <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700'></div>
                <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700'></div>
            </div>
            <div className='h-12 w-full text-start text-3xl font-bold italic text-gray-300 dark:text-gray-700'>
                Blogs
            </div>
            <div className='flex w-full flex-col items-center justify-start gap-4 md:flex-row md:justify-center'>
                <div className='flex w-full flex-col items-center justify-center gap-y-2'>
                    <div className='text-md w-full bg-gray-300 bg-opacity-20 p-2 text-center font-bold text-gray-300 dark:bg-gray-700 dark:text-black'>
                        Bloglara Göz At
                    </div>
                </div>
            </div>
        </Container>
    )
}
