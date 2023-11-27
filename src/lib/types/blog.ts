import { Author, Photo } from 'lib/types/Author'

type Blog = {
    id: string
    title: string
    slug: string
    coverPhoto: Photo
    content: {
        raw: {
            children: {
                type: string
                children: {
                    text: string
                }[]
            }[]
        }
    }
    postColor: { hex: string }
    datePublished: string
    author: Author
}

type Blogs = Array<Blog>

export type { Blog, Blogs }
