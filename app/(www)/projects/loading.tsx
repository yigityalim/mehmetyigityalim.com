import React from 'react'
import { Container } from '@/components/container'
import { Spinner } from '@/components/spinner'

export default function Loading(): React.JSX.Element {
    return (
        <Container>
            <Spinner />
        </Container>
    )
}
