import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'
import { Title } from 'components/Header/Title'

export default function Header(): React.JSX.Element {
    return (
        <>
            <header className='container sticky top-0 z-[51] mx-auto flex w-full items-center justify-between bg-white px-8 py-6 dark:bg-black md:p-10 lg:p-12 xl:p-16'>
                <Title />
                <ToggleMenu />
            </header>
            <OverlayMenu />
        </>
    )
}
