import React from 'react'
import hygraph from '@/graphql'
import { Blogs } from '@/lib/types/blog'
import BlogContiner from 'components/Containers/BlogContainer'
import Container from 'components/Containers'
import { Separator } from 'components/ui/separator'
import { Metadata } from 'next'
import { Spinner } from 'components/Spinner'
import BlogView from 'components/Blog/BlogView'
import { gql } from 'graphql-request'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'blog, bloglar, tüm bloglar',
}

export default async function Page(): Promise<React.JSX.Element> {
    const { blogs } = await hygraph.request<{ blogs: Blogs }>(ALL_BLOGS)
    return (
        <Container>
            <BlogView blogs={blogs} />
        </Container>
    )
}

const ALL_BLOGS = gql`
    {
        blogs {
            id
            title
            slug
            coverPhoto {
                url
                width
                height
            }
            content {
                raw
            }
            postColor {
                hex
            }
            datePublished

            author {
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
            }
        }
    }
`
