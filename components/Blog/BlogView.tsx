'use client'
import React from 'react'
import { Separator } from 'components/ui/separator'
import { motion } from 'framer-motion'
import * as fns from 'date-fns'
import * as locale from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from 'components/Icon'
import { allPosts, Post } from 'contentlayer/generated'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from 'lib/utils'
import { Badge } from 'components/ui/badge'

export default function BlogView(): React.JSX.Element {
    const [blogs, setBlogs] = React.useState<Post[]>(allPosts)
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null)
    const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
    const [hasFilters, setHasFilters] = React.useState<boolean>(false)

    const handleClearFilters = React.useCallback(() => {
        setBlogs(allPosts)
        setSelectedTag(null)
        setHasFilters(false)
    }, [])

    const handleSort = React.useCallback(
        (sortFunction: (a: Post, b: Post) => number) => {
            if (selectedTag) handleClearFilters()
            setBlogs((prevstate) => [...prevstate].sort(sortFunction))
            setSelectedTag(null)
            setHasFilters(true)
        },
        [handleClearFilters, selectedTag]
    )

    const handleFilterByTag = React.useCallback(
        (tag: string) => {
            if (selectedTag === tag) {
                setSelectedTag(null)
                setBlogs(allPosts)
            } else {
                const filteredBlogs = allPosts.filter((post) => post.tags.includes(tag))
                setBlogs(filteredBlogs)
                setSelectedTag(tag)
            }
            setHasFilters(true)
        },
        [selectedTag]
    )

    return (
        <motion.div
            layout
            id='blog-container'
            className='flex w-full flex-col flex-wrap items-center justify-between gap-4 md:flex-row'
        >
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-start text-xl font-semibold'>Tüm Bloglar</h1>
                <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <span className='text-base font-semibold text-black/50 dark:text-white/50'>Sırala</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Sırala</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <button
                                className='w-full'
                                onClick={() =>
                                    handleSort((a, b) => fns.compareDesc(new Date(a.date), new Date(b.date)))
                                }
                            >
                                Tarihe Göre
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button
                                className='w-full'
                                onClick={() => handleSort((a, b) => a.readMinutes - b.readMinutes)}
                            >
                                Okuma Süresine Göre
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Filtrele</DropdownMenuLabel>
                        {allPosts
                            .reduce<string[]>((tags, post) => tags.concat(post.tags), [])
                            .filter((tag, index, self) => self.indexOf(tag) === index)
                            .map((tag) => (
                                <DropdownMenuItem key={tag} onClick={() => handleFilterByTag(tag)}>
                                    {tag}
                                </DropdownMenuItem>
                            ))}
                        {hasFilters && (
                            <DropdownMenuItem className='bg-red-500 dark:bg-red-700' onClick={handleClearFilters}>
                                Filtreyi Temizle
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {blogs.map(({ _id, title, tags, readMinutes, date, slug }, index) => (
                <React.Fragment key={_id}>
                    <motion.div
                        className={cn(
                            'relative flex w-full flex-col gap-y-2 overflow-hidden',
                            index !== blogs.length - 1 && 'md:border-b md:border-black/10'
                        )}
                        layoutId={_id}
                    >
                        <span className='absolute bottom-0 left-0 top-0 z-10 h-full w-0.5 rounded-full bg-black dark:bg-white' />
                        <div className='flex w-full flex-col justify-between gap-y-8 pl-4'>
                            <div className='flex w-full items-center justify-start gap-x-2'>
                                <div className='flex flex-col items-start justify-between gap-y-2'>
                                    <span className='text-lg font-bold italic lg:text-xl xl:text-2xl'>{title}</span>
                                    <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                                        {fns.formatDistance(new Date(date), new Date(), {
                                            addSuffix: true,
                                            locale: locale.tr,
                                        })}
                                    </span>
                                    <span className='text-sm text-black/30 dark:text-white/40 md:text-base'>
                                        {readMinutes > 60
                                            ? `${Math.floor(readMinutes / 60)} saat ${readMinutes % 60} dakika`
                                            : `${readMinutes} dakika` + ' okuma süresi'}
                                    </span>
                                    <div className='flex flex-row items-center justify-start gap-x-2'>
                                        {tags.map((tag) => (
                                            <Badge key={tag} variant='secondary'>
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between gap-y-2'>
                                <Link
                                    href={`/blog/${slug}`}
                                    className='flex h-full w-full flex-row items-center justify-between gap-x-2 rounded bg-black px-4 py-0.5 text-end text-white dark:bg-white dark:text-black'
                                >
                                    Blog&apos;a git
                                    <Icon name='arrow-right' className='h-4 w-4 fill-white dark:fill-black' />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                    {index !== allPosts.length - 1 && <Separator className='md:hidden' />}
                </React.Fragment>
            ))}
        </motion.div>
    )
}
