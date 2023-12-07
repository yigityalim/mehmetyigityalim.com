import { NextRequest, NextResponse } from 'next/server'

export default function allowCors(fn: (req: Request, res: Response) => Promise<void>) {
    return async (req: Request, res: Response): Promise<void> => {
        res.headers.set('Access-Control-Allow-Credentials', 'true')
        res.headers.set('Origin', 'https://nextjs-graphql-server-client.vercel.app')
        res.headers.set('Access-Control-Allow-Origin', req.headers.get('origin') || '*')
        res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT')
        res.headers.set(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        if (req.method === 'OPTIONS') {
            res.status = 200
            res.end()
            return
        }

        await fn(req, res)
    }
}
