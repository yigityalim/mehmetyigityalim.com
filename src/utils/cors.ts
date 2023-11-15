import { NextRequest, NextResponse } from 'next/server'

export default function allowCors(fn: (req: Request, res: Response) => Promise<void>) {
    return async (req: any, res: any): Promise<void> => {
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Origin', 'https://nextjs-graphql-server-client.vercel.app')
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )

        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }

        await fn(req, res)
    }
}
