'use client'
import React from 'react'
import { useMenu } from 'store/menu'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ThemeSwitcher from 'components/ThemeSwitch'
import Menu from 'lib/menu'

export function OverlayMenu(): React.JSX.Element | null {
    const { menu, setMenu } = useMenu()
    if (menu)
        return (
            <div className='fixed bottom-0 left-0 right-0 top-[88px] z-[52] flex flex-col items-center justify-between gap-y-4 bg-white bg-opacity-70 p-8 backdrop-blur-md transition-colors duration-300 dark:bg-black dark:bg-opacity-70 dark:backdrop-blur-lg'>
                <div />
                <div className='flex w-full flex-col items-center justify-center gap-y-4'>
                    {Menu.map(({ path, icon, name, title }, index) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, ease: 'easeInOut', duration: 0.3 }}
                            className='h-full w-full'
                        >
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
                <ThemeSwitcher as='button' />
            </div>
        )
    return null
}
