'use client'

import { JSX, ReactNode, Suspense, useState } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Container from 'components/Containers'
import { Button } from 'components/ui/button'
import AnimatedText from 'components/AnimatedText'
import { Spinner } from 'components/Spinner'

type ProductionModeState = Readonly<{
    children: ReactNode
}>

export default function ProductionMode({ children }: ProductionModeState): JSX.Element {
    const [isDevelopmentMode, setIsDevelopmentMode] = useState<boolean>(true)

    if (isDevelopmentMode) {
        return (
            <Container className='flex min-h-screen items-center justify-center gap-y-8'>
                <AnimatedText text='Sayfa Geliştirme Aşamasında!' repeatDelay={5000} />
                <Button size='lg' className='text-lg' onClick={() => setIsDevelopmentMode(false)}>
                    Sayfaya git
                </Button>
            </Container>
        )
    }

    return (
        <Suspense fallback={<Spinner className='min-h-screen' />}>
            <Header />
            {children}
            <Footer />
        </Suspense>
    )
}
