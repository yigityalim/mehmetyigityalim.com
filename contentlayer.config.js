import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import { rehypeNpmCommand } from './lib/rehype-npm-commands'
import path from 'path'
import { getHighlighter, loadTheme } from 'shiki'

/** @type {import('contentlayer/source-files').ComputedFields} */
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
        tags: {
            type: 'list',
            of: { type: 'string' },
            required: true,
        },
        readMinutes: {
            type: 'number',
            required: true,
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm, codeImport],
        rehypePlugins: [
            rehypeSlug,
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === 'element' && node?.tagName === 'pre') {
                        const [codeEl] = node.children
                        if (codeEl.tagName !== 'code') return

                        if (codeEl.data?.meta) {
                            const regex = /event="([^"]*)"/
                            const match = codeEl.data?.meta.match(regex)
                            if (match) {
                                node.__event__ = match ? match[1] : null
                                codeEl.data.meta = codeEl.data.meta.replace(regex, '')
                            }
                        }

                        node.__rawString__ = codeEl.children?.[0].value
                        node.__src__ = node.properties?.__src__
                        node.__style__ = node.properties?.__style__
                    }
                })
            },
            [
                rehypePrettyCode,
                {
                    getHighlighter: async () => {
                        const theme = await loadTheme(path.join(process.cwd(), '/lib/themes/dark.json'))
                        return await getHighlighter({ theme })
                    },
                    onVisitLine(node) {
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
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
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === 'element' && node?.tagName === 'div') {
                        if (!('data-rehype-pretty-code-fragment' in node.properties)) return

                        const preElement = node.children.at(-1)
                        preElement.properties['__language__'] = preElement.properties['data-language']
                        if (preElement.tagName !== 'pre') return

                        preElement.properties['__withMeta__'] = node.children.at(0).tagName === 'div'
                        preElement.properties['__rawString__'] = node.__rawString__

                        if (node.__src__) {
                            preElement.properties['__src__'] = node.__src__
                        }

                        if (node.__event__) {
                            preElement.properties['__event__'] = node.__event__
                        }

                        if (node.__style__) {
                            preElement.properties['__style__'] = node.__style__
                        }
                    }
                })
            },
            rehypeNpmCommand,
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
