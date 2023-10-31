import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'
import { Title } from 'components/Header/Title'

export default function Header(): React.JSX.Element {
    return (
        <header>
            <nav className='container fixed z-[51] mx-auto flex w-full flex-col items-center justify-center bg-white bg-opacity-70 p-6 backdrop-blur-md transition-all duration-300 dark:bg-black dark:bg-opacity-70 dark:backdrop-blur-lg md:p-10 lg:p-12 xl:p-16'>
                <div className='flex h-full w-full items-center justify-between'>
                    <Title />
                    <ToggleMenu />
                </div>
            </nav>
            <OverlayMenu />
        </header>
    )
}
