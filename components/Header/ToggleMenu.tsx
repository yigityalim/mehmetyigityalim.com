'use client'
import React, { useCallback } from 'react'
import { useOverlayMenu } from 'store/menu'
import { cn } from 'lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from 'components/ui/button'
import { Icon } from 'components/Icon'

export function ToggleMenu(): React.JSX.Element {
    const pathname = usePathname()
    const splitted = pathname.split('/')
    const { menu, setMenu } = useOverlayMenu()
    const router = useRouter()

    const classNames: string = cn(
        'h-0.5 w-2/3 bg-black transition-all duration-300 transform dark:bg-white bg-blend-difference'
    )

    const onClick = useCallback(() => {
        setMenu(!menu)
    }, [menu, setMenu])

    return (
        <div className='fixed left-8 right-8 top-8 z-[200] flex items-center justify-between gap-x-2 md:container md:mx-auto md:max-w-xl'>
            <div className={cn('flex h-full w-full items-center gap-x-4 transition', menu && 'opacity-0')}>
                {!!splitted[2] ? (
                    <Icon
                        name='arrow-left'
                        onClick={() => {
                            router.back()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    />
                ) : (
                    <React.Fragment />
                )}
            </div>
            <Button variant='link' size='icon' onClick={onClick}>
                <div className='flex h-full w-full flex-col items-center justify-center gap-y-2'>
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
        </div>
    )
}
