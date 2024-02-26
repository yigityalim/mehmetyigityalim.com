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
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
            <h1 className='w-full text-start text-3xl font-bold'>Projelerim</h1>
            <div className='flex w-full flex-col items-center justify-center gap-y-2'>
                {vercelProjects.map((project) => (
                    <a
                        href={project.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        key={project.id}
                        className='h-full w-full'
                    >
                        <Card key={project.id} className='h-full w-full'>
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
                            <CardContent className='flex flex-row flex-wrap items-start justify-start gap-2'>
                                {project.tags.map((tag) => (
                                    <Badge key={tag}>{tag}</Badge>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <a
                                    href={project.github}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={cn('w-full', buttonVariants({ variant: 'secondary', size: 'sm' }))}
                                >
                                    Github
                                </a>
                            </CardFooter>
                        </Card>
                    </a>
                ))}
            </div>
            <h1 className='w-full text-start text-3xl font-bold'>Github Projelerim</h1>
            <div className='flex w-full flex-col items-center justify-center gap-y-2'>
                <React.Suspense fallback={<Spinner justSpinner />}>
                    <GithubProject repo={github} />
                </React.Suspense>
            </div>
        </Container>
    )
}
