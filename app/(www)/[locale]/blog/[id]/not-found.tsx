import React from 'react'
import Link from 'next/link'
import Container from 'components/Containers'

export default function Page(): React.JSX.Element {
    return (
        <Container>
            <h1>Blog Bulunamadı.</h1>
            <Link href='/blog'>İşte! Diğer tüm Bloglar</Link>
        </Container>
    )
}
