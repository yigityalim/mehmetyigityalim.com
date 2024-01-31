import { type GithubRepositoryType } from '@/lib/types/github'
import { VercelProject as VercelProjectType } from '@/lib/types/vercel'

export async function useGithub(): Promise<GithubRepositoryType[]> {
    const response: Response = await fetch(process.env.GITHUB_USER_URL!)
    return (await response.json()) as GithubRepositoryType[]
}

export async function useVercel(): Promise<VercelProjectType> {
    const response: Response = await fetch(process.env.VERCEL_USER_URL!, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
    })
    return (await response.json()) as VercelProjectType
}
