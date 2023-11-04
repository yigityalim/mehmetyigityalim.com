import Container from 'components/Containers'
import { JSX, Suspense } from 'react'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'
import Image from 'next/image'
import SocialMedia from 'lib/socialMedia'
import { Spinner } from 'components/Spinner'

type Home = {
    id: string
    title: string
    picture: {
        url: string
        width: number
        height: number
    }
    description: string
}

const HOME_PAGE_QUERY: string = gql`
    {
        homePages {
            id
            title
            picture {
                url
                width
                height
            }
            description
        }
    }
`

export default async function Home(): Promise<JSX.Element> {
    const { homePages } = await hygraph.request<{ homePages: Home[] }>(HOME_PAGE_QUERY)

    return (
        <Container className='flex flex-col items-center justify-center gap-y-6'>
            {homePages.map(({ id, title, picture }) => (
                <Suspense key={id} fallback={<div>loading...</div>}>
                    <Image
                        src={picture.url}
                        alt='Picture of the author'
                        width={150}
                        height={150}
                        className='rounded-full'
                    />
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h1>
                </Suspense>
            ))}
        </Container>
    )
}
