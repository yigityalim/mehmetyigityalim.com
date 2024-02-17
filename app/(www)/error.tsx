'use client' // Error components must be Client Components

import Container from '@/components/Containers'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Container className='w-full'>
            <h2 className='text-primary-500 text-5xl font-bold'>Bir şeyler ters gitmiş olabilir 🤔</h2>
            <Button variant='destructive' size='sm' onClick={() => reset()}>
                Tekrar Dene
            </Button>
        </Container>
    )
}
