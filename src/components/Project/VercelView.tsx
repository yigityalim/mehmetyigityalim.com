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

    if (vercelResponse.projects.length === 0) {
        return (
            <div className='flex h-[calc(100dvh-10rem)] w-full flex-col items-center justify-center'>
                <h1 className='text-center text-base font-bold text-black dark:text-white'>
                    Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.
                </h1>
            </div>
        )
    }

    return (
        <ul className='mt-4 grid h-full w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-5 lg:gap-6 xl:gap-7'>
            <VercelProject projects={vercelResponse} />
        </ul>
    )
}
