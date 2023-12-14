import Container from 'components/Containers'
import { JSX } from 'react'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'
import Image from 'next/image'
import { SocialMediaSwitchContainer } from 'components/SocialMedia'
import type { Home } from 'lib/types/home'
import RequestPackage from 'src/components/RequestPackage'
import RequestJob from 'components/RequestJob'
import Mdx from 'components/MDX'

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
    const { title, picture, description, social } = homePages[0]

    return (
        <Container className='flex flex-col items-start justify-center gap-y-6'>
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
            <div>
                <Mdx source={description} />
            </div>
            <RequestJob />
            <RequestPackage />
            <SocialMediaSwitchContainer social={social} />
        </Container>
    )
}
