'use client'
import { useEffect, useState } from 'react'

export const useIsIntro = (): boolean => {
    const [hasVisited, setHasVisited] = useState<boolean>(false)

    useEffect(() => {
        const storedValue = sessionStorage.getItem('hasVisited')
        if (storedValue) {
            setHasVisited(true)
        }
    }, [])

    const timeout: Timer = setTimeout(() => {
        setHasVisited(true)
        sessionStorage.setItem('hasVisited', 'true')
    }, 3100)

    useEffect(() => {
        return () => clearTimeout(timeout)
    }, [timeout])

    return !hasVisited
}
