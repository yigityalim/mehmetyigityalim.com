import React, { JSX } from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { GithubRepositoryType } from 'lib/types/github'
import { VercelProject as VercelProjectType } from 'lib/types/vercel'
import { GithubProject, VercelProject } from 'components/Project'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
}

export default async function Page(): Promise<JSX.Element> {
    const [github, vercel] = await Promise.all([
        fetch(process.env.GITHUB_USER_URL!),
        fetch(process.env.VERCEL_USER_URL!, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
            },
        }),
        fetch(process.env.VERCEL_DEPLOYMENTS_URL!, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
            },
        }),
    ])

    const githubResponse: GithubRepositoryType[] = (await github.json()) as GithubRepositoryType[]
    const vercelResponse: VercelProjectType = (await vercel.json()) as VercelProjectType

    return (
        <Container>
            <Tabs defaultValue='github' className='w-full'>
                <TabsList className='mb-4 grid w-full grid-cols-2'>
                    <TabsTrigger value='github'>Github</TabsTrigger>
                    <TabsTrigger value='vercel'>Vercel</TabsTrigger>
                </TabsList>
                <TabsContent value='github'>
                    <GithubProject repo={githubResponse} />
                </TabsContent>
                <TabsContent value='vercel'>
                    <VercelProject projects={vercelResponse} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
