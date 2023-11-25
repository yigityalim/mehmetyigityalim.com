import React from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import BlogView from 'components/Blog/BlogView'
import { allPosts, type Post } from 'contentlayer/generated'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'blog, bloglar, tüm bloglar',
}

export default function Page() {
    return <Container>blog anasayfa</Container>
}

function PostCard(post: Readonly<Post>) {
    return <Link href={post.url}>all posts {post.title}</Link>
}

//<BlogView blogs={blogs} />

/*

            {posts.map((post) => (
                <PostCard {...post} key={post._id} />
            ))}
 */
