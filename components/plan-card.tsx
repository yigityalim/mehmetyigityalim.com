import React from 'react'
import Link from 'next/link'
import { cva } from 'class-variance-authority'
import type { Plan } from '@/lib/types/plan'
import { features } from '@/lib/plans'
import { cn, formatPrice } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const planVariants = cva('', {
    variants: {
        heading: {
            basic: 'text-foreground dark:text-zinc-300',
            standart: 'text-indigo-400 dark:text-indigo-500',
            advanced: 'text-red-400 dark:text-red-500',
        },
        border: {
            basic: 'z-30 border-2 border-white dark:border-zinc-700',
            standart: 'z-30 border-2 border-indigo-500 dark:border-indigo-700',
            advanced: 'z-30 border-2 border-red-500 dark:border-red-700',
        },
        addPrice: {
            basic: 'text-foreground bg-zinc-500 dark:bg-zinc-700 dark:text-zinc-300',
            standart: 'text-white bg-indigo-500 dark:bg-indigo-700 dark:text-indigo-300',
            advanced: 'text-white bg-red-500 dark:bg-red-700 dark:text-red-300',
        },
        feature: {
            basic: 'text-foreground dark:text-zinc-300',
            standart: 'text-indigo-400 dark:text-indigo-500',
            advanced: 'text-red-400 dark:text-red-500',
        },
        backdrop: {
            basic: '-z-20 bg-gradient-to-r from-gray-900 to-gray-600 absolute -inset-0.5 rounded-md opacity-75 animate-tilt blur transition duration-1000 group-hover:opacity-100',
            standart:
                '-z-20 bg-gradient-to-r from-pink-900 to-purple-600 absolute -inset-0.5 rounded-md opacity-75 animate-tilt blur transition duration-1000 group-hover:opacity-100',
            advanced:
                '-z-20 bg-gradient-to-r from-red-900 to-orange-800 absolute -inset-0.5 rounded-md opacity-75 animate-tilt blur transition duration-1000 group-hover:opacity-100',
        },
        top: {
            basic: 'border-white text-white dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-2 py-1 font-semibold',
            standart:
                'border-indigo-400 text-indigo-400 dark:border-indigo-700 dark:bg-zinc-950 dark:text-indigo-600 absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-2 py-1 font-semibold',
            advanced:
                'border-red-500 text-red-500 dark:border-red-700 dark:bg-zinc-950 dark:text-red-600 absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-2 py-1 font-semibold',
        },
        accent: {
            basic: 'data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-200 dark:data-[state=checked]:bg-zinc-500 dark:data-[state=checked]:text-white',
            standart:
                'data-[state=checked]:bg-indigo-900 data-[state=checked]:text-indigo-500 dark:data-[state=checked]:bg-indigo-050 dark:data-[state=checked]:text-white',
            advanced:
                'data-[state=checked]:bg-red-900 data-[state=checked]:text-red-500 dark:data-[state=checked]:bg-red-500 dark:data-[state=checked]:text-white',
        },
    },
})

type PlanCardProps = Readonly<{ plan: Plan }>

// TODO - md boyutunda top divi overflowdan ötürü kötü gözüküyor. bunu plan kartının sağ köşesine koyacak şekilde ayarla.

export function PlanCard({ plan }: PlanCardProps): React.ReactElement {
    return (
        <Card className={cn('group z-50', planVariants({ border: plan.type }))}>
            <div className={planVariants({ backdrop: plan.type })} />
            {/*
                {plan.top && <div className={cn('z-50', planVariants({ top: plan.type }))}>{plan.top}</div>}
            */}
            <div className='h-full w-full rounded-md bg-card'>
                <CardHeader>
                    <CardTitle className={cn('text-3xl', planVariants({ heading: plan.type }))}>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className='mt-2 flex w-full flex-col items-start justify-center gap-y-1'>
                        <div className='flex items-center justify-center gap-x-2'>
                            <p className='text-lg font-bold'>{formatPrice(plan.price.monthly)}</p>
                            <p className='text-sm'>aylık</p>
                        </div>
                        <div className='flex items-center justify-center gap-x-2'>
                            <p className='text-lg font-bold'>{formatPrice(plan.price.yearly)}</p>
                            <p className='text-sm'>yıllık</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <h3 className='mb-2 text-base font-bold capitalize italic text-zinc-700 dark:text-zinc-300'>
                        Size sunulacak özellikler:{' '}
                    </h3>
                    {Object.keys(features)
                        .sort((a, b) => {
                            const aId = features[a].id
                            const bId = features[b].id
                            const fA = plan.features.find((f) => f.id === aId)
                            const fB = plan.features.find((f) => f.id === bId)
                            return fA ? -1 : fB ? 1 : 0
                        })
                        .filter((key) => plan.features.find((f) => f.id === features[key].id))
                        .map((key) => (
                            <div
                                key={features[key].id}
                                className={cn(
                                    'flex w-full items-center justify-between text-lg italic',
                                    planVariants({ heading: plan.type })
                                )}
                            >
                                <h3>{features[key].name}</h3>
                            </div>
                        ))}
                </CardContent>
                <CardFooter>
                    <Link
                        className={cn('w-full', buttonVariants({ variant: plan.buttonVariant, size: 'sm' }))}
                        href={plan.href}
                    >
                        {plan.buttonText}
                    </Link>
                </CardFooter>
            </div>
        </Card>
    )
}
