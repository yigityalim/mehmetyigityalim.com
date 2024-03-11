'use client'
import React from 'react'
import { MotionLink } from '@/components/motion'
import { compareDesc, format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
import { AnimatePresence, motion } from 'framer-motion'
import { allPosts, type Post } from 'contentlayer/generated'
import { cn, formatDateTimeInMonths, formatReadMinute } from '@/lib/utils'
import Balancer from 'react-wrap-balancer'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import { Button } from 'components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'

export function BlogView(): React.JSX.Element {
    const [blogs, setBlogs] = React.useState<Post[]>(
        allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    )
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

    const [dateSortOrder, setDateSortOrder] = React.useState<'desc' | 'asc'>('desc')
    const [readMinutesSortOrder, setReadMinutesSortOrder] = React.useState<'desc' | 'asc'>('asc')

    /**
     * Filtreleri temizlemek için kullanılır.
     * @returns void
     */
    const handleClearFilters = React.useCallback<() => void>(() => {
        setBlogs(allPosts)
        setSelectedTag(null)
        setDateSortOrder('desc')
        setReadMinutesSortOrder('desc')
    }, [])

    /**
     * Tarihe göre blogları sıralamak için kullanılır.
     * @returns void
     */
    const handleSortByDate = React.useCallback<() => void>(() => {
        if (selectedTag) handleClearFilters()

        setBlogs((prevstate) =>
            [...prevstate].sort((a, b) => {
                const result = compareDesc(new Date(a.date), new Date(b.date))
                return dateSortOrder === 'desc' ? result : -result
            })
        )

        setSelectedTag(null)
        if (readMinutesSortOrder !== 'asc') setReadMinutesSortOrder('desc')
        setDateSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'))
    }, [handleClearFilters, selectedTag, dateSortOrder, readMinutesSortOrder])

    /**
     * Okuma süresine göre blogları sıralamak için kullanılır.
     * Okuma süresine göre sıralama yaparken, aynı ay içindeki blogları da okuma süresine göre sıralar.
     * @returns void
     */
    const handleSortByReadMinutes = React.useCallback<() => void>(() => {
        if (selectedTag) handleClearFilters()

        setBlogs((prevstate) => {
            const monthGroups: { [month: string]: Post[] } = {}
            prevstate.forEach((blog) => {
                const monthYear = new Date(blog.date).toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                })
                monthGroups[monthYear] = monthGroups[monthYear] || []
                monthGroups[monthYear].push(blog)
            })

            const sortedBlogs: Post[] = []
            const sortedMonths = Object.keys(monthGroups).sort()
            sortedMonths.forEach((monthYear) => {
                const sortedMonthBlogs = monthGroups[monthYear].sort((a, b) => {
                    const result = a.readMinutes - b.readMinutes
                    return readMinutesSortOrder === 'desc' ? result : -result
                })
                sortedBlogs.push(...sortedMonthBlogs)
            })
            return sortedBlogs
        })

        setSelectedTag(null)
        setDateSortOrder('desc')
        setReadMinutesSortOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'))
    }, [handleClearFilters, selectedTag, readMinutesSortOrder])

    /**
     * Etiketlere göre blogları filtrelemek için kullanılır.
     * @param tag - Filtrelenecek etiket
     * @param isPressed - Etiketin seçili olup olmadığını belirtir.
     * @returns void
     */
    const handleFilterByTag = React.useCallback<(tag: string, isPressed: boolean) => void>(
        (tag: string, isPressed: boolean) => {
            if (selectedTag === tag) {
                handleClearFilters()
            } else {
                if (isPressed) {
                    const filteredBlogs = allPosts.filter((post) => post.tags.includes(tag))
                    setBlogs(filteredBlogs)
                    setSelectedTag(tag)
                    setDateSortOrder('desc')
                    setReadMinutesSortOrder('desc')
                } else {
                    handleClearFilters()
                }
            }
        },
        [selectedTag, handleClearFilters]
    )

    /**
     * Blogları tarihe göre gruplayıp, her bir ay için ayrı bir array içinde tutuyoruz.
     */
    const groupedBlogs = React.useMemo(() => {
        return blogs.reduce(
            (acc, blog) => {
                const monthYear = format(parseISO(blog.date), 'MMMM yyyy', { locale: tr })
                acc[monthYear] = acc[monthYear] || []
                acc[monthYear].push(blog)
                return acc
            },
            {} as { [month: string]: Post[] }
        )
    }, [blogs])

    /**
     * Filtrelerin temizlenip temizlenmeyeceğini belirler.
     * @returns boolean
     */
    const shouldShowClearFiltersButton = React.useMemo<boolean>(() => {
        /** FIXME: Bu kısmı daha iyi bir şekilde optimize etmek gerekiyor. */
        return false // selectedTag !== null || dateSortOrder !== 'desc' || readMinutesSortOrder !== 'desc';
    }, []) //selectedTag, dateSortOrder, readMinutesSortOrder

    return (
        <AnimatePresence initial={false} mode='wait'>
            <motion.div
                layout
                id='blog-container'
                transition={{ staggerChildren: 0.1 }}
                className='flex w-full flex-col items-center gap-4'
            >
                <div className='flex w-full items-center justify-between'>
                    <h1 className='text-start text-xl font-semibold'>Tüm Bloglar</h1>
                    <Sheet>
                        <SheetTrigger asChild>
                            <span className='text-xl font-bold text-opacity-60'>Sırala</span>
                        </SheetTrigger>
                        <SheetContent side='right' className='z-[201] flex flex-col items-center justify-between'>
                            <SheetHeader className='w-full'>
                                <SheetTitle className='w-full text-left text-2xl font-bold'>Sırala</SheetTitle>
                                <Alert className='w-full' variant='destructive'>
                                    <AlertTitle>Uyarı!</AlertTitle>
                                    <AlertDescription>Bu özellik şu an geliştirme aşamasındadır.</AlertDescription>
                                </Alert>
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
                            <SheetTitle className='w-full text-start text-2xl font-bold'>Filtrele</SheetTitle>
                            <ScrollArea className='flex-1'>
                                {allPosts
                                    .reduce<string[]>((tags, post) => tags.concat(post.tags), [])
                                    .filter((tag, index, self) => self.indexOf(tag) === index)
                                    .map((tag) => (
                                        <Toggle
                                            key={tag}
                                            onPressedChange={(isPressed) => handleFilterByTag(tag, isPressed)}
                                            className='w-full cursor-pointer justify-start px-2 py-1 font-semibold capitalize italic' //text-blue-500 data-[state=on]:bg-blue-400 data-[state=on]:text-white dark:text-blue-400 dark:data-[state=on]:bg-blue-500 dark:data-[state=on]:text-white
                                        >
                                            {tag}
                                        </Toggle>
                                    ))}
                                <ScrollBar />
                            </ScrollArea>
                            {shouldShowClearFiltersButton && (
                                <SheetFooter className='mt-auto w-full'>
                                    <Button
                                        onClick={handleClearFilters}
                                        className='w-full'
                                        variant='destructive'
                                        size='sm'
                                    >
                                        Filtreleri Temizle
                                    </Button>
                                </SheetFooter>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='flex w-full flex-col items-center justify-center gap-y-8'>
                    {Object.entries(groupedBlogs).map(([monthYear, posts]) => (
                        <div key={monthYear} className='flex w-full flex-col items-start justify-start gap-y-4'>
                            <h2 className='text-2xl font-semibold italic'>{monthYear}</h2>
                            <span className='h-px w-full bg-black dark:bg-white' />
                            <div className='flex w-full flex-col items-start justify-start gap-y-4'>
                                {posts.map((post) => (
                                    <React.Fragment key={post._id}>
                                        <Blog blog={post} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

function Blog({ blog: { _id, slug, title, readMinutes, date, tags } }: { blog: Post }) {
    return (
        <MotionLink
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            href={`/blog${slug}`}
            className={cn(
                'relative flex w-full flex-col gap-y-2 overflow-hidden rounded-lg bg-gray-100 p-4 dark:bg-zinc-900'
            )}
            layoutId={_id}
        >
            <div className='flex w-full flex-col justify-between gap-y-8'>
                <div className='flex w-full items-center justify-start gap-x-2'>
                    <div className='flex flex-col items-start justify-between gap-y-2'>
                        <span className='text-2xl font-bold italic'>
                            <Balancer>{title}</Balancer>
                        </span>
                        <span className='text-sm text-black/50 dark:text-white/40 md:text-base'>
                            {formatDateTimeInMonths(date)}
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
