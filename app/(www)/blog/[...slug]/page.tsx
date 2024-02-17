import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'
import { Mdx } from 'components/MDX'
import { allPosts, type Post } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import Container from 'components/Containers'
import { Badge } from 'components/ui/badge'

export default async function Page({ params }: PostPageProps): Promise<React.JSX.Element> {
    const blog: Post = (await getPostFromParams({ params })) ?? notFound()

    return (
        <Container>
            <div className='flex w-full flex-col items-center justify-center gap-4'>
                <h1 className='w-full text-start text-5xl font-bold italic'>{blog.title}</h1>
                <div className='flex w-full flex-col items-center justify-center gap-y-1'>
                    <div className='flex w-full items-center justify-between'>
                        <p className='italic text-black/50 dark:text-white/50'>
                            {format(new Date(blog?.date), 'PP', { locale: tr })}
                        </p>
                    </div>
                    <div className='flex w-full items-center justify-between'>
                        <span className='text-start text-sm italic text-black/30 dark:text-white/40 md:text-base'>
                            {blog.readMinutes > 60
                                ? `${Math.floor(blog.readMinutes / 60)} saat ${blog.readMinutes % 60} dakika`
                                : `${blog.readMinutes} dakika` + ' okuma süresi'}
                        </span>
                    </div>
                    <div className='flex w-full items-center justify-start gap-x-2'>
                        {blog.tags.map((tag) => (
                            <Badge key={tag} variant='secondary'>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
            <div className='relative flex w-full flex-col items-start justify-center gap-y-4 md:justify-between md:gap-x-12'>
                <Mdx code={blog.body.code} />
            </div>
        </Container>
    )
}

type PostPageProps = Readonly<{
    params: {
        slug: string[]
    }
}>

export async function generateStaticParams() {
    return allPosts.map((post) => ({ params: { slug: post.slug } }))
}

async function getPostFromParams({ params }: PostPageProps): Promise<Post | null> {
    const slug = `/${params.slug?.join('/') || ''}`
    const post: Post | undefined = allPosts.find((doc) => doc.slug === slug)
    if (!post) return null
    return post
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const blog = await getPostFromParams({ params })

    if (!blog)
        return {
            title: 'Blog Bulunamadı.',
            description: 'Blog Bulunamadı.',
        }

    return {
        title: blog.title,
        description: blog.description,
        keywords: [...blog.tags],
    }
}
