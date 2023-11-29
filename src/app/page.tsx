import Container from 'components/Containers'
import { JSX } from 'react'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'
import Image from 'next/image'
import { SocialMediaSwitchContainer, SocialMedia } from 'components/SocialMedia'
import type { Home } from '@/lib/types/home'
import RequestJob from 'components/RequestJob'
import RequestProject from 'components/RequestProject'

const HOME_PAGE_QUERY: string = gql`
    {
        homePages {
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
            {homePages.map(({ title, picture, description, social }) => (
                <>
                    <Image
                        src={picture.url}
                        alt='Picture of the author'
                        width={150}
                        height={150}
                        className='aspect-square rounded-full object-contain'
                        quality={100}
                        priority
                    />
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h1>
                    <pre className='max-w-full overflow-x-scroll p-0.5 font-sans text-base text-gray-600 dark:text-gray-400'>
                        {description}
                    </pre>
                    <RequestJob />
                    <RequestProject />
                    <SocialMediaSwitchContainer social={social} />
                </>
            ))}
        </Container>
    )
}
