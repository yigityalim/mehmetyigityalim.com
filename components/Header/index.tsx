import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'

export default async function Header(): Promise<React.ReactElement> {
    return (
        <>
            <ToggleMenu />
            <OverlayMenu />
        </>
    )
}
