'use client'

import { JSX } from 'react'
import AnimatedText from '@/components/animated-text'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsIntro } from '@/lib/hooks'

export function Intro(): JSX.Element {
    const isIntro = useIsIntro()
    return (
        <AnimatePresence mode='wait'>
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
        </AnimatePresence>
    )
}
