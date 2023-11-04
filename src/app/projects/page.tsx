import { JSX } from 'react'
import Project from 'components/Project'
import { GithubRepositoryType } from 'lib/types'
import Container from 'components/Containers'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
    keywords: 'projelerim, projeler',
}

export default async function Page(): Promise<JSX.Element> {
    const response: Response = (await fetch(process.env.GITHUB_USER_URL as string)) as Response
    const data: GithubRepositoryType[] = await response.json()

    if (!data)
        return (
            <Container>
                <div className='flex h-full flex-col items-center justify-center text-center'>
                    <h1 className='text-2xl font-bold'>Projelerim</h1>
                    <p className='mt-2 text-lg'>Projelerim yükleniyor...</p>
                </div>
            </Container>
        )

    return (
        <Container>
            <ul className='mt-4 grid h-full w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-7'>
                {data?.map(({ name, html_url }, index: number) => (
                    <Project key={name} name={name} html_url={html_url} index={index} />
                ))}
            </ul>
        </Container>
    )
}

//flex flex-col gap-y-4 md:gap-y-5 lg:gap-y-6 xl:gap-y-7
