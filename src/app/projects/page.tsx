import React, { JSX } from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
}

export default async function Page(): Promise<JSX.Element> {
    return (
        <Container>
            <Tabs defaultValue='github' className='w-full'>
                <TabsList className='mb-4 grid w-full grid-cols-2'>
                    <TabsTrigger value='github'>Github</TabsTrigger>
                    <TabsTrigger value='vercel'>Vercel</TabsTrigger>
                </TabsList>
                <TabsContent value='github'>github</TabsContent>
                <TabsContent value='vercel'>vercel</TabsContent>
            </Tabs>
        </Container>
    )
}

/*

    const [github, vercel] = await Promise.all([
        fetch(process.env.GITHUB_USER_URL as string),
        fetch(process.env.VERCEL_USER_URL as string, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
            },
        }),
    ])

    const githubResponse: GithubRepositoryType[] = (await github.json()) as GithubRepositoryType[]
    const vercelResponse: VercelProjectType = (await vercel.json()) as VercelProjectType
 */

/*
<GithubProject repo={githubResponse} />
<VercelProject projects={vercelResponse} />
 */
