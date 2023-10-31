import React from 'react'
import hygraph from '@/src/graphql'
import { ALL_BLOGS } from '@/src/graphql/queries'
import { Blogs } from 'lib/types'
import BlogContiner from 'components/Containers/BlogContainer'
import Container from 'components/Containers'
import { Separator } from 'components/ui/separator'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'blog, bloglar, tüm bloglar',
}

export default async function Page(): Promise<React.JSX.Element> {
    const { blogs } = await hygraph.request<{ blogs: Blogs }>(ALL_BLOGS)
    return (
        <Container>
            <ul className='mt-4 flex flex-col flex-wrap items-center justify-between gap-8 md:flex-row'>
                {blogs.map((blog, index) => (
                    <React.Fragment key={blog.id}>
                        <BlogContiner blog={blog} />
                        {index !== blogs.length - 1 && <Separator className='md:hidden' />}
                    </React.Fragment>
                ))}
            </ul>
        </Container>
    )
}
