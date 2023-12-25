'use client'
import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'
import { Title } from 'components/Header/Title'
import { cn } from '@/utils'
import { useOverlayMenu } from 'store/menu'

export default function Header(): React.ReactElement {
    const { menu } = useOverlayMenu()
    // TODO - buradaki title komponentinde anasayfa hariç resmim ve ismim olacak. basında / olacak.
    // FIXME - bunu da useEffect ile yap ve loading state eklemeyi unutma

    return (
        <>
            <header
                className={cn(
                    'container fixed top-0 z-[51] mx-auto flex w-full items-center justify-between px-8 py-6 md:p-10 lg:p-12 xl:p-16',
                    {
                        '': !menu,
                        'bg-white bg-opacity-100 backdrop-blur-none dark:bg-wash-dark-2 dark:bg-opacity-100 dark:backdrop-blur-none':
                            menu,
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
