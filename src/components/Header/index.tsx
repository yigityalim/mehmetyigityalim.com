'use client'
import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'
import { Title } from 'components/Header/Title'
import { cn } from '@/utils'
import { useOverlayMenu } from 'store/menu'
export default function Header(): React.JSX.Element {
    const { menu } = useOverlayMenu()

    return (
        <>
            <header
                className={cn(
                    'container sticky top-0 z-[51] mx-auto flex w-full items-center justify-between bg-white px-8 py-6 transition-colors duration-300 dark:bg-wash-dark-2 md:p-10 lg:p-12 xl:p-16',
                    {
                        'bg-opacity-50 backdrop-blur-xl dark:bg-opacity-60 dark:backdrop-blur-2xl': !menu,
                    }
                )}
            >
                <Title />
                <ToggleMenu />
            </header>
            <OverlayMenu />
        </>
    )
}
