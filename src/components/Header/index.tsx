'use client'
import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'
import { Title } from 'components/Header/Title'
import { useMenu } from 'store/menu'
import { cn } from 'lib/utils'

export default function Header(): React.JSX.Element {
    const { menu } = useMenu()
    return (
        <>
            <header
                className={cn(
                    'container sticky top-0 z-[51] mx-auto flex w-full items-center justify-between px-8 py-6 md:p-10 lg:p-12 xl:p-16',
                    menu
                        ? 'bg-white dark:bg-black'
                        : 'bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-2xl'
                )}
            >
                <Title />
                <ToggleMenu />
            </header>
            <OverlayMenu />
        </>
    )
}

//bg-opacity-70 backdrop-blur-md dark:bg-opacity-70 dark:backdrop-blur-xl
