import React from 'react'
import { Container } from '@/components/container'
import Link from 'next/link'

export default function NotFound(): React.ReactElement {
    return (
        <Container>
            <h1 className='m-4 ml-0 text-4xl font-bold leading-tight tracking-wide'>İlgili sayfa Bulunamadı.</h1>
            <p className='w-full text-start text-base font-medium leading-tight tracking-wide text-gray-500 dark:text-gray-400'>
                <span className='text-xs'>Aradığınız sayfa kaldırılmış veya değiştirilmiş olabilir.</span>
            </p>
            <Link
                href='/'
                className='w-full p-2 text-start text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500'
            >
                Anasayfa
            </Link>
        </Container>
    )
}
