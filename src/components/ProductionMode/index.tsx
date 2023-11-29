'use client'

import { JSX, ReactNode, Suspense, useCallback, useEffect, useState } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Container from 'components/Containers'
import { Button } from 'components/ui/button'
import AnimatedText from 'components/AnimatedText'
import { Spinner } from 'components/Spinner'
import { useTheme } from 'next-themes'

type ProductionModeState = Readonly<{
    children: ReactNode
}>

export default function ProductionMode({ children }: ProductionModeState): JSX.Element {
    const [isDevelopmentMode, setIsDevelopmentMode] = useState<boolean>(true)

    // bu değişken eğer animasyonun kendi kendine değil de, bir buton ile tetiklenmesi için gerekli olan değişken.
    // eğer bu değişken true ise, sayfanın altında bir buton gözükecek ve bu butona tıklandığında animasyon bitecek ve yöneldirme yapılacak.
    const [buttonActive] = useState<boolean>(false)

    useEffect(() => {
        const hasVisited: string | null = sessionStorage.getItem('hasVisited')
        if (hasVisited) setIsDevelopmentMode(false)
    }, [])

    const handleClick = useCallback(() => {
        if (buttonActive) return
        setIsDevelopmentMode(false)
        sessionStorage.setItem('hasVisited', 'true')
    }, [buttonActive])

    if (isDevelopmentMode) {
        return (
            <Container className='flex min-h-screen items-center justify-center gap-y-12'>
                <AnimatedText text='Mehmet Yiğit Yalım' afterDelay={handleClick} />
                {buttonActive && (
                    <Button size='lg' className='text-lg' onClick={handleClick}>
                        Sayfaya git
                    </Button>
                )}
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

/*

                <Button size='lg' className='text-lg' onClick={handleClick}>
                    Sayfaya git
                </Button>
 */
