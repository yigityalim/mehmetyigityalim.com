import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utils'
import Container from 'components/Containers'
import { gql } from 'graphql-request'
import { Metadata } from 'next'
import Mdx from 'components/MDX'
import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const blog = allPosts.find((post) => post.slug.replace('/', '') === params.id)

    if (!blog)
        return {
            title: 'Blog Bulunamadı.',
            description: 'Blog Bulunamadı.',
        }

    return {
        title: blog.title,
        description: blog.description,
    }
}

export default async function Page({ params }: Readonly<{ params: { id: string } }>): Promise<React.JSX.Element> {
    const blog = allPosts.find((post) => post.slug.replace('/', '') === params.id) ?? notFound()
    return (
        <Container>
            <div className='flex w-full items-center justify-between gap-x-2'>
                <h1 className='text-4xl font-bold italic'>{blog?.title}</h1>
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <div className='h-8' />
                    <p className='italic text-black/50 dark:text-white/50'>
                        {format(new Date(blog?.date), 'PP', { locale: tr })}
                    </p>
                </div>
                <div className='flex flex-col items-end gap-y-2'>
                    <Image
                        className='aspect-square h-8 w-8 rounded-full object-contain'
                        alt='user'
                        src={blog?.author.avatar}
                        width={32}
                        height={32}
                    />
                    <p className='text-black/50 dark:text-white/60'>{blog.author.name}</p>
                </div>
            </div>
            <div className='flex w-full flex-col items-start justify-center gap-y-4 md:flex-col-reverse md:justify-between md:gap-x-12'>
                <Mdx source={blog.body.raw} />
            </div>
        </Container>
    )
}
