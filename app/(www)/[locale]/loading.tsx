import React from 'react'
import Container from 'components/Containers'
import { Spinner } from 'components/Spinner'

export default function Loading(): React.JSX.Element {
    return (
        <Container>
            <Spinner />
        </Container>
    )
}
