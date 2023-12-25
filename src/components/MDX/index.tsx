import React, { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { Spinner } from 'components/Spinner'

type MdxProps = Readonly<{ source: MDXRemoteProps['source'] }>

export default function Mdx({ source }: MdxProps): React.JSX.Element {
    return (
        <Suspense fallback={<Spinner />}>
            <MDXRemote source={source} components={components} />
        </Suspense>
    )
}

export const components = {
    h1: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl' {...props} />
    ),
    h2: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0' {...props} />
    ),
    h3: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight' {...props} />
    ),
    h4: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight' {...props} />
    ),
    p: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
        <p className='leading-7 [&:not(:first-child)]:mt-2' {...props} />
    ),
    bloquote: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
        <blockquote className='mt-6 border-l-2 pl-6 italic' {...props} />
    ),
    table: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableElement>, HTMLTableElement>) => (
        <table className='w-full' {...props} />
    ),
    tr: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>) => (
        <tr className='even:bg-muted m-0 border-t p-0' {...props} />
    ),
    th: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) => (
        <th
            className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'
            {...props}
        />
    ),
    td: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) => (
        <td
            className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
            {...props}
        />
    ),
    ul: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
        <ul className='my-6 ml-6 list-disc [&>li]:mt-2' {...props} />
    ),
    code: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
        <code
            className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
            {...props}
        />
    ),
    a: (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
        <a className='text-blue-500 hover:text-blue-600 hover:underline' {...props} />
    ),
    img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
        <img
            {...props}
            alt={props.alt}
            loading='lazy'
            sizes='100vw'
            className='h-full w-full rounded-lg object-cover object-center shadow-md'
        />
    ),
}
