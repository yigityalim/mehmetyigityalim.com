import React from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { BlogView } from 'components/Blog/BlogView'

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
