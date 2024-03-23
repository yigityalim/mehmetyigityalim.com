import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { BlogView } from '@/components/blog-view'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'bloglar, tüm bloglar',
} as Metadata satisfies Metadata

// FIXME - burada kategorilere göre gösterim yapılacak. örneğin dark mode içiin klasör mantığı. table of contents mantığı olabilir. şu an çünkü hepsini listeliyoruz.

export default async function Page(): Promise<React.JSX.Element> {
    return (
        <Container title='Blog' isDev>
            <BlogView />
        </Container>
    )
}
