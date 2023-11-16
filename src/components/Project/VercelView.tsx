import React from 'react'
import { VercelProject } from 'components/Project'
import type { VercelProject as VercelProjectType } from 'lib/types/vercel'

export async function VercelView(): Promise<React.JSX.Element> {
    const response = await fetch(process.env.VERCEL_USER_URL as string, {
        headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
    })

    const vercelResponse = (await response.json()) as VercelProjectType

    return (
        <ul className='mt-4 grid h-full w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-7'>
            <VercelProject projects={vercelResponse} />
        </ul>
    )
}
