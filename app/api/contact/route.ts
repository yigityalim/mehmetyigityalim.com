import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/env'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function POST(req: NextRequest, res: NextResponse) {
    const data = req.body
    console.log(data)
    return NextResponse.json({ message: 'success' })
}
