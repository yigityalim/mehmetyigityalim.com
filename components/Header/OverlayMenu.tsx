'use client'
import React, { useEffect } from 'react'
import { useOverlayMenu } from 'store/menu'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSwitcher from 'components/ThemeSwitch'
import { cn } from 'lib/utils'
import menu from 'lib/menu'
import LocaleSwitcher from 'components/LocaleSwitcher'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/navigation'

export function OverlayMenu(): React.JSX.Element {
    const { menu: overlayMenu, setMenu } = useOverlayMenu()
    const pathname = usePathname()
    const t = useTranslations('navigation')

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
                        'container fixed inset-0 z-[52] mx-auto flex flex-col items-center justify-start gap-y-4 p-8',
                        overlayMenu && 'bg-white dark:bg-wash-dark-2 bg-opacity-40 dark:bg-opacity-50 backdrop-blur-2xl dark:backdrop-blur-2xl',
                    )}
                >
                    <div className='flex w-full flex-col items-center justify-center gap-y-4 pt-24'>
                        {menu.map(({ path, name }) => (
                            <div key={path} className='w-full'>
                                <Link
                                    href={path}
                                    className={cn(
                                        'z-[53] flex w-full items-center justify-end gap-x-4 rounded p-1 text-5xl font-bold',
                                        path === pathname && 'bg-white dark:bg-wash-dark dark:shadow-lg dark:border  dark:border-card-dark',
                                    )}
                                    onClick={() => {
                                        setMenu(false)
                                        document.body.style.overflow = ''
                                    }}
                                >
                                    {t(name)}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row items-center justify-between w-full gap-x-2 mt-auto'>
                        <LocaleSwitcher />
                        <ThemeSwitcher as='select' fullWidth className='z-[100] w-full' />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

//  bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-xl
