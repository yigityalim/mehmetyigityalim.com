'use client'
import { usePathname } from 'next/navigation'
import menu, { Menu } from '@/src/lib/menu'

export default function useTitle(): {
    pathname: string
    title: string | null
} {
    const pathname: string = usePathname()
    const handleTitle: () => string | null = (): string | null => {
        const menuEntry: Menu | undefined = menu.find(({ path }: Menu): boolean => {
            if (path === '/blog' || pathname.startsWith('/blog/')) {
                return true
            }
            return path === pathname
        })
        if (menuEntry) return menuEntry.title
        return null
    }

    return {
        pathname,
        title: handleTitle(),
    }
}
