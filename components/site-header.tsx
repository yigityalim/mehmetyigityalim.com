'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useMenu } from '@/store/menu'
import { useIsIntro } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import type { Menu } from '@/lib/menu'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme-switch'
import { Balancer } from '@/components/balancer'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

import { allPosts } from 'contentlayer/generated'

function ToggleMenu(): React.JSX.Element {
    const pathname = usePathname()
    const splitted = pathname.split('/')
    const menu = useMenu((state) => state.isOpen)
    const setMenu = useMenu((state) => state.set)
    const router = useRouter()
    const isIntro = useIsIntro()
    const classNames: string = cn('h-0.5 w-2/3 bg-white transition-all duration-300 transform')

    const onClick = React.useCallback(() => {
        setMenu(!menu)
    }, [menu, setMenu])

    if (isIntro) return <React.Fragment />

    return (
        <div
            className={cn(
                'fixed left-8 right-8 top-8 z-[200] flex items-center justify-between gap-x-2 md:container md:mx-auto md:max-w-xl',
                !menu && 'mix-blend-difference'
            )}
        >
            <div className={cn('flex h-full w-full items-center gap-x-4 transition', menu && 'opacity-0')}>
                {!!splitted[2] ? (
                    <ArrowLeft
                        className='stroke-white'
                        onClick={() => {
                            router.back()
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    />
                ) : (
                    <React.Fragment />
                )}
            </div>
            <Button variant='link' size='icon' onClick={onClick} className='z-[201]'>
                <div className='flex h-full w-full flex-col items-center justify-center gap-y-2'>
                    <span className={cn(classNames, menu && 'translate-y-[5px] rotate-45')} />
                    <span className={cn(classNames, menu && '-translate-y-[5px] -rotate-45')} />
                </div>
            </Button>
        </div>
    )
}

function OverlayMenu(): React.JSX.Element {
    const menu = useMenu((state) => state.menu)
    const [menuStack, setMenuStack] = React.useState([menu])
    const [isGoingForward, setIsGoingForward] = React.useState<boolean>(false)
    const isOpen = useMenu((state) => state.isOpen)
    const setMenu = useMenu((state) => state.set)

    const handleMenuClick = React.useCallback(
        ({ children }: Menu) => {
            if (children && children.length > 0) {
                setIsGoingForward(true)
                setMenuStack([...menuStack, children])
            }
        },
        [menuStack, setIsGoingForward]
    )

    const closeMenu = React.useCallback(() => {
        setMenu(false)
        setIsGoingForward(false)
        setMenuStack([menu])
    }, [setMenu, menu])

    const goBack = React.useCallback(() => {
        if (menuStack.length > 1) {
            setIsGoingForward(false)
            setMenuStack((prevState) => prevState.slice(0, -1))
        }
    }, [menuStack.length, setMenuStack, setIsGoingForward])

    const currentMenu = React.useMemo(() => menuStack[menuStack.length - 1], [menuStack])
    const isChild = React.useMemo(() => menuStack.length > 1, [menuStack])

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    layout
                    key='overlay-menu'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        'fixed inset-0 z-[52] flex flex-col items-center justify-start gap-y-4 p-8 md:container md:mx-auto md:max-w-xl',
                        isOpen &&
                            'bg-white bg-opacity-40 saturate-100 backdrop-blur-lg dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-lg'
                    )}
                >
                    <div className='flex h-full w-full flex-col items-center justify-start gap-y-4 overflow-y-auto pt-24'>
                        <ScrollArea className='h-auto w-full'>
                            <motion.div className='flex h-full w-full flex-col items-center justify-center gap-y-4'>
                                {currentMenu.map((item) => (
                                    <MenuItem
                                        key={item.path + item.title}
                                        item={item}
                                        closeMenu={closeMenu}
                                        isGoingForward={isGoingForward}
                                        handleMenuClick={handleMenuClick}
                                        isChild={isChild}
                                    />
                                ))}
                            </motion.div>
                        </ScrollArea>
                        {menuStack.length > 1 && (
                            <Button
                                variant='link'
                                size='icon'
                                onClick={goBack}
                                className='mt-auto flex w-full items-center justify-start gap-x-6 p-2'
                            >
                                <ArrowLeft className='stroke-black dark:stroke-white' />
                                Geri Dön
                            </Button>
                        )}
                    </div>
                    <div className='mt-auto flex w-full flex-row items-center justify-center gap-x-2'>
                        <ThemeSwitcher as='select' fullWidth className='z-[100] w-full' />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

interface MenuItemProps {
    item: Menu
    isGoingForward: boolean
    closeMenu: () => void
    handleMenuClick: (item: Menu) => void
    isChild: boolean
}

function MenuItem({
    item,
    isGoingForward,
    closeMenu,
    handleMenuClick,
    isChild,
}: Readonly<MenuItemProps>): React.JSX.Element {
    const currentPath = usePathname()
    const isCurrentPath =
        item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path) && currentPath !== item.path

    const post = allPosts.find((post) => post.slug === item.name) ?? null

    return (
        <motion.div
            initial={{ opacity: 0, x: isGoingForward ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isGoingForward ? 30 : -30 }}
            transition={{ duration: 0.2, staggerChildren: 0.1 }}
            className={cn(
                'z-[53] flex w-full flex-row items-center justify-between gap-x-2 rounded',
                isCurrentPath && 'bg-white dark:border dark:border-black/30 dark:bg-zinc-800 dark:shadow-lg'
            )}
        >
            <Link
                href={item.path}
                className={cn(
                    'flex w-full flex-row items-center justify-between gap-x-2 p-2 text-3xl font-bold',
                    isChild && 'text-2xl'
                )}
                onClick={closeMenu}
            >
                <Balancer>{item.title}</Balancer>
                <div className='flew-wrap flex items-center justify-end gap-2'>
                    {post && post.tags.slice(0, 1).map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
            </Link>
            {item.children && (
                <div className='flex h-full w-full items-center justify-end p-2' onClick={() => handleMenuClick(item)}>
                    <ArrowRight className='' size={24} />
                </div>
            )}
        </motion.div>
    )
}

export function Header() {
    return (
        <>
            <ToggleMenu />
            <OverlayMenu />
        </>
    )
}
