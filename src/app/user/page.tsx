import React from 'react'
import Container from 'components/Containers'
import { Author } from 'lib/types/Author'
import hygraph from '@/graphql'
import { Metadata } from 'next'
import UserContainer from 'components/Containers/UserContainer'
import { gql } from 'graphql-request'

export const metadata: Metadata = {
    title: 'Kullanıcılar',
    description: 'Kullanıcılar',
    keywords: 'kullanıcılar',
}

export default async function Page(): Promise<React.JSX.Element> {
    const { authors } = await hygraph.request<{ authors: Author[] }>(ALL_AUTHORS)
    return (
        <Container title='Kullanıcılar'>
            <div className='flex h-full w-full flex-col items-center justify-start gap-y-4 md:flex-row md:justify-center md:gap-x-4'>
                {authors.map((author) => (
                    <UserContainer author={author} key={author.id} />
                ))}
            </div>
        </Container>
    )
}

const ALL_AUTHORS = gql`
    {
        authors {
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
