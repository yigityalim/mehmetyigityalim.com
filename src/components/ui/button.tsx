import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
    {
        variants: {
            variant: {
                default:
                    'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
                destructive:
                    'bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90',
                outline:
                    'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
                secondary:
                    'bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
                ghost: 'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
                link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
                instagram: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white',
                twitter: 'bg-[#1da1f2] text-white hover:bg-[#1a91da] dark:bg-[#1da1f2] dark:hover:bg-[#1a91da]',
                facebook: 'bg-[#1877f2] text-white hover:bg-[#166fe5] dark:bg-[#1877f2] dark:hover:bg-[#166fe5]',
                github: 'bg-[#333] text-white hover:bg-[#222] dark:bg-[#333] dark:hover:bg-[#222]',
                linkedin: 'bg-[#0a66c2] text-white hover:bg-[#0a5ba8] dark:bg-[#0a66c2] dark:hover:bg-[#0a5ba8]',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
