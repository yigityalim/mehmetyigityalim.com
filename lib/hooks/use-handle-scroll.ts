import { useEffect, useState } from 'react'

export function useHandleScroll(threshold: number): boolean {
    const [scrollUp, setScrollUp] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrollUp(window.scrollY > threshold)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [threshold])

    return scrollUp
}
