import React, { JSX } from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { GithubRepositoryType } from 'lib/types'
import { VercelProject as VercelProjectType } from 'lib/types/vercel'
import { GithubProject, VercelProject } from 'components/Project'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
}

export default async function Page(): Promise<JSX.Element> {
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
    return (
        <Container>
            <VercelProject projects={vercelResponse} />
        </Container>
    )
}

/*
 */

/*
<GithubProject repo={githubResponse} />
<VercelProject projects={vercelResponse} />
 */
