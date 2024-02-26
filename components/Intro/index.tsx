'use client'

import { JSX, ReactNode, Suspense, useEffect, useState } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import AnimatedText from 'components/AnimatedText'
import { Spinner } from 'components/Spinner'
import { motion } from 'framer-motion'

type IntroProps = {
    children: ReactNode
}

const useVisitedStorage = (): boolean => {
    const [hasVisited, setHasVisited] = useState<boolean>(false)

    useEffect(() => {
        const storedValue = window.sessionStorage.getItem('hasVisited')
        if (storedValue) {
            setHasVisited(true)
        }
    }, [])

    const timeout: Timer = setTimeout(() => {
        setHasVisited(true)
        window.sessionStorage.setItem('hasVisited', 'true')
    }, 3000)

    useEffect(() => {
        return () => clearTimeout(timeout)
    }, [timeout])

    return hasVisited
}

export default function Intro({ children }: IntroProps): JSX.Element {
    return (
        <Suspense fallback={<Spinner className='min-h-screen' />}>
            <Header />
            {children}
            <Footer />
        </Suspense>
    )
}

/*

            {!isDevelopmentMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='z-[300] flex min-h-dvh items-center justify-center gap-y-12'
                >
                    <AnimatedText text='Mehmet Yiğit Yalım' />
                </motion.div>
            )}
 */
