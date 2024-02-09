import Container from 'components/Containers'
import { Spinner } from 'components/Spinner'

export default function Loading() {
    return (
        <Container className='h-[calc(100dvh-88px)]'>
            <Spinner />
        </Container>
    )
}
