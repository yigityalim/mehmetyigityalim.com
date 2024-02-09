import React from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { GithubProject } from 'components/Project'
import type { GithubRepositoryType } from 'lib/types/github'
import vercelProjects from 'lib/vercelProjects'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { Badge } from 'components/ui/badge'
import { formatDistance } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Spinner } from '@/components/Spinner'

async function useGithub(): Promise<GithubRepositoryType[]> {
    const response: Response = await fetch(process.env.GITHUB_USER_URL!)
    return (await response.json()) as GithubRepositoryType[]
}

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
}

export default async function Page(): Promise<React.JSX.Element> {
    const [github] = await Promise.all([useGithub()])

    return (
        <Container>
            <h1 className="w-full text-3xl text-start font-bold">Projelerim</h1>
            <div className="w-full flex flex-col gap-y-2 items-center justify-center">
                {vercelProjects.map((project) => (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" key={project.id} className="w-full h-full">
                        <Card key={project.id} className="w-full h-full">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                                <p className='text-base font-bold'>
                                    {formatDistance(new Date(project.createdAt), new Date(), {
                                        addSuffix: true,
                                        locale: tr,
                                    })}
                                </p>
                            </CardHeader>
                            <CardContent>
                                {project.tags.map((tag) => (
                                    <Badge key={tag} className="mr-2">
                                        {tag}
                                    </Badge>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    Github
                                </a>
                            </CardFooter>
                        </Card>
                    </a>
                ))}
            </div>
            <h1 className="w-full text-3xl text-start font-bold">Github Projelerim</h1>
            <div className="w-full flex flex-col gap-y-2 items-center justify-center">
                <React.Suspense fallback={<Spinner justSpinner />}>
                    <GithubProject repo={github} />
                </React.Suspense>
            </div>
        </Container>
    )
}
