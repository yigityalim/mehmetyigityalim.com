'use client'
import React, { useCallback } from 'react'
import { useOverlayMenu } from 'store/menu'
import { Button } from 'components/ui/button'
import { cn } from '@/utils'

export function ToggleMenu(): React.JSX.Element {
    const { menu, setMenu } = useOverlayMenu()

    const classNames: string = cn('h-0.5 w-2/3 bg-black transition-all duration-300 transform dark:bg-white')

    const onClick = useCallback(() => {
        setMenu(!menu)
    }, [menu, setMenu])

    return (
        <Button variant='link' size='icon' onClick={onClick}>
            <div className='z-[9999] flex h-full w-full flex-col items-center justify-center gap-y-2'>
                <span
                    className={cn(
                        classNames,
                        menu && 'translate-y-2.5 rotate-45',
                        menu && 'translate-y-[5px] rotate-45'
                    )}
                />
                <span
                    className={cn(
                        classNames,
                        menu && '-translate-y-2.5 -rotate-45',
                        menu && '-translate-y-[5px] -rotate-45'
                    )}
                />
            </div>
        </Button>
    )
}
