import { ElementType, JSX, RefObject, useEffect, useRef, useState } from 'react'
import { AnimationControls, motion, useAnimation, useInView, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { v4 } from 'uuid'

const defaultAnimations: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
}

type AnimatedTextProps = {
    text: string | string[]
    el?: ElementType
    className?: string
    once?: boolean
}

export default function AnimatedText({
    text,
    el: Wrapper = 'p',
    className,
    once = false,
}: Readonly<AnimatedTextProps>): JSX.Element {
    const controls: AnimationControls = useAnimation()
    const textArray: string[] = Array.isArray(text) ? text : [text]
    const ref: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { amount: 0.5, once })
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    useEffect(() => {
        let timeout: Timer
        const animate = async (): Promise<void> => {
            if (isInView && mounted) {
                await controls.start('visible')
            } else await controls.start('hidden')
        }

        if (mounted) animate().catch(console.error)
        return () => clearTimeout(timeout)
    }, [isInView, controls, mounted])

    return (
        <Wrapper
            className={cn(
                'max-w-2xl text-wrap text-center text-4xl font-bold text-gray-700 dark:text-gray-300',
                className
            )}
        >
            <span className='sr-only'>{textArray.join(' ')}</span>
            <motion.span
                ref={ref}
                initial='hidden'
                animate={controls}
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {},
                }}
                aria-hidden
            >
                {textArray.map((line) => (
                    <span className='block' key={line + v4()}>
                        {line.split(' ').map((word) => (
                            <span className='my-1.5 inline-block' key={word + v4()}>
                                {word.split('').map((letter) => (
                                    <motion.span key={letter + v4()} variants={defaultAnimations}>
                                        {letter}
                                    </motion.span>
                                ))}
                                <span className='inline-block'>&nbsp;</span>
                            </span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    )
}
