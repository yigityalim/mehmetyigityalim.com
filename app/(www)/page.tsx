import Container from 'components/Containers'
import RequestPlan from 'components/RequestPlan'
import RequestJob from 'components/RequestJob'
import HeroSection from 'components/HeroSection'
import { SocialMedia } from 'components/SocialMedia/'

export default async function Home() {
    return (
        <Container className='flex flex-col items-start justify-center gap-y-4 px-0 pt-0'>
            <HeroSection />
            <div className='flex w-full flex-col gap-y-8 px-8 pt-4 md:px-10'>
                <div>
                    Baskent university - MIS (2023) Baskent university - COMP (2021-2023) React.js, Next.js Developer.
                </div>
                <RequestJob />
                <RequestPlan />
                <SocialMedia type='grid' />
            </div>
        </Container>
    )
}