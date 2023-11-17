'use client'
import React from 'react'
import { cn } from '@/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type ContainerProps = Readonly<{ className?: string; children: React.ReactNode }>

export default function Container({ className, children, ...props }: ContainerProps): React.JSX.Element {
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
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

//pt-32 md:pt-36 lg:pt-40 xl:pt-44
