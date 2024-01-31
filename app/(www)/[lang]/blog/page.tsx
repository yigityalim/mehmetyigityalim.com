import React from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import BlogView from 'components/Blog/BlogView'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'blog, bloglar, tüm bloglar',
}

export async function generateStaticParams(): Promise<{ params: { id: string } }[]> {
    return allPosts.map((post) => ({ params: { id: post.slug } }))
}

export default async function Page(): Promise<React.JSX.Element> {
    return (
        <Container title='Blog'>
            <BlogView />
        </Container>
    )
}
