import { gql } from 'graphql-request'

export const ALL_BLOGS = gql`
    {
        blogs {
            id
            title
            slug
            coverPhoto {
                url
                width
                height
            }
            content {
                raw
            }
            postColor {
                hex
            }
            datePublished

            author {
                id
                name
                surname
                email
                age

                programmingLanguages {
                    id
                    name
                    color {
                        hex
                    }
                }
                picture {
                    url
                    width
                    height
                }
                slug
                about {
                    raw
                }
            }
        }
    }
`

export const BLOG_BY_SLUG = gql`
    query BlogsBySlug($slug: String!) {
        blog(where: { slug: $slug }) {
            title
            slug
            coverPhoto {
                url
                width
                height
            }
            content {
                raw
            }
            postColor {
                hex
            }
            datePublished
            author {
                id
                name
                surname
                email
                age
                programmingLanguages {
                    id
                    name
                    color {
                        hex
                    }
                }
                picture {
                    url
                    width
                    height
                }
                slug
                about {
                    raw
                }
            }
        }
    }
`

export const AUTHORS_BY_SLUG = gql`
    query AuthorBySlug($slug: String!) {
        author(where: { slug: $slug }) {
            id
            name
            surname
            email
            age
            programmingLanguages {
                id
                name
                color {
                    hex
                }
            }
            picture {
                url
                width
                height
            }
            slug
            about {
                raw
            }
            createdBy {
                id
            }
            blogs {
                id
                title
                slug
                coverPhoto {
                    url
                    width
                    height
                }
                postColor {
                    hex
                }
            }
            social {
                id
                title
                url
            }
        }
    }
`

export const ALL_AUTHORS = gql`
    {
        authors {
            id
            name
            surname
            email
            age
            programmingLanguages {
                id
                name
                color {
                    hex
                }
            }
            picture {
                url
                width
                height
            }
            slug
            about {
                raw
            }
            createdBy {
                id
            }
            blogs {
                id
                title
                slug
                coverPhoto {
                    url
                    width
                    height
                }
                postColor {
                    hex
                }
            }
            social {
                id
                title
                url
            }
        }
    }
`
