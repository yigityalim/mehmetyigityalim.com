import React from 'react'
import { Author } from 'lib/types'
import { Card, CardContent, CardFooter } from 'components/ui/card'
import Image from 'next/image'
import { Badge } from 'components/ui/badge'
import { CodeIcon } from 'lucide-react'
import { randomUUID } from 'crypto'

export default function AuthorContainer({ author }: { author: Author }): React.JSX.Element {
    return (
        <>
            <Card
                key={author.id}
                className='mx-auto min-w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl'
            >
                <Image
                    alt='Profile picture'
                    className='w-full object-cover'
                    height='320'
                    src={author.picture.url}
                    style={{
                        aspectRatio: '320/320',
                        objectFit: 'cover',
                    }}
                    width='320'
                    priority
                />
                <CardContent className='p-4'>
                    <div className='flex w-full flex-col items-center justify-between gap-y-2'>
                        <div className='flex h-full w-full items-center justify-between gap-x-2'>
                            <h2 className='text-2xl font-bold transition-all duration-200 hover:text-gray-700'>
                                {author.name} {author.surname}
                            </h2>
                            <Badge className='gap-x-2'>
                                <CodeIcon size={12} />
                                {author.programmingLanguages.length}
                            </Badge>
                        </div>
                        <div className='flex h-full w-full items-center justify-between gap-x-2'>
                            <h3 className='text-gray-500 transition-all duration-200 hover:text-gray-600'>
                                {author.email}
                            </h3>
                            <h1 className='text-sm font-bold transition-all duration-200 hover:text-gray-700'>
                                {author.blogs.length > 0
                                    ? `Blog sayısı: ${author.blogs.length}`
                                    : 'Henüz bir blog yok.'}
                            </h1>
                        </div>
                        <div className='flex h-full w-full items-center justify-between gap-x-2'>
                            <div className='flex h-full w-full flex-col gap-y-2'>
                                {author.about.raw.children.map(({ children }) => (
                                    <p
                                        key={randomUUID()}
                                        className='mt-1 text-gray-600 transition-all duration-200 hover:text-gray-700'
                                    >
                                        {children.map(({ text }) => text).join('')}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>card footer</CardFooter>
            </Card>
        </>
    )
}
