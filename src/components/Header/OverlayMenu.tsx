'use client'
import React, { useEffect } from 'react'
import { useOverlayMenu } from 'store/menu'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ThemeSwitcher from 'components/ThemeSwitch'
import { cn } from '@/utils'
import LanguageSwitch from 'components/LanguageSwitch'
import useMenu from '@/utils/menu'
import { OVERLAY_MENU_HEIGHT } from 'utils/constants'

export function OverlayMenu(): React.JSX.Element {
    const { menu, setMenu } = useOverlayMenu()
    const Menu = useMenu()

    useEffect(() => {
        // burada scrollbar yok olduğu için width değişiyor. bu yüzden width'i sabit tutmak için padding-right ekliyoruz
        if (menu && document.body.clientWidth > 768) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '15px'
        } else {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [menu])

    return (
        <AnimatePresence initial={false}>
            {menu && (
                <div
                    style={{ top: OVERLAY_MENU_HEIGHT }}
                    className={cn(
                        'container fixed bottom-0 left-0 right-0 z-[52] mx-auto flex flex-col items-center justify-between gap-y-4 p-8 transition-all duration-300',
                        menu
                            ? 'bg-white dark:bg-wash-dark-2'
                            : 'bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-2xl'
                    )}
                >
                    <div />
                    <div className='flex w-full flex-col items-center justify-center gap-y-4'>
                        {Menu.map(({ path, icon, title }) => (
                            <div key={path} className='w-full'>
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
                            </div>
                        ))}
                    </div>
                    <div className='items-center-justify-center flex w-56 flex-col gap-y-2'>
                        <LanguageSwitch />
                        <ThemeSwitcher as='button' fullWidth />
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}

//  bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-xl
