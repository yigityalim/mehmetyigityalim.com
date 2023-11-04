'use client'
import React from 'react'
import { cn } from 'lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import crypto from 'crypto'

export default function Container({
    className,
    children,
}: {
    className?: string
    children?: React.ReactNode
}): React.JSX.Element {
    const pathname = usePathname()
    return (
        <AnimatePresence>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key={`${pathname}-${crypto.randomBytes(4).toString('hex')}`}
                className={cn(
                    'container mx-auto flex h-full w-full flex-col items-center justify-start gap-y-8 p-8 md:px-10 lg:px-12 xl:px-16 xl:pt-44',
                    className
                )}
            >
                {children}
            </motion.main>
        </AnimatePresence>
    )
}

//pt-32 md:pt-36 lg:pt-40
