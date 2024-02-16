import React from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import BlogView from 'components/Blog/BlogView'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'bloglar, tüm bloglar',
} as Metadata satisfies Metadata

export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
    return allPosts.map((post) => ({ params: { slug: post.slug } }))
}

export default async function Page(): Promise<React.JSX.Element> {
    return (
        <Container title='Blog'>
            <BlogView />
        </Container>
    )
}
