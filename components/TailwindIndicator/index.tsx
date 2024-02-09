import React from 'react'
import { cn } from 'lib/utils'

type TailwindIndicatorProps = Readonly<{
    align?: 'left' | 'center' | 'right'
}>

export default function TailwindIndicator({ align = 'left' }: TailwindIndicatorProps): React.JSX.Element | null {
    if (process.env.NODE_ENV === 'production') return null
    return (
        <div
            className={cn(
                'fixed bottom-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-black p-3 font-mono text-xs text-white',
                { 'left-1': align === 'left' },
                { 'left-1/2 -translate-x-1/2 transform': align === 'center' },
                { 'right-1': align === 'right' }
            )}
        >
            <div className='block sm:hidden'>xs</div>
            <div className='hidden sm:block md:hidden'>sm</div>
            <div className='hidden md:block lg:hidden'>md</div>
            <div className='hidden lg:block xl:hidden'>lg</div>
            <div className='hidden xl:block 2xl:hidden'>xl</div>
            <div className='hidden 2xl:block'>2xl</div>
            <div className='hidden '>2xl</div>
        </div>
    )
}
