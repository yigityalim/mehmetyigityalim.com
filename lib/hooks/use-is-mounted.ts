import { MutableRefObject, useEffect, useRef } from 'react'

function useIsMounted(): boolean {
    const isMounted: MutableRefObject<boolean> = useRef<boolean>(true)
    useEffect(() => {
        return (): void => {
            isMounted.current = false
        }
    }, [])
    return isMounted.current
}

export { useIsMounted }

// Path: lib/hooks/use-is-mounted.ts
