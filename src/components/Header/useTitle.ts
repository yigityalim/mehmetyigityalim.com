'use client'
import { usePathname } from 'next/navigation'
import useMenu, { Menu } from '@/utils/menu'
import menu from '@/utils/menu'

export default function useTitle() {
    const pathname: string = usePathname()
    const handleSubMenu = () => {
        const pathParts = pathname.split('/').filter(Boolean)
        const isParentRoute = menu.find((item: Menu) => item.path === pathname)
        const isSubRoute = pathParts.length > 1 && menu.find((item: Menu) => item.path === `/${pathParts[0]}`)

        if (isSubRoute) {
            return true
        } else if (isParentRoute) {
            return false
        } else {
            return false
        }
    }

    const handleTitle = () => {
        const isParentRoute = menu.find((item: Menu) => item.path === pathname)
        if (isParentRoute) {
            return isParentRoute.title
        }
        return menu.find((item: Menu) => item.path === pathname.split('/')[1])?.title
    }

    return {
        pathname,
        isSub: handleSubMenu(),
        title: handleTitle(),
    }
}
