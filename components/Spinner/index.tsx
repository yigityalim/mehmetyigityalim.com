import { cn } from 'lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ForwardedRef, forwardRef, ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

const loaderVariants = cva(
    "after:animate-loader relative flex items-center justify-center overflow-hidden rounded-full after:absolute after:left-0 after:top-0 after:box-border after:h-full after:w-1/2 after:rounded-full after:content-['']",
    {
        variants: {
            variant: {
                default: 'bg-gray-200 after:bg-black dark:after:bg-white dark:bg-gray-900',
                primary: 'bg-green-500 after:bg-red-500',
            },
            size: {
                sm: 'h-3 w-24',
                md: 'h-2 w-52',
                lg: 'h-2 w-80',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
)

interface LoadingProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof loaderVariants> {
    justSpinner?: boolean
}

const Spinner: ForwardRefExoticComponent<LoadingProps & RefAttributes<HTMLSpanElement>> = forwardRef<
    HTMLSpanElement,
    LoadingProps
>(({ className, variant, size, justSpinner, ...props }: LoadingProps, ref: ForwardedRef<HTMLSpanElement>) => {
    return (
        <div
            className={cn(
                justSpinner
                    ? 'flex h-auto w-auto items-center justify-center'
                    : 'flex h-[calc(100dvh-8rem)] w-full items-center justify-center',
                className
            )}
        >
            <span className={cn(loaderVariants({ variant, size }))} ref={ref} {...props} />
        </div>
    )
})

Spinner.displayName = 'Spinner'
export { Spinner, loaderVariants }
