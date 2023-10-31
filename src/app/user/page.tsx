import React from 'react'
import Container from 'components/Containers'
import Image from 'next/image'
import { Author } from 'lib/types'
import hygraph from '@/src/graphql'
import { ALL_AUTHORS } from '@/src/graphql/queries'
import Link from 'next/link'
import { Metadata } from 'next'
import { textColorForBackground } from 'lib/utils'

export const metadata: Metadata = {
    title: 'Kullanıcılar',
    description: 'Kullanıcılar',
    keywords: 'kullanıcılar',
}

export default async function Page(): Promise<React.JSX.Element> {
    const { authors } = await hygraph.request<{ authors: Author[] }>(ALL_AUTHORS)
    return (
        <Container>
            <div className='flex h-full w-full flex-col items-center justify-start gap-y-4 md:justify-center'>
                {authors.map((author) => (
                    <UserCard key={author.id} author={author} />
                ))}
            </div>
        </Container>
    )
}

function UserCard({ author }: { author: Author }): React.JSX.Element {
    return (
        <Link
            href={'/user/' + author.slug}
            className='flex w-full max-w-3xl flex-row items-center justify-start gap-y-2 rounded-lg bg-zinc-200 p-2 pr-4 dark:bg-zinc-950 dark:shadow-md md:gap-x-4'
        >
            <Image src={author.picture.url} alt={author.name} width={70} height={70} className='rounded-full' />
            <div className='hidden flex-row gap-x-2 rounded-lg md:flex'>
                {author.programmingLanguages.map(({ id, color: { hex }, name }) => (
                    <span
                        key={id}
                        style={{ backgroundColor: hex }}
                        className='rounded-sm px-2 py-0.5 text-xs text-black dark:text-white'
                    >
                        {name}
                    </span>
                ))}
            </div>
            <div className='ml-auto flex flex-col items-center justify-end gap-x-4 gap-y-2'>
                <div className='flex w-full flex-row items-start justify-center gap-x-1'>
                    <h1 className='text-xl font-bold text-black dark:text-white'>{author.name}</h1>
                    <h2 className='text-xl font-medium text-gray-500 dark:text-white/30'>{author.surname}</h2>
                </div>
                <div className='xs:flex-row xs:items-start hidden w-full flex-col items-end justify-center gap-y-2 md:flex'>
                    <h3 className='text-md font-medium text-gray-500'>{author.age}</h3>
                    <h3 className='text-md font-medium text-gray-500'>{author.email}</h3>
                </div>
                <div className='flex w-full items-center justify-center gap-x-2 md:hidden'>
                    {author.programmingLanguages.length === 0 ? (
                        <div className='rounded-sm px-1 py-0.5 text-xs text-black dark:text-white'>
                            Henüz bilgisi yok :)
                        </div>
                    ) : (
                        author.programmingLanguages
                            //.sort((a, b) => a.level - b.level)
                            //.shuffle()
                            .slice(0, 3)
                            .map(({ id, color, name }) => (
                                <span
                                    key={id}
                                    style={{ backgroundColor: color.hex, color: textColorForBackground(color.hex) }}
                                    className='rounded-sm px-2 py-0.5 text-xs'
                                >
                                    {name}
                                </span>
                            ))
                    )}
                </div>
            </div>
        </Link>
    )
}
