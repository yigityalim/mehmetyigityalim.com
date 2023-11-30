import Container from 'components/Containers'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Container>
            <h1>Kullanıcı bulunamadı.</h1>
            <Link href='/user'>geri dön</Link>
        </Container>
    )
}
