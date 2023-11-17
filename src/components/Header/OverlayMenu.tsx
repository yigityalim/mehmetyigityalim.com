'use client'
import React from 'react'
import { useOverlayMenu } from 'store/menu'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import ThemeSwitcher from 'components/ThemeSwitch'
import { cn } from '@/utils'
import LanguageSwitch from 'components/LanguageSwitch'
import useMenu from '@/utils/menu'

const containerVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const childrenVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

export function OverlayMenu(): React.JSX.Element {
    const { menu, setMenu } = useOverlayMenu()
    const Menu = useMenu()

    return (
        <AnimatePresence initial={false}>
            {menu && (
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className={cn(
                        'fixed bottom-0 left-0 right-0 top-[88px] z-[52] flex flex-col items-center justify-between gap-y-4 p-8 transition-all duration-300',
                        menu
                            ? 'bg-white dark:bg-black'
                            : 'bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-2xl'
                    )}
                >
                    <div />
                    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
                        {Menu.map(({ path, icon, title }) => (
                            <motion.div key={path} variants={childrenVariants} className='w-full'>
                                <Link
                                    href={path}
                                    className='flex w-full items-center justify-start gap-x-4 text-4xl font-bold leading-9 tracking-wider'
                                    onClick={() => {
                                        setMenu(false)
                                        document.body.style.overflow = ''
                                    }}
                                >
                                    {icon}
                                    <span>{title}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <div className='items-center-justify-center flex w-56 flex-col gap-y-2'>
                        <LanguageSwitch />
                        <ThemeSwitcher as='button' fullWidth />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

//  bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-xl
