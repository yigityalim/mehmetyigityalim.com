import React, { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Spinner } from 'components/Spinner'
import Image from 'next/image'
import { Callout } from 'components/MDX/Callout'
import { MdxCard } from 'components/MDX/MdxCard'
import { cn } from '@/utils'
import { BUNDLED_LANGUAGES, getHighlighter, type HighlighterOptions } from 'shiki'
import oneDarkPro from 'shiki/themes/one-dark-pro.json'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

type MdxProps = Readonly<{ source: MDXRemoteProps['source'] }>

export default function Mdx({ source }: MdxProps): React.JSX.Element {
    return (
        <Suspense fallback={<Spinner />}>
            <div className={cn('h-full w-full')}>
                <MDXRemote
                    source={source}
                    components={components}
                    options={{
                        parseFrontmatter: true,
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                [
                                    rehypePrettyCode,
                                    {
                                        keepBackground: false,
                                        theme: oneDarkPro,
                                        getHighlighter: (options: HighlighterOptions) =>
                                            getHighlighter({
                                                ...options,
                                                paths: {
                                                    themes: 'https://cdn.jsdelivr.net/npm/shiki@latest/themes',
                                                    wasm: 'https://cdn.jsdelivr.net/npm/shiki@latest/dist',
                                                },
                                                langs: [...BUNDLED_LANGUAGES],
                                            }),
                                    },
                                ],
                            ],
                        },
                    }}
                />
            </div>
        </Suspense>
    )
}
const components = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight', className)} {...props}>
            {props.children}
        </h1>
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        >
            {props.children}
        </h2>
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className={cn('mt-8 scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props}>
            {props.children}
        </h3>
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props}>
            {props.children}
        </h4>
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props}>
            {props.children}
        </h5>
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)} {...props}>
            {props.children}
        </h6>
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
        <a className={cn('font-medium underline underline-offset-4', className)} {...props}>
            {props.children}
        </a>
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className={cn('leading-7 [&:not(:first-child)]:mt-2', className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className={cn('[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic', className)} {...props} />
    ),
    img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={cn('overflow-hidden object-cover object-center', className)} alt={alt} {...props} />
    ),
    hr: ({ ...props }) => <hr className='my-4 md:my-8' {...props} />,
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className='my-6 w-full overflow-y-auto'>
            <table className={cn('w-full', className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className={cn('even:bg-muted m-0 border-t p-0', className)} {...props} />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
                'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
                className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
                className
            )}
            {...props}
        />
    ),
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className={cn('mb-4 mt-6 max-w-full overflow-x-auto break-words rounded-sm bg-black p-4', className)}
            {...props}
        />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code className={cn('relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm', className)} {...props} />
    ),
    Image,
    Callout,
    Card: MdxCard,
}
