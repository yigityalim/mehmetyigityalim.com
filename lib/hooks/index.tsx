'use client'
import { useEffect, useState } from 'react'

export const useIsIntro = (): boolean => {
    const [hasVisited, setHasVisited] = useState<boolean>(false)

    useEffect(() => {
        const storedValue = window.sessionStorage.getItem('hasVisited')
        if (storedValue) setHasVisited(true)

        const timeout: Timer = setTimeout(() => {
            setHasVisited(true)
            window.sessionStorage.setItem('hasVisited', 'true')
        }, 3500)

        return (): void => {
            clearTimeout(timeout)
        }
    }, [])

    return !hasVisited
}
