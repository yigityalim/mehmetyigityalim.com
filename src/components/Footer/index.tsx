'use client'
import React from 'react'
import { cn } from '@/utils'
import useTitle from 'components/Header/useTitle'
import Link from 'next/link'
import ThemeSwitcher from 'components/ThemeSwitch'
import menu from 'lib/menu'

export default function Footer(): React.JSX.Element {
    const { pathname, title } = useTitle()
    return (
        <footer
            className={cn(
                'container mx-auto flex w-full flex-col items-center justify-center gap-y-4 p-8 md:p-10 lg:p-12 xl:p-16'
            )}
        >
            {title && pathname !== '/' && (
                <h1 className='w-full text-start text-2xl font-bold leading-9 tracking-wider transition-all duration-300'>
                    {title}
                </h1>
            )}
            <div className='flex w-full flex-col items-center justify-center gap-y-4'>
                {menu.map((m) => (
                    <Link
                        href={m.path}
                        className={cn(
                            'w-full rounded px-4 text-start text-xl font-bold leading-9 tracking-wider transition-all duration-300',
                            pathname === m.path
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'bg-white text-black shadow-md dark:bg-black dark:text-white dark:shadow-2xl'
                            // FIXME - border kaldırılabilir. şimdilik itemler belli olsun diye ekledim
                        )}
                        key={m.name}
                    >
                        {m.title}
                    </Link>
                ))}
            </div>
            <ThemeSwitcher as='button' fullWidth />
            <div className='flex w-full flex-col text-center'>
                &copy; {new Date().getFullYear()} Mehmet Yiğit Yalım. <br /> Tüm hakları saklıdır.
            </div>
        </footer>
    )
}
