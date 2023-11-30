'use client'
import React from 'react'
import useTitle from 'components/Header/useTitle'
import { useOverlayMenu } from 'store/menu'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils'

export function Title(): React.JSX.Element {
    const { isSub, title } = useTitle()
    const { menu } = useOverlayMenu()
    const { back } = useRouter()

    return (
        <div className={cn('flex h-full w-full items-center gap-x-4 transition', menu && 'opacity-0')}>
            {isSub ? (
                <svg
                    onClick={() => {
                        back()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    xmlns='http://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 -960 960 960'
                    className='flex h-full items-center justify-center fill-black p-2 text-3xl transition hover:-translate-x-1 hover:cursor-pointer active:scale-90 dark:fill-white'
                >
                    <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
                </svg>
            ) : (
                <h1
                    className={cn(
                        'w-full text-2xl font-bold leading-9 tracking-wider transition',
                        menu && 'translate-y-[-5px] opacity-0'
                    )}
                >
                    {title}
                </h1>
            )}
        </div>
    )
}
