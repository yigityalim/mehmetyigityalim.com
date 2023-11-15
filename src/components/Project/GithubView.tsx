import React from 'react'
import { GithubProject } from 'components/Project'
import { GithubRepositoryType } from 'lib/types'

export async function GithubView(): Promise<React.JSX.Element> {
    const response = await fetch(process.env.GITHUB_USER_URL as string)
    const githubResponse = (await response.json()) as GithubRepositoryType[]
    return (
        <ul className='mt-4 grid h-full w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-7'>
            <GithubProject repo={githubResponse} />
        </ul>
    )
}
