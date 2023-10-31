'use client'
import React from 'react'
import useTitle from 'components/Header/useTitle'
import { useMenu } from 'store/menu'
import { useRouter } from 'next/navigation'
import { cn } from 'lib/utils'

export function Title(): React.JSX.Element {
    const { pathname, title } = useTitle()
    const { menu } = useMenu()
    const { back } = useRouter()
    return (
        <div
            className={cn(
                'flex h-full w-full items-center justify-between gap-x-4 transition-all duration-300',
                menu && 'opacity-0'
            )}
        >
            {pathname === '/' ? (
                <h1
                    className={cn(
                        'text-2xl font-bold leading-9 tracking-wider transition-all duration-300',
                        menu && 'translate-y-[-5px] opacity-0'
                    )}
                >
                    {title}
                </h1>
            ) : (
                pathname !== '/' && (
                    <>
                        <svg
                            onClick={back}
                            xmlns='http://www.w3.org/2000/svg'
                            height='24'
                            viewBox='0 -960 960 960'
                            className='flex h-full items-center justify-center fill-black p-2 text-3xl transition hover:-translate-x-1 hover:cursor-pointer active:scale-90 dark:fill-white'
                        >
                            <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
                        </svg>
                    </>
                )
            )}
        </div>
    )
}
