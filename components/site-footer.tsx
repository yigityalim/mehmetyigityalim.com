'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from '@/components/theme-switch'

export function Footer(): React.JSX.Element {
    return (
        <footer
            className={cn(
                'flex w-full flex-col items-center justify-center gap-y-4 p-8 md:container md:mx-auto md:max-w-xl'
            )}
        >
            <span className='block h-px w-full bg-black/40 dark:bg-white/40' />
            <h1 className='w-full text-start text-3xl font-bold italic'>Mehmet Yiğit Yalım</h1>
            <div className='flex w-full flex-col text-start text-xs font-semibold'>
                &copy; {new Date().getFullYear()} Tüm hakları saklıdır.
            </div>
            <ThemeSwitcher as='select' fullWidth />
        </footer>
    )
}
