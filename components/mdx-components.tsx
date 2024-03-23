import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { Event } from '@/lib/events'
import type { NpmCommands } from '@/lib/types/unist'
import { Icon } from '@/components/mdx-icon'
import { CopyButton, CopyNpmCommandButton } from '@/components/mdx-copy-button'
import Image from 'next/image'
import { Callout } from '@/components/callout'
import Link from 'next/link'

export const components = {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Alert: ({ className, ...props }: React.ComponentProps<typeof Alert>) => (
        <Alert className={cn('my-4', className)} {...props} />
    ),
    AlertTitle,
    AlertDescription,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className={cn('mt-2 scroll-m-20 text-4xl font-bold', className)} {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                'mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className={cn('mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)} {...props} />
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
        <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
    ),
    img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={cn('rounded-md', className)} alt={alt} {...props} />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className='my-4 md:my-8' {...props} />,
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className='my-6 w-full overflow-y-auto'>
            <table className={cn('w-full', className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className={cn('m-0 border-t p-0 even:bg-muted', className)} {...props} />
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
    pre: ({
        className,
        __rawString__,
        __npmCommand__,
        __yarnCommand__,
        __pnpmCommand__,
        __bunCommand__,
        __withMeta__,
        __language__,
        __src__,
        __event__,
        ...props
    }: React.HTMLAttributes<HTMLPreElement> & {
        __rawString__?: string
        __withMeta__?: boolean
        __language__?: string
        __src__?: string
        __event__?: Event['name']
    } & NpmCommands) => {
        return (
            <>
                {__language__ && <Icon meta={__withMeta__} lang={__language__} />}
                <pre
                    className={cn(
                        'relative mb-4 mt-2 max-h-[650px] overflow-x-auto rounded-lg bg-black py-4 dark:bg-zinc-900',
                        className
                    )}
                    {...props}
                />
                {__rawString__ && !__npmCommand__ && (
                    <CopyButton
                        value={__rawString__}
                        src={__src__}
                        event={__event__}
                        className={cn('absolute right-2 top-4', __withMeta__ && 'top-6')}
                    />
                )}
                {__npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__ && (
                    <CopyNpmCommandButton
                        commands={{
                            __npmCommand__,
                            __yarnCommand__,
                            __pnpmCommand__,
                            __bunCommand__,
                        }}
                        className={cn('absolute right-2 top-4', __withMeta__ && 'top-6')}
                    />
                )}
            </>
        )
    },
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn('relative m-1 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}
            {...props}
        />
    ),
    Image,
    Callout,
    Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
        <h3
            className={cn('font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)}
            {...props}
        />
    ),
    Steps: ({ ...props }) => (
        <div className='[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]' {...props} />
    ),
    Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
        <Link className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
        <Link
            className={cn(
                'flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10',
                className
            )}
            {...props}
        />
    ),
}