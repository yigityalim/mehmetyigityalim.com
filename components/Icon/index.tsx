import React from 'react'
import { cn } from '@/utils'

export const ArrowLeft = ({ className }: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' className={cn(className)}>
        <path d='m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z' />
    </svg>
)

export const ArrowRight = ({ className }: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' className={cn(className)}>
        <path d='M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z' />
    </svg>
)

export const ArrowUp = ({ className }: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' className={cn(className)}>
        <path d='M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z' />
    </svg>
)

export const ArrowDown = ({ className }: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' className={cn(className)}>
        <path d='M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z' />
    </svg>
)
