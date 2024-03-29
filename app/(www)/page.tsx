import React from 'react'
import { Balancer } from '@/components/balancer'
import { Container } from '@/components/container'
import { RequestPlan } from '@/components/request-plan'
import { RequestJob } from '@/components/request-job'
import { HeroSection } from '@/components/hero-section'
import { SocialMedia } from '@/components/social-media'

export default async function Home(): Promise<React.ReactElement> {
    return (
        <Container className='flex flex-col items-start justify-center gap-y-4 px-0 pt-0'>
            <HeroSection />
            <div className='flex w-full flex-col gap-y-8 px-8 pt-4 md:px-10'>
                <Balancer className='flex w-full flex-col items-center justify-start gap-y-2'>
                    <p className='w-full text-start text-lg font-semibold'>Baskent university - MIS (2023)</p>
                    <p className='w-full text-start text-lg font-semibold'>Baskent university - COMP (2021-2023)</p>
                    <p className='w-full text-start text-lg font-semibold'>React.js, Next.js Developer.</p>
                </Balancer>
                <RequestJob />
                <RequestPlan />
                <SocialMedia type='grid' />
            </div>
        </Container>
    )
}
