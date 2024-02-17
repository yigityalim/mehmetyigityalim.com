'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'lib/utils'

const toggleVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors md:hover:bg-zinc-100 md:hover:text-zinc-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-zinc-100 data-[state=on]:text-zinc-900 md:dark:hover:bg-zinc-800 md:dark:hover:text-zinc-400 dark:data-[state=on]:bg-zinc-800 dark:data-[state=on]:text-zinc-50',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline:
                    'border border-zinc-200 bg-transparent md:hover:bg-zinc-100 md:hover:text-zinc-900 dark:border-zinc-800 md:dark:hover:bg-zinc-800 md:dark:hover:text-zinc-50',
            },
            size: {
                default: 'h-10 px-3',
                sm: 'h-9 px-2.5',
                lg: 'h-11 px-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const Toggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
