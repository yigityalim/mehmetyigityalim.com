'use client'
import React from 'react'
import { cn } from '@/utils'
import useTitle from 'components/Header/useTitle'
import Link from 'next/link'
import ThemeSwitcher from 'components/ThemeSwitch'
import menu from 'lib/menu'
import { usePathname } from 'next/navigation'

export default function Footer(): React.JSX.Element {
    const { title } = useTitle()
    const pathname = usePathname()

    return (
        <footer
            className={cn(
                'container mx-auto flex w-full flex-col items-center justify-center gap-y-4 p-8 md:p-10 lg:p-12 xl:p-16'
            )}
        >
            {title && pathname !== '/' ? (
                <div className='flex w-full flex-row items-center justify-between gap-x-2'>
                    <span className='block h-px w-full bg-white/40' />
                    <h1 className='w-full text-center text-2xl font-bold leading-9 tracking-wider transition-all duration-300'>
                        {title}
                    </h1>
                    <span className='block h-px w-full bg-white/40' />
                </div>
            ) : (
                <span className='block h-px w-full bg-white/40' />
            )}
            {/* <ThemeSwitcher as='button' fullWidth /> */}
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

/*
<div className='flex w-full flex-col items-center justify-center gap-y-4'>
                {menu.map(({ path, icon, title }) => (
                    <div key={path} className='w-full'>
                        <Link
                            href={path}
                            className={cn(
                                'block w-full rounded px-4 text-start text-xl font-bold leading-9 tracking-wider transition-all duration-300',
                                (path === pathname || path.split('/')[1] === pathname.split('/')[1]) &&
                                    'bg-highlight dark:bg-wash-dark'
                            )}
                        >
                            {icon}
                            <span>{title}</span>
                        </Link>
                    </div>
                ))}
            </div>
 */
