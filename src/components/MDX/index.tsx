import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { cn } from '@/utils'
import Container from 'components/Containers'
import { Post } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'

const components = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className={cn('mt-2 w-full scroll-m-20 text-4xl font-bold tracking-tight', className)} {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                'mt-10 w-full scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className={cn('mt-8 w-full scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className={cn('mt-8 w-full scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className={cn('mt-8 w-full scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className={cn('mt-8 w-full scroll-m-20 text-base font-semibold tracking-tight', className)} {...props} />
    ),
    a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className={cn('w-full leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn('my-6 w-full pl-4', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn('my-6 ml-6 w-full', className)} {...props} />
    ),
    li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
        <li className={cn('w-full leading-7 [&:not(:first-child)]:mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className={cn('[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic', className)} {...props} />
    ),
    hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className={cn('my-4 md:my-8', className)} {...props} />
    ),
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <table className={cn('overlow-y-auto my-6 w-full', className)} {...props} />
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
    td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
                className
            )}
            {...props}
        />
    ),
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className={cn('w-full overflow-x-auto rounded-md', className)} {...props} />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code className={cn('font mono relative rounded px-[0.3rem] py-[0.2rem] text-sm', className)} {...props} />
    ),
}

type MdxProps = Readonly<Post>

export function Mdx(post: MdxProps) {
    const MDXComponent = useMDXComponent(post.body.code)
    return (
        <Container className='mdx gap-y-4'>
            {post.title && <h1 className='text-4xl font-bold italic'>{post.title}</h1>}
            {post.description && <p className='text-xl'>{post.description}</p>}
            {post.date && (
                <time dateTime={post.date} className='mb-2 block text-lg text-gray-600'>
                    {format(parseISO(post.date), 'LLLL d, yyyy', { locale: tr })}
                </time>
            )}
            <MDXComponent components={components} />
        </Container>
    )
}
