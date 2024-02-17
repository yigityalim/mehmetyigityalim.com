import { createEnv } from '@t3-oss/env-core'
import { vercel } from '@t3-oss/env-core/presets'
import { z } from 'zod'

export const env = createEnv({
    isServer: typeof window === undefined,
    server: {
        // -------------------------------- GitHub API --------------------------------
        GITHUB_USER_URL: z.string().url(),
        // -------------------------------- Vercel API --------------------------------
        VERCEL_USER_URL: z.string().url(),
        VERCEL_TOKEN: z.string().min(1),
        VERCEL_DEPLOYMENT_URL: z.string().url(),

        // -------------------------------- RESEND --------------------------------
        RESEND_API_KEY: z.string().min(1),
        // -------------------------------- UNKNOWN --------------------------------
    },
    client: {},
    clientPrefix: 'NEXT_PUBLIC_',
    runtimeEnv: {
        GITHUB_USER_URL: process.env.GITHUB_USER_URL,
        VERCEL_USER_URL: process.env.VERCEL_USER_URL,
        VERCEL_TOKEN: process.env.VERCEL_TOKEN,
        VERCEL_DEPLOYMENT_URL: process.env.VERCEL_DEPLOYMENT_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
    },
    extends: [vercel],
})
