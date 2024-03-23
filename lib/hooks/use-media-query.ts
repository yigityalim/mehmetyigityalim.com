'use client'
import React from 'react'

export function useMediaQuery(query: string): boolean {
    const subscribe = React.useCallback(
        (callback: (e: MediaQueryListEvent) => void) => {
            const matchMedia: MediaQueryList = window.matchMedia(query)

            matchMedia.addEventListener('change', callback)
            return () => {
                matchMedia.removeEventListener('change', callback)
            }
        },
        [query]
    )

    const getSnapshot = () => window.matchMedia(query).matches

    const getServerSnapshot = () => {
        throw new Error('useMediaQuery server komponentinde kullanılamaz.')
    }

    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
