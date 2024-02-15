'use client'
import React, { useEffect } from 'react'
import { useOverlayMenu } from 'store/menu'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSwitcher from 'components/ThemeSwitch'
import { cn } from 'lib/utils'
import menu from 'lib/menu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function OverlayMenu(): React.JSX.Element {
    const { menu: overlayMenu, setMenu } = useOverlayMenu()
    const pathname = usePathname()

    useEffect(() => {
        document.body.style.overflow = overlayMenu ? 'hidden' : ''
        if (window.innerWidth > 768) document.body.style.paddingRight = overlayMenu ? '15px' : ''
    }, [overlayMenu])

    return (
        <AnimatePresence initial={false}>
            {overlayMenu && (
                <motion.div
                    key='overlay-menu'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        'fixed inset-0 z-[52] flex flex-col items-center justify-start gap-y-4 p-8 md:container md:mx-auto md:max-w-xl',
                        overlayMenu &&
                            'bg-white bg-opacity-40 backdrop-blur-2xl dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-2xl'
                    )}
                >
                    <div className='flex w-full flex-col items-center justify-center gap-y-4 pt-24'>
                        {menu.map(({ path, title }) => (
                            <div key={path} className='w-full'>
                                <Link
                                    href={path}
                                    className={cn(
                                        'z-[53] flex w-full items-center justify-end gap-x-4 rounded p-1 text-5xl font-bold',
                                        path === pathname &&
                                            'bg-white dark:border dark:border-black/30 dark:bg-black dark:shadow-lg'
                                    )}
                                    onClick={() => {
                                        setMenu(false)
                                        document.body.style.overflow = ''
                                    }}
                                >
                                    {title}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='mt-auto flex w-full flex-row items-center justify-center gap-x-2'>
                        <ThemeSwitcher as='select' fullWidth className='z-[100] w-full' />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

//  bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-xl
