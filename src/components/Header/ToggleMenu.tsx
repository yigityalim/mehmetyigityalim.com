'use client'
import React from 'react'
import { useOverlayMenu } from 'store/menu'
import { Button } from 'components/ui/button'
import { cn } from '@/utils'

export function ToggleMenu(): React.JSX.Element {
    const { menu, setMenu } = useOverlayMenu()
    return (
        <Button variant='link' size='icon' onClick={() => setMenu(!menu)}>
            <div className='flex h-full w-full flex-col items-center justify-center gap-y-2'>
                <span
                    className={cn(
                        'h-0.5 w-2/3 bg-black transition-all duration-300 dark:bg-white',
                        menu && 'translate-y-2.5 rotate-45 transform',
                        menu && 'translate-y-[5px] rotate-45 transform'
                    )}
                />
                <span
                    className={cn(
                        'h-0.5 w-2/3 bg-black transition-all duration-300 dark:bg-white',
                        menu && '-translate-y-2.5 -rotate-45 transform',
                        menu && '-translate-y-[5px] -rotate-45 transform'
                    )}
                />
            </div>
        </Button>
    )
}
