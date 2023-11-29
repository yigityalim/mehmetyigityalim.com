'use client'
import React from 'react'
import { Blog } from '@/lib/types/blog'
import { Spinner } from 'components/Spinner'
import BlogContiner from 'components/Containers/BlogContainer'
import { Separator } from 'components/ui/separator'
import { motion } from 'framer-motion'

type BlogViewProps = Readonly<{
    blogs: Blog[]
}>

export default function BlogView({ blogs }: BlogViewProps): React.JSX.Element {
    return (
        <motion.div
            layout
            id='blog-container'
            className='flex flex-col flex-wrap items-center justify-between gap-4 md:flex-row'
        >
            {blogs.map((blog, index) => (
                <React.Suspense fallback={<Spinner />} key={blog.id}>
                    <BlogContiner blog={blog} />
                    {index !== blogs.length - 1 && <Separator className='md:hidden' />}
                </React.Suspense>
            ))}
        </motion.div>
    )
}
