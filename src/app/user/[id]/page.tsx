import React from 'react'
import hygraph, { gql } from '@/graphql'
import { cn } from '@/utils'
import { Author } from 'lib/types/Author'
import AuthorContainer from 'components/Containers/AuthorContainer'
import Container from 'components/Containers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams(): Promise<{ params: { id: string } }[]> {
    const { authors } = await hygraph.request<{ authors: Author[] }>(gql`
        query {
            authors {
                slug
            }
        }
    `)

    return authors.map(({ slug }) => ({ params: { id: slug } }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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

const AUTHORS_BY_SLUG = gql`
    query AuthorBySlug($slug: String!) {
        author(where: { slug: $slug }) {
            id
            name
            surname
            email
            age
            programmingLanguages {
                id
                name
                color {
                    hex
                }
            }
            picture {
                url
                width
                height
            }
            slug
            about {
                raw
            }
            createdBy {
                id
            }
            blogs {
                id
                title
                slug
                coverPhoto {
                    url
                    width
                    height
                }
                postColor {
                    hex
                }
            }
            social {
                id
                title
                url
            }
        }
    }
`
