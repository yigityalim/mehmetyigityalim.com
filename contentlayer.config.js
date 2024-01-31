import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
}

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        published: {
            type: 'boolean',
            default: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        coverImage: {
            type: 'string',
            required: true,
        },
        readMinutes: {
            type: 'number',
            required: true,
        },
        author: {
            type: 'nested',
            of: Author,
            required: true,
        },
    },
    computedFields,
}))

export const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        name: {
            type: 'string',
            required: true,
        },
        avatar: {
            type: 'string',
            required: true,
        },
    },
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    cssClasses: ['rehype-pretty-code'],
                    onVisitLine(node) {
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: '' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted']
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    },
})
