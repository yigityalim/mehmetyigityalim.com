import React from 'react'
import { Spinner } from 'components/Spinner'
import Container from 'components/Containers'

export default function Loading(): React.JSX.Element {
    return (
        <Container className='h-[calc(100dvh-88px)]'>
            <Spinner />
        </Container>
    )
}
