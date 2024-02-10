import React from 'react'
import Image from 'next/image'
import Container from 'components/Containers'
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

// TODO - Pre etiketinde shadcn tasarımını referans alarak bir kopyalama işlemi yap.

export default async function Page({ params }: Readonly<{ params: { id: string } }>): Promise<React.JSX.Element> {
    const blog = allPosts.find((post) => post.slug.replace('/', '') === params.id) ?? notFound()
    return (
        <Container>
            <div className='flex w-full flex-col items-center justify-center gap-6'>
                <div className='flex w-full flex-row items-end justify-between'>
                    <h1 className='text-6xl font-bold italic'>{blog?.title}</h1>
                    <Image
                        className='aspect-square h-8 w-8 rounded-full object-contain'
                        alt='user'
                        src={blog?.author.avatar}
                        width={32}
                        height={32}
                    />
                </div>
                <div className='flex w-full flex-col items-center justify-center gap-2'>
                    <div className='flex w-full items-center justify-between'>
                        <p className='italic text-black/50 dark:text-white/50'>
                            {format(new Date(blog?.date), 'PP', { locale: tr })}
                        </p>
                        <p className='text-black/50 dark:text-white/60'>{blog.author.name}</p>
                    </div>
                    <span className='w-full text-start text-sm italic text-black/30 dark:text-white/40 md:text-base'>
                        {blog.readMinutes > 60
                            ? `${Math.floor(blog.readMinutes / 60)} saat ${blog.readMinutes % 60} dakika`
                            : `${blog.readMinutes} dakika` + ' okuma süresi'}
                    </span>
                </div>
            </div>
            <div className='flex w-full flex-col items-start justify-center gap-y-4 md:flex-col-reverse md:justify-between md:gap-x-12'>
                <Mdx source={blog.body.raw} />
            </div>
        </Container>
    )
}
