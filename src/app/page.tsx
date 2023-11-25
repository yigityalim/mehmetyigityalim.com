import Container from 'components/Containers'
import { JSX, Suspense } from 'react'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'
import Image from 'next/image'
import SoicalMediaContainer from 'components/Containers/SocialMediaContainer'

type Home = {
    id: string
    title: string
    picture: {
        url: string
        width: number
        height: number
    }
    description: string
    social: Social[]
}

export type Social = {
    id: string
    title: string
    url: string
    color: {
        hex: string
    }[]
    username: string
    social: string
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
            social {
                id
                title
                url
                color {
                    hex
                }
                username
                social
            }
        }
    }
`

export default async function Home(): Promise<JSX.Element> {
    const { homePages } = await hygraph.request<{ homePages: Home[] }>(HOME_PAGE_QUERY)
    if (!homePages) return <div>loading...</div>

    return (
        <Container className='flex flex-col items-start justify-center gap-y-6'>
            {homePages.map(({ id, title, picture, description, social }) => (
                <Suspense key={id} fallback={<div>loading...</div>}>
                    <Image
                        src={picture.url}
                        alt='Picture of the author'
                        width={150}
                        height={150}
                        className='rounded-full'
                    />
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h1>
                    <pre className='max-w-full font-sans text-lg text-gray-600 dark:text-gray-400'>{description}</pre>
                    <SoicalMediaContainer social={social} />
                </Suspense>
            ))}
        </Container>
    )
}
