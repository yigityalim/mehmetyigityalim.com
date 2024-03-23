import React from 'react'

export function useIsFirstRender(): boolean {
    const renderRef = React.useRef(true)

    if (renderRef.current) {
        renderRef.current = false
        return true
    }

    return renderRef.current
}
