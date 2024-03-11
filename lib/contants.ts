import { env } from '@/env'

export const BASE_URL = (() => {
    if (process.env.NODE_ENV === 'development') return 'http://localhost:3000'
    if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
    return 'https://www.mehmetyigityalim.com'
})()
