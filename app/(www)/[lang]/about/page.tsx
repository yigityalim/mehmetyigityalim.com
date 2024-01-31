import Container from '../../../../components/Containers'
import hygraph, { gql } from '../../../../graphql'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import Image from 'next/image'

const components = {
    h1: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h1 {...props} className='test-class text-center text-4xl font-bold'>
            {props.children}
        </h1>
    ),
    code: (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
        <code {...props} className='test-class'>
            {props.children}
        </code>
    ),
} as const

const query = gql`
    query {
        about(where: { id: "clq0i6dsk0ubi0cusd36gk8u2" }) {
            name
            about
            date
            age
            cover {
                width
                height
                url
            }
        }
    }
`

interface About {
    name: string
    about: string
    date: string
    age: number
    cover: {
        width: number
        height: number
        url: string
    }
}

export default async function Page(): Promise<React.ReactElement> {
    const { about } = await hygraph.request<{ about: About }>(query)
    return (
        <Container className='gap-y-2'>
            <Image
                src={about.cover.url}
                width={about.cover.width}
                height={about.cover.height}
                alt={about.name}
                priority
                className='mx-auto mb-4 h-48 w-48 rounded-full object-cover object-center'
            />
            <h1 className='text-center text-4xl font-bold'>{about.name}</h1>
            <div className='prose prose-zinc dark:prose-invert'>
                <MDXRemote source={about.about} components={components} />
            </div>
        </Container>
    )
}
