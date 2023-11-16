import { JSX, RefObject, useEffect, useRef, useState } from 'react'
import { AnimationControls, motion, useAnimation, useInView, type Variants } from 'framer-motion'
import { cn } from '@/utils'
import { randomBytes } from 'crypto'

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
    el?: keyof JSX.IntrinsicElements
    className?: string
    once?: boolean
    repeatDelay?: number
    reverse?: boolean
}

export default function AnimatedText({
    text,
    el: Wrapper = 'p',
    className,
    once = false,
    repeatDelay,
}: AnimatedTextProps): JSX.Element {
    const controls: AnimationControls = useAnimation()
    const textArray: string[] = Array.isArray(text) ? text : [text]
    const ref: RefObject<HTMLSpanElement> = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { amount: 0.5, once })
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const animate = async (): Promise<void> => {
            if (isInView) {
                try {
                    await controls.start('visible')
                    if (repeatDelay && mounted) {
                        timeout = setInterval(async () => {
                            await controls.start('hidden')
                            await controls.start('visible')
                        }, repeatDelay)
                    }
                } catch (error) {
                    console.error('Error starting animation:', error)
                }
            } else {
                try {
                    await controls.start('hidden')
                } catch (error) {
                    console.error('Error hiding animation:', error)
                }
            }
        }

        animate().catch(console.error)

        return () => clearInterval(timeout)
    }, [isInView, controls, repeatDelay, mounted])

    return (
        <Wrapper
            className={cn(
                'text-wrap max-w-2xl text-center text-4xl font-bold text-gray-700 dark:text-gray-300',
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
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                aria-hidden
            >
                {textArray.map((line) => (
                    <span className='block' key={line + randomBytes(4).toString('hex')}>
                        {line.split(' ').map((word) => (
                            <span className='my-1.5 inline-block' key={word + randomBytes(4).toString('hex')}>
                                {word.split('').map((letter) => (
                                    <motion.span
                                        key={letter + randomBytes(4).toString('hex')}
                                        variants={defaultAnimations}
                                    >
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
