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
                    'fixed left-0 right-0 top-0 z-[51] mx-auto flex items-center justify-between px-8 py-6 md:static',
                    {
                        '': !menu,
                        'bg-white bg-opacity-40 backdrop-blur-2xl dark:bg-wash-dark-2 dark:bg-opacity-50 dark:backdrop-blur-2xl':
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
