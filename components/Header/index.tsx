import React from 'react'
import { ToggleMenu } from 'components/Header/ToggleMenu'
import { OverlayMenu } from 'components/Header/OverlayMenu'

export function Header() {
    return (
        <>
            <ToggleMenu />
            <OverlayMenu />
        </>
    )
}
