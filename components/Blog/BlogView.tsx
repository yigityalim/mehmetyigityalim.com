'use client'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { MotionLink } from '@/components/motion'
import { formatDistance, compareDesc } from 'date-fns'
import { tr } from 'date-fns/locale'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { motion, useInView } from 'framer-motion'
import { allPosts } from 'contentlayer/generated'
import type { Post } from 'contentlayer/generated'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn, formatReadMinute } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import Balancer from 'react-wrap-balancer'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'

export default function BlogView(): React.JSX.Element {
    const [blogs, setBlogs] = React.useState<Post[]>(
        allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    )
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

    const [dateSortOrder, setDateSortOrder] = React.useState<'desc' | 'asc'>('desc')
    const [readMinutesSortOrder, setReadMinutesSortOrder] = React.useState<'desc' | 'asc'>('asc')

    const handleClearFilters = React.useCallback(() => {
        setBlogs(allPosts)
        setSelectedTag(null)
        setDateSortOrder('desc')
        setReadMinutesSortOrder('desc')
    }, [])

    const handleSortByDate = React.useCallback(() => {
        if (selectedTag) handleClearFilters()

        setBlogs((prevstate) =>
            [...prevstate].sort((a, b) => {
                const result = compareDesc(new Date(a.date), new Date(b.date))
                return dateSortOrder === 'desc' ? result : -result
            })
        )

        setSelectedTag(null)
        setDateSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'))
    }, [handleClearFilters, selectedTag, dateSortOrder])

    const handleSortByReadMinutes = React.useCallback(() => {
        if (selectedTag) handleClearFilters()

        setBlogs((prevstate) =>
            [...prevstate].sort((a, b) => {
                const result = a.readMinutes - b.readMinutes
                return readMinutesSortOrder === 'desc' ? result : -result
            })
        )

        setSelectedTag(null)
        setReadMinutesSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'))
    }, [handleClearFilters, selectedTag, readMinutesSortOrder])

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
        },
        [selectedTag]
    )

    return (
        <motion.div
            layout
            id='blog-container'
            transition={{ staggerChildren: 0.1 }}
            className='flex w-full flex-col flex-wrap items-center justify-between gap-4 md:flex-row'
        >
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-start text-xl font-semibold'>Tüm Bloglar</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <span className='text-xl font-bold text-opacity-60'>Sırala</span>
                    </SheetTrigger>
                    <SheetContent side='right' className='z-[201]'>
                        <SheetHeader>
                            <SheetTitle className='text-left text-2xl font-bold'>Sırala</SheetTitle>
                        </SheetHeader>
                        <div className='my-4 flex w-full flex-col items-center justify-center gap-y-2'>
                            <Toggle
                                className='w-full hover:bg-inherit focus:outline-none'
                                variant='outline'
                                onClick={handleSortByReadMinutes}
                                size='sm'
                            >
                                Okuma Süresine Göre {readMinutesSortOrder === 'desc' ? 'Azalan' : 'Artan'}
                            </Toggle>
                            <Toggle
                                className='w-full hover:bg-inherit focus:outline-none'
                                variant='outline'
                                onClick={handleSortByDate}
                                size='sm'
                            >
                                Tarihe Göre {dateSortOrder === 'desc' ? 'Azalan' : 'Artan'}
                            </Toggle>
                        </div>
                        <Separator />
                        <SheetTitle className='my-4 text-2xl font-bold'>Filtrele</SheetTitle>
                        <ScrollArea>
                            {allPosts
                                .reduce<string[]>((tags, post) => tags.concat(post.tags), [])
                                .filter((tag, index, self) => self.indexOf(tag) === index)
                                .map((tag) => (
                                    <Toggle
                                        key={tag}
                                        onClick={() => handleFilterByTag(tag)}
                                        className='w-full cursor-pointer justify-start px-2 py-1 font-semibold capitalize italic' //text-blue-500 data-[state=on]:bg-blue-400 data-[state=on]:text-white dark:text-blue-400 dark:data-[state=on]:bg-blue-500 dark:data-[state=on]:text-white
                                    >
                                        {tag}
                                    </Toggle>
                                ))}
                            <ScrollBar />
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
            {blogs.map((blog, index) => (
                <React.Fragment key={blog._id}>
                    <Blog blog={blog} />
                    {index !== allPosts.length - 1 && <Separator key={`separator-${index}`} className='md:hidden' />}
                </React.Fragment>
            ))}
        </motion.div>
    )
}

function Blog({ blog: { _id, slug, title, readMinutes, date, tags } }: { blog: Post }): React.JSX.Element {
    const ref = React.useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { amount: 0.8 })
    return (
        <MotionLink
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 20 }}
            href={`/blog${slug}`}
            className={cn('relative flex w-full flex-col gap-y-2 overflow-hidden')}
            layoutId={_id}
        >
            <span className='absolute bottom-0 left-0 top-0 z-10 h-full w-0.5 rounded-full bg-black dark:bg-white' />
            <div className='flex w-full flex-col justify-between gap-y-8 pl-4'>
                <div className='flex w-full items-center justify-start gap-x-2'>
                    <div className='flex flex-col items-start justify-between gap-y-2'>
                        <span className='text-lg font-bold italic lg:text-xl xl:text-2xl'>
                            <Balancer>{title}</Balancer>
                        </span>
                        <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                            {formatDistance(new Date(date), new Date(), {
                                addSuffix: true,
                                locale: tr,
                            })}
                        </span>
                        <span className='text-sm text-black/30 dark:text-white/40 md:text-base'>
                            {formatReadMinute(readMinutes)}
                        </span>
                        <div className='flex flex-row items-center justify-start gap-x-2'>
                            {tags.map((tag: string) => (
                                <Badge key={tag} variant='secondary'>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MotionLink>
    )
}
