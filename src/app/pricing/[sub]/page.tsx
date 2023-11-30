import React from 'react'
import Container from 'components/Containers'

type PageProps = Readonly<{
    params: { sub: string }
}>

export default function Page({ params }: PageProps): React.JSX.Element {
    return <Container>pricing sub page: {params.sub}</Container>
}
