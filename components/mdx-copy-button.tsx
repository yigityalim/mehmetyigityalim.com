'use client'

import * as React from 'react'
import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { NpmCommands } from '@/lib/types/unist'

import { Event, trackEvent } from '@/lib/events'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string
    src?: string
    event?: Event['name']
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
    await navigator.clipboard.writeText(value)
    if (event) trackEvent(event)
}

export function CopyButton({ value, className, src, event, ...props }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    return (
        <Button
            size='icon'
            variant='default'
            className={cn('relative z-10 size-6 hover:bg-zinc-700', className)}
            onClick={() => {
                copyToClipboardWithMeta(
                    value,
                    event
                        ? {
                              name: event,
                              properties: {
                                  code: value,
                              },
                          }
                        : undefined
                ).catch(console.error)
                setHasCopied(true)
            }}
            {...props}
        >
            <span className='sr-only'>Copy</span>
            {hasCopied ? <CheckIcon className='size-3' /> : <CopyIcon className='size-3' />}
        </Button>
    )
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
    value: string
    classNames: string
    className?: string
}

export function CopyWithClassNames({ value, classNames, className, ...props }: CopyWithClassNamesProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    const copyToClipboard = React.useCallback((value: string) => {
        copyToClipboardWithMeta(value).catch(console.error)
        setHasCopied(true)
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'
                    className={cn('relative z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50', className)}
                >
                    {hasCopied ? <CheckIcon className='size-3' /> : <CopyIcon className='h-3 w-3' />}
                    <span className='sr-only'>Copy</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => copyToClipboard(value)}>Component</DropdownMenuItem>
                <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>Classname</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
    commands: Required<NpmCommands>
}

export function CopyNpmCommandButton({ commands, className, ...props }: CopyNpmCommandButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    const copyCommand = React.useCallback((value: string, pm: 'npm' | 'pnpm' | 'yarn' | 'bun') => {
        copyToClipboardWithMeta(value, {
            name: 'copy_npm_command',
            properties: {
                command: value,
                pm,
            },
        }).catch(console.error)
        setHasCopied(true)
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant='secondary'
                    className={cn('relative z-10 size-6 hover:bg-zinc-700 hover:text-zinc-200', className)}
                >
                    {hasCopied ? <CheckIcon className='size-3' /> : <CopyIcon className='size-3' />}
                    <span className='sr-only'>Copy</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => copyCommand(commands.__npmCommand__, 'npm')}>npm</DropdownMenuItem>
                <DropdownMenuItem onClick={() => copyCommand(commands.__yarnCommand__, 'yarn')}>yarn</DropdownMenuItem>
                <DropdownMenuItem onClick={() => copyCommand(commands.__pnpmCommand__, 'pnpm')}>pnpm</DropdownMenuItem>
                <DropdownMenuItem onClick={() => copyCommand(commands.__bunCommand__, 'bun')}>bun</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
