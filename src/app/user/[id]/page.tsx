import React from 'react'
import hygraph, { gql } from '@/graphql'
import { AUTHORS_BY_SLUG } from '@/graphql/queries'
import { cn } from '@/utils'
import { Author } from 'lib/types/Author'
import AuthorContainer from 'components/Containers/AuthorContainer'
import Container from 'components/Containers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const { authors } = await hygraph.request<{ authors: Author[] }>(gql`
        query {
            authors {
                slug
            }
        }
    `)

    return authors.map(({ slug }) => ({ params: { id: slug } }))
}

export async function generateMetadata({
    params,
}: {
    params: { id: string }
}): Promise<{ title: string; description: string }> {
    const { author } = await hygraph.request<{ author: Author }>(
        gql`
            query ($slug: String!) {
                author(slug: $slug) {
                    name
                    about {
                        raw
                    }
                }
            }
        `,
        { slug: params.id }
    )

    if (!author)
        return {
            title: '404',
            description: '404',
        }

    return {
        title: author.name,
        description: author.about.raw.children
            .map(({ children }) => children.map(({ text }) => text).join(''))
            .join(','),
    }
}

export default async function Page({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
    const { author } = await hygraph.request<{ author: Author }>(AUTHORS_BY_SLUG, { slug: params.id })

    if (!author) return notFound()

    return (
        <Container className={cn(author.name.length > 10 ? 'gap-y-4' : 'gap-y-1')}>
            <AuthorContainer author={author} key={author.id} />
        </Container>
    )
}
