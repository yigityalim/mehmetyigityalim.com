import React, { useEffect, useState } from 'react'
import { Laptop2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

function SkeletonLoader({ fullWidth }: Readonly<{ fullWidth?: boolean }>) {
    return (
        <Skeleton className={cn('flex flex-row items-center justify-center gap-x-2', fullWidth && 'w-full')}>
            {fullWidth ? (
                <>
                    <Skeleton className='h-10 w-full rounded-full' />
                    <Skeleton className='h-10 w-full rounded-full' />
                    <Skeleton className='h-10 w-full rounded-full' />
                </>
            ) : (
                <>
                    <Skeleton className='h-6 w-6 rounded-full' />
                    <Skeleton className='h-6 w-6 rounded-full' />
                    <Skeleton className='h-6 w-6 rounded-full' />
                </>
            )}
        </Skeleton>
    )
}

function ThemeButtons({
    theme,
    setTheme,
    fullWidth,
}: Readonly<{
    theme: string | undefined
    setTheme: (theme: string) => void
    fullWidth?: boolean
}>) {
    if (!theme) {
        return <SkeletonLoader fullWidth={fullWidth} />
    }

    return (
        <div className={cn('flex flex-row items-center justify-center gap-x-2', fullWidth && 'w-full')}>
            <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size='icon'
                className={cn(fullWidth && 'w-full')}
                onClick={() => setTheme('light')}
            >
                <Sun className='h-[1.2rem] w-[1.2rem]' />
            </Button>
            <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className={cn(fullWidth && 'w-full')}
                size='icon'
                onClick={() => setTheme('dark')}
            >
                <Moon className='h-[1.2rem] w-[1.2rem]' />
            </Button>
            <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                className={cn(fullWidth && 'w-full')}
                size='icon'
                onClick={() => setTheme('system')}
            >
                <Laptop2 className='h-[1.2rem] w-[1.2rem]' />
            </Button>
        </div>
    )
}

type Props = Readonly<{
    as?: 'button' | 'dropdown' | 'select'
    fullWidth?: boolean
    className?: string
}>

const selectTexts = {
    light: 'Açık',
    dark: 'Koyu',
    system: 'Sistem',
}

function ThemeSwitcher({ as = 'dropdown', fullWidth, className }: Props): React.JSX.Element | null {
    const { theme, themes, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted && as === 'button') return <SkeletonLoader fullWidth={fullWidth} />
    if (!mounted && as === 'dropdown')
        return (
            <Skeleton className={cn(className)}>
                <Skeleton className='h-10 w-10 rounded-md' />
            </Skeleton>
        )
    if (as === 'button') return <ThemeButtons theme={theme} setTheme={setTheme} fullWidth={fullWidth} />

    if (as === 'select')
        return (
            <Select defaultValue='system' value={theme} onValueChange={(theme) => setTheme(theme)}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder={theme ? theme : 'Tema Seçiniz'} />
                </SelectTrigger>
                <SelectContent>
                    {themes.map((theme) => (
                        <SelectItem value={theme} key={theme}>
                            {selectTexts[theme as keyof typeof selectTexts]}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                    <span className='sr-only'>Temayı Değiştir</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className={cn(className)}>
                <DropdownMenuItem onClick={() => setTheme('light')}>Açık</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Koyu</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>Sistem</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { ThemeSwitcher }
