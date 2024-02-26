'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { features, plans } from '@/lib/plans'
import type { Plan } from '@/lib/types/plan'
import { cn, formatPrice } from 'lib/utils'
import Container from '@/components/Containers'
import { useInView } from 'framer-motion'
import {
    Select as SelectPrimitive,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { planVariants } from 'components/Plan/Card'
import { notFound } from 'next/navigation'

export function PlanView({ type }: Readonly<{ type?: Plan['type'] }>): React.ReactElement {
    const priceRef = React.useRef<React.ElementRef<'h2'>>(null)
    const isInView = useInView(priceRef, { margin: `-88px` })
    const plan = plans.find((plan) => plan.type === type) ?? notFound()
    const { toast } = useToast()

    return (
        <Container className='items-start'>
            <div className='flex w-full flex-col items-start justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'>
                <div
                    className={cn(
                        'dark:bg-wash-dark fixed left-2 right-2 flex flex-row items-center justify-between gap-x-2 rounded-lg bg-card p-3 transition-all duration-300',
                        isInView ? '-bottom-full' : 'bottom-4'
                    )}
                >
                    <div className='flex flex-col items-start justify-between gap-y-2'>
                        <h1 className={cn('text-2xl font-bold italic')}>{plan.name}</h1>
                        <h2 className='text-xl font-bold italic text-gray-900 dark:text-gray-200'>
                            {formatPrice(plan.price.monthly)}
                        </h2>
                    </div>
                    <button type='submit'>Teklifi ver</button>
                </div>
                <h1 className={cn('text-5xl font-bold italic')}>{plan.name}</h1>
                <h2 ref={priceRef} className='text-4xl font-bold italic text-gray-900 dark:text-gray-200'>
                    {formatPrice(plan.price.monthly)}
                </h2>
                <p className='mb-6 text-lg text-gray-600 dark:text-gray-400'>{plan.description}</p>
                <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
                    <h2 className='mb-2 text-xl font-semibold'>Plan Özellikleri:</h2>
                    <h3 className='mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400'>
                        Eklemek istediklerinize basarak ekleme işlemini gerçekleştirebilirsiniz.
                    </h3>
                    <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {plan.features.map((feature) => {
                            return (
                                <div key={feature.id} className='flex items-center justify-start gap-x-2'>
                                    <p>{feature.name}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex w-full items-center justify-start gap-x-2'>
                        <Button type='button' size='icon' variant='ghost'>
                            Azalt
                        </Button>
                        <p>Sayfa Sayısı: {1}</p>
                        <Button type='button' size='icon' variant='ghost'>
                            Artır
                        </Button>
                    </div>
                    <div className='flex w-full items-center justify-start gap-x-2'>
                        <Button type='button' size='icon' variant='ghost'>
                            Azalt
                        </Button>{' '}
                        <p>Revizyon: {1}</p>
                        <Button type='button' size='icon' variant='ghost'>
                            Artır
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

PlanView.displayName = 'PlanView'
