import React from 'react'
import Project from 'components/Project'
import { GithubRepositoryType } from 'lib/types'
import Container from 'components/Containers'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
    keywords: 'projelerim, projeler',
}

export default async function Page(): Promise<React.JSX.Element> {
    const response: Response = await fetch(process.env.GITHUB_USER_URL as string)
    const data: GithubRepositoryType[] = await response.json()

    return (
        <Container>
            <ul className='mt-4 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-7'>
                {data?.map(({ name, html_url }, index: number) => (
                    <Project key={name} name={name} html_url={html_url} index={index} />
                ))}
            </ul>
        </Container>
    )
}

//flex flex-col gap-y-4 md:gap-y-5 lg:gap-y-6 xl:gap-y-7
