import React from 'react'
import Link from 'next/link'
import Container from 'components/Containers'
import { buttonVariants } from 'components/ui/button'
import { cn } from 'lib/utils'

export default function Page(): React.JSX.Element {
    return (
        <Container>
            <h1 className='w-full text-center text-5xl font-bold italic'>Blog Bulunamadı.</h1>
            <Link href='/blog' className={cn('w-full', buttonVariants({ variant: 'default' }))}>
                İşte! Diğer tüm Bloglar
            </Link>
        </Container>
    )
}
