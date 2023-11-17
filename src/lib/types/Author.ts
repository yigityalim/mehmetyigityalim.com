import { Blog } from 'lib/types/blog'

type Author = {
    id: string
    name: string
    surname: string
    email: string
    age: number
    picture: Photo
    slug: string
    programmingLanguages: ProgrammingLanguage[]
    about: {
        raw: {
            children: {
                type: string
                children: {
                    text: string
                }[]
            }[]
        }
    }
    social: Social[]
    blogs: Blog[]
}
type ProgrammingLanguage = {
    id: string
    name: string
    color: { hex: string }
}

type Photo = {
    url: string
    width: number
    height: number
}

type Social = {
    id: string
    title: string
    url: string
}

export type { Author, ProgrammingLanguage, Photo, Social }
