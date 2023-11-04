import { cn } from 'lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ForwardedRef, forwardRef, ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from 'react'

const loaderVariants = cva(
    "after:animate-loader relative flex items-center justify-center overflow-hidden rounded-full after:absolute after:left-0 after:top-0 after:box-border after:h-full after:w-1/2 after:rounded-full after:content-['']",
    {
        variants: {
            variant: {
                default: 'bg-primary dark:bg-highlight-dark after:bg-primary-dark dark:after:bg-primary',
                primary: 'bg-primary after:bg-primary',
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

interface LoadingProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof loaderVariants> {}

const Spinner: ForwardRefExoticComponent<LoadingProps & RefAttributes<HTMLSpanElement>> = forwardRef<
    HTMLSpanElement,
    LoadingProps
>(({ className, variant, size, ...props }: LoadingProps, ref: ForwardedRef<HTMLSpanElement>) => {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <span className={cn(loaderVariants({ variant, size, className }))} ref={ref} {...props} />
        </div>
    )
})

Spinner.displayName = 'Spinner'

export { Spinner, loaderVariants }
