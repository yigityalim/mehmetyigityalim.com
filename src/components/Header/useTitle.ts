'use client'
import { usePathname } from 'next/navigation'
import menu, { Menu } from 'lib/menu'

export default function useTitle() {
    const pathname: string = usePathname()
    const handleTitle = () => {
        const isParentRoute = menu.find((item: Menu) => item.path === pathname)
        if (isParentRoute) {
            return isParentRoute.title
        }
        return menu.find((item: Menu) => item.path === pathname.split('/')[1])?.title
    }

    return {
        pathname,
        title: handleTitle(),
    }
}
