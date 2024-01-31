import React, { JSX } from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { GithubProject, VercelProject } from 'components/Project'
import { useGithub, useVercel } from 'lib/hooks'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
}

export default async function Page(): Promise<JSX.Element> {
    const [github, vercel] = await Promise.all([useGithub(), useVercel()])

    return (
        <Container>
            <Tabs defaultValue='github' className='w-full'>
                <TabsList className='mb-4 grid w-full grid-cols-2'>
                    <TabsTrigger value='github'>Github</TabsTrigger>
                    <TabsTrigger value='vercel'>Vercel</TabsTrigger>
                </TabsList>
                <TabsContent value='github' className='w-full'>
                    <GithubProject repo={github} />
                </TabsContent>
                <TabsContent value='vercel' className='w-full'>
                    <VercelProject projects={vercel} />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
