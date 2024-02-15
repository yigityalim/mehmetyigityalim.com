'use client'
import React from 'react'
import { cn } from 'lib/utils'
import ThemeSwitcher from 'components/ThemeSwitch'

export default function Footer(): React.JSX.Element {
    return (
        <footer
            className={cn(
                'flex w-full flex-col items-center justify-center gap-y-4 p-8 md:container md:mx-auto md:max-w-xl md:p-10 lg:p-12 xl:p-16'
            )}
        >
            <span className='block h-px w-full bg-black/40 dark:bg-white/40' />
            <ThemeSwitcher as='button' fullWidth />
            <div className='flex w-full flex-col text-center'>
                &copy; {new Date().getFullYear()}{' '}
                <a href='https://instagram.com/yigityalim' target='_blank' rel='noreferrer'>
                    Mehmet Yiğit Yalım
                </a>
                Tüm hakları saklıdır.
            </div>
        </footer>
    )
}
