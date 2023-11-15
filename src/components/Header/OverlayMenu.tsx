'use client'
import React from 'react'
import { useOverlayMenu } from 'store/menu'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import ThemeSwitcher from 'components/ThemeSwitch'
import { cn } from '@/utils'
import { randomBytes } from 'crypto'
import LanguageSwitch from 'components/LanguageSwitch'
import useMenu from '@/utils/menu'

export function OverlayMenu(): React.JSX.Element | null {
    const { menu, setMenu } = useOverlayMenu()
    const Menu = useMenu()

    return (
        <AnimatePresence initial={false}>
            {menu && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        'fixed bottom-0 left-0 right-0 top-[88px] z-[52] flex flex-col items-center justify-between gap-y-4 p-8 transition-all duration-300',
                        menu
                            ? 'bg-white dark:bg-black'
                            : 'bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-2xl'
                    )}
                >
                    <div />
                    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
                        {Menu.map(({ path, icon, name, title }) => (
                            <Link
                                key={path + randomBytes(4).toString('hex')}
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
                        ))}
                    </div>
                    <div className='items-center-justify-center flex w-full flex-col gap-y-2'>
                        <LanguageSwitch />
                        <ThemeSwitcher as='button' />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

//  bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-xl
