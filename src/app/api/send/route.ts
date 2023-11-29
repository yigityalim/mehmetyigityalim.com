import { NextResponse } from 'next/server'
import resend from 'lib/resend'

export async function GET() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'test@gmail.com',
            to: 'mehmetyalm@icloud.com',
            subject: 'Hello world',
            text: 'Hello world',
        })

        if (error) {
            return NextResponse.json({ error })
        }

        return NextResponse.json({ data })
    } catch (error) {
        return NextResponse.json({ error })
    }
}
