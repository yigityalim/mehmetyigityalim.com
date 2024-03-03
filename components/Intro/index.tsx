'use client'

import { JSX, Suspense } from 'react'
import AnimatedText from 'components/AnimatedText'
import { Spinner } from 'components/Spinner'
import { motion } from 'framer-motion'
import { useIsIntro } from '@/lib/hooks'

export function Intro(): JSX.Element {
    const isIntro = useIsIntro()
    return (
        <Suspense fallback={<Spinner />}>
            {isIntro && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='z-[300] flex min-h-dvh items-center justify-center gap-y-12'
                >
                    <AnimatedText text='Mehmet Yiğit Yalım' />
                </motion.div>
            )}
        </Suspense>
    )
}
