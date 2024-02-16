'use client'
import React from 'react'
import { cn } from 'lib/utils'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'
import { usePathname } from 'next/navigation'

type ContainerProps = Readonly<
    { className?: string; children: React.ReactNode; title?: string; description?: string } & Omit<
        MotionProps,
        'children'
    >
>

export default function Container({
    className,
    children,
    title,
    description,
    ...props
}: ContainerProps): React.JSX.Element {
    const pathname = usePathname()
    return (
        <AnimatePresence mode='wait'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key={pathname}
                className={cn(
                    'container mx-auto flex h-full w-full max-w-xl flex-col items-center justify-start gap-y-8 p-8 pt-[88px]',
                    (title || description) && 'items-start',
                    className
                )}
                {...props}
            >
                {(title || description) && (
                    <div className='flex w-full flex-col items-start justify-center gap-y-4'>
                        {title && (
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className='text-4xl font-bold leading-tight tracking-wide'
                            >
                                {title}
                            </motion.h1>
                        )}
                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className='text-base font-medium leading-tight tracking-wide text-gray-500 dark:text-gray-400'
                            >
                                <span className='text-xs'>{description}</span>
                            </motion.p>
                        )}
                    </div>
                )}
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

//pt-32 md:pt-36 lg:pt-40 xl:pt-44
