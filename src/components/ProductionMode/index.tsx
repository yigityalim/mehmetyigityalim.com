'use client'

import { JSX, ReactNode, Suspense } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import { create } from 'zustand'
import Container from 'components/Containers'
import { Button } from 'components/ui/button'
import AnimatedText from 'components/AnimatedText'
import { Spinner } from 'components/Spinner'

type DevelopmentStore<T = boolean> = {
    isDevelopmentMode: T
    isReloaded: T
    setDevelopmentMode: (value: T) => void
    setReloaded: (value: T) => void
}

export const useDevelopmentStatus = create<DevelopmentStore>((set) => ({
    isDevelopmentMode: true,
    isReloaded: false,
    setDevelopmentMode: (value) => set({ isDevelopmentMode: value }),
    setReloaded: (value) => set({ isReloaded: value }),
}))

export default function ProductionMode({ children }: { children: ReactNode }): JSX.Element {
    const isDevelopmentMode = useDevelopmentStatus((state) => state.isDevelopmentMode)
    const setDevelopmentMode = useDevelopmentStatus((state) => state.setDevelopmentMode)
    const isReloaded = useDevelopmentStatus((state) => state.isReloaded)

    if (isDevelopmentMode && !isReloaded) {
        return (
            <Container className='flex min-h-screen items-center justify-center gap-y-8'>
                <AnimatedText text='Sayfa Geliştirme Aşamasında!' repeatDelay={10000} />
                <Button size='lg' className='text-lg' onClick={() => setDevelopmentMode(false)}>
                    Sayfaya git
                </Button>
            </Container>
        )
    }

    return (
        <Suspense fallback={<Spinner />}>
            <Header />
            {children}
            <Footer />
        </Suspense>
    )
}