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
                    <ul className='flex w-full flex-col items-center justify-center gap-y-4'>
                        {SocialMedia.map(({ icon, title, url }, index) => (
                            <li key={title} className='h-full w-full'>
                                <a
                                    href={url}
                                    className='inline-flex w-full items-center justify-center gap-x-4 rounded bg-gray-50 p-3 text-2xl text-gray-900 transition duration-150 ease-in-out active:scale-90 dark:bg-[#111] dark:text-white'
                                    title={title}
                                    target='_blank'
                                    rel='noreferrer noopener'
                                    role='button'
                                    tabIndex={index}
                                >
                                    {icon} {title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Suspense>
            ))}
        </Container>
    )
}
