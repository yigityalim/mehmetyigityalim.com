import React from 'react'
import Container from 'components/Containers'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'

type Author = {
    id: string
}

const AUTHOR = gql`
    {
        authors {
            id
        }
    }
`

export default async function Loading(): Promise<React.JSX.Element> {
    const { authors } = await hygraph.request<{ authors: Author[] }>(AUTHOR)
    return (
        <Container>
            {[...Array(authors.length)].map((t) => (
                <div
                    key={t}
                    className='flex w-full max-w-3xl flex-row items-center justify-start gap-y-2 rounded-lg bg-gray-300 p-2 pr-4 dark:bg-[#111] dark:shadow-md md:gap-x-4'
                >
                    <div className='h-16 w-16 animate-pulse rounded-full bg-gray-300 dark:bg-[#222]' />
                    <div className='hidden flex-row gap-x-2 rounded-lg md:flex'>
                        <span className='h-6 w-16 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                        <span className='h-6 w-16 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                        <span className='h-6 w-16 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                    </div>
                    <div className='ml-auto flex flex-col items-center justify-end gap-x-4 gap-y-2'>
                        <div className='flex w-full flex-row items-start justify-center gap-x-1'>
                            <div className='h-6 w-32 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                            <div className='h-6 w-20 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                        </div>
                        <div className='xs:flex-row xs:items-start hidden w-full flex-col items-end justify-center gap-y-2 md:flex'>
                            <div className='h-6 w-16 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                            <div className='h-6 w-16 animate-pulse rounded bg-gray-300 dark:bg-[#222]' />
                        </div>
                        <div className='flex w-full items-center justify-center gap-x-2 md:hidden'>
                            <span className='h-6 w-16 animate-pulse rounded-sm bg-gray-300 dark:bg-[#222]' />
                        </div>
                    </div>
                </div>
            ))}
        </Container>
    )
}
