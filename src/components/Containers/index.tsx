'use client'
import React from 'react'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type ContainerProps = Readonly<{ className?: string; children: React.ReactNode; title?: string }>

export default function Container({ className, children, title, ...props }: ContainerProps): React.JSX.Element {
    const pathname = usePathname()
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key={pathname}
                className={cn(
                    'container mx-auto flex h-full w-full flex-col items-center justify-start gap-y-8 p-8 md:px-10 lg:px-12 xl:px-16',
                    className
                )}
                {...props}
            >
                {title && (
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className='w-full text-start text-3xl font-semibold text-gray-100'
                    >
                        {title}
                    </motion.h1>
                )}
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

//pt-32 md:pt-36 lg:pt-40 xl:pt-44
