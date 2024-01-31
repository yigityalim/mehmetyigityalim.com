import { Author, Photo } from '@/lib/types/Author'

type Blog = {
    content: string
    createdAt: string
    datePublished: string
    id: string
    coverPhoto: Photo
    publishedAt: string
    readTime: string
    slug: string
    title: string
    updatedAt: string
    author: Author
}

type Blogs = Array<Blog>

export type { Blog, Blogs }
