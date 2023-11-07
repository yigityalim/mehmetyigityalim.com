import React from 'react'
import hygraph from '@/graphql'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_BY_SLUG } from '@/graphql/queries'
import { cn, formatDateTime } from 'lib/utils'
import { Blog } from 'lib/types'
import { ArrowLeft } from 'components/Icon'
import Container from 'components/Containers'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { blog } = await hygraph.request<{ blog: Blog }>(BLOG_BY_SLUG, {
        slug: params.id,
    })
    return {
        title: blog.title,
        description: blog.content.raw.children[0].children[0].text,
    }
}

export default async function Page({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
    const { blog } = await hygraph.request<{ blog: Blog }>(BLOG_BY_SLUG, {
        slug: params.id,
    })
    return (
        <Container className={cn(blog.title.length > 10 ? 'gap-y-4' : 'gap-y-1')}>
            <div className='flex w-full items-center justify-between gap-x-2'>
                <h1 className='text-4xl font-bold italic'>{blog.title}</h1>
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <p className='italic text-black/50 dark:text-white/50'>{formatDateTime(blog.datePublished)}</p>
                </div>
                <Link href={`/user/${blog.author.slug}`} className='flex flex-col items-end gap-y-2'>
                    <Image
                        className='aspect-square h-8 w-8 rounded-full object-cover'
                        alt='user'
                        src={blog.author.picture.url}
                        width={blog.author.picture.width}
                        height={blog.author.picture.height}
                    />
                    <p className='text-black/50 dark:text-white/60'>{blog.author.name}</p>
                </Link>
            </div>
            <div className='flex flex-col items-start justify-center gap-y-4 md:flex-col-reverse md:justify-between md:gap-x-12'>
                <Image
                    className='h-full w-full object-cover dark:border dark:bg-white md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[34rem]'
                    alt='blog'
                    src={blog.coverPhoto.url}
                    width={blog.coverPhoto.width}
                    height={blog.coverPhoto.height}
                />
                <div className='text-left text-xl'>
                    {blog.content.raw.children.map(({ children }: any) =>
                        children.map(({ text }: any) => (
                            <p key={text} className='text-base text-black dark:text-white'>
                                {text}
                            </p>
                        ))
                    )}
                </div>
            </div>
            <Link
                href='/blog'
                className='group flex w-full items-center justify-start gap-x-4 border border-zinc-900 bg-white px-4 py-2 transition hover:bg-zinc-900 hover:text-white dark:border-white dark:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900'
            >
                <ArrowLeft className='fill-black transition group-hover:-translate-x-2 dark:fill-white dark:hover:fill-black' />
                geri
            </Link>
        </Container>
    )
}
