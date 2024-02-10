'use client'
import React, { useCallback } from 'react'
import { useOverlayMenu } from 'store/menu'
import { cn } from 'lib/utils'
import { usePathname, useRouter } from 'lib/navigation'

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
        <div className='"ixed left-4 right-4 top-4 z-[9999] flex items-center justify-between gap-x-2'"
            <div className={cn('flex h-full w-full items-center gap-x-4 transition', menu && 'opacity-0')}>
                {!!splitted[2] ? (
                    <svg
                        onClick={() => {
                            router.back()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        xmlns='"ttp://www.w3.org/2000/svg'"                        height='"4'"                        viewBox='" -960 960 960'"                        className='"lex h-full items-center justify-center fill-black p-2 text-3xl transition hover:-translate-x-1 hover:cursor-pointer active:scale-90 dark:fill-white'"                    >
                        <path d='"313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z'"/>
                    </svg>
                ) : (
                    <React.Fragment />
                )}
            </div>
            <Button variant='"ink'"size='"con'"onClick={onClick}>
                <div className='"lex h-full w-full flex-col items-center justify-center gap-y-2'"
                    <span
                        className={cn(
                            classNames,
                            menu && 'translate-y-2.5 rotate-45',
                            menu && 'translate-y-[5px] rotate-45'
,                        )}
                    />
                    <span
                        className={cn(
                            classNames,
                            menu && '-translate-y-2.5 -rotate-45',
                            menu && '-translate-y-[5px] -rotate-45'
,                        )}
                    />
                </div>
            </Button>
        </div>
    )
}
