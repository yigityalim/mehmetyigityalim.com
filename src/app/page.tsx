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
    query HomePage {
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
        <Container className='flex flex-col items-start justify-center gap-y-4 px-0 pt-0'>
            <div className='relative w-full'>
                <Image
                    src={picture.url}
                    alt='Picture of the author'
                    quality={100}
                    priority
                    className='w-full object-cover'
                    width={picture.width}
                    height={picture.height}
                />
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black' />
            </div>
            <div className='flex w-full flex-col gap-y-8 px-8 pt-4 md:px-10'>
                <h1 className='scroll-m-20 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
                    {title}
                </h1>
                <div>
                    <Mdx source={description} />
                </div>
                <RequestJob />
                <RequestPackage />
                <SocialMediaSwitchContainer social={social} />
            </div>
        </Container>
    )
}
