import Container from 'components/Containers'
import Link from 'next/link'
import { JSX } from 'react'

export default function Page(): JSX.Element {
    return (
        <Container>
            <h1>Üretim modu aktif</h1>
            <Link href='/' className='rounded-md bg-wash-dark p-2 text-white'>
                Anasayfa
            </Link>
        </Container>
    )
}
