import { NextResponse } from 'next/server'

export default async function GET() {
    return NextResponse.json(
        {
            name: 'John Doe',
            avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        },
        {
            headers: {
                'Cache-Control': 's-maxage=1, stale-while-revalidate',
            },
            status: 200,
        }
    )
}
