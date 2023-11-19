import React from 'react'
import { allPosts, type Post } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { Mdx } from 'components/MDX'

type BlogPageParams = Readonly<{
    params: {
        slug: string
    }
}>

export default function Page({ params }: BlogPageParams) {
    const post: Post | undefined = allPosts.find((post: Post) => post._raw.flattenedPath === params.slug)
    if (!post) notFound()
    return <Mdx {...post} />
}
