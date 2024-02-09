'use client'

import { JSX, ReactNode, Suspense, useCallback, useEffect, useState } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import AnimatedText from 'components/AnimatedText'
import { Spinner } from 'components/Spinner'
import { motion } from 'framer-motion'

type IntroProps = Readonly<{
    children: ReactNode
}>

export default function Intro({ children }: IntroProps): JSX.Element {
    const [isDevelopmentMode, setIsDevelopmentMode] = useState<boolean>(true)

    useEffect(() => {
        const hasVisited: string | null = sessionStorage.getItem('hasVisited')
        if (hasVisited) setIsDevelopmentMode(false)
    }, [])

    const handleClick = useCallback(() => {
        setIsDevelopmentMode(false)
        sessionStorage.setItem('hasVisited', 'true')
    }, [])

    if (isDevelopmentMode) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-screen items-center justify-center gap-y-12"
            >
                <AnimatedText text='Mehmet Yiğit Yalım' afterDelay={handleClick} />
            </motion.div>
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
