import { JSX, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { cn } from 'lib/utils'
import { randomBytes } from 'crypto'

const defaultAnimations = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
        },
    },
}

type Props = {
    text: string | string[]
    el?: keyof JSX.IntrinsicElements
    className?: string
    once?: boolean
    repeatDelay?: number
}

export default function AnimatedText({
    text,
    el: Wrapper = 'p',
    className,
    once = false,
    repeatDelay,
}: Props): JSX.Element {
    const controls = useAnimation()
    const textArray = Array.isArray(text) ? text : [text]
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.5, once })

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const show = () => {
            controls.start('visible')
            if (repeatDelay) {
                timeout = setTimeout(async () => {
                    await controls.start('hidden')
                    controls.start('visible')
                }, repeatDelay)
            }
        }

        if (isInView) {
            show()
        } else {
            controls.start('hidden')
        }

        return () => clearTimeout(timeout)
    }, [isInView])

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
