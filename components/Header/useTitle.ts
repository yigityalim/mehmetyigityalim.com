'use client'
import { usePathname } from 'next/navigation'
import menu, { Menu } from 'lib/menu'
import { type Maybe } from '@/lib/types'

type Return = {
    pathname: string[],
    isSub: () => boolean,
    title: Maybe<string>
}

export default function useTitle(): Return {
    const pathname = usePathname().split('/')
    const handleTitle = () => {
        if (pathname[3]) return pathname[3]
        return menu.find((item: Menu) => item.name === pathname[2])?.title
    }

    const isSub = () => !!pathname[3];

    return {
        pathname,
        isSub,
        title: handleTitle(),
    }
}
