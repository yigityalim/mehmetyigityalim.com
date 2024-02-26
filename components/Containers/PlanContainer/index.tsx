'use client'
import React from 'react'
import { plans } from 'lib/plans'
import { PlanCard } from 'components/Plan'
import { motion, Variants } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useMediaQuery } from 'usehooks-ts'

const variants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            //when: 'afterChildren',
        },
    },
}

const childrenVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
}

export default function PlanContainer(): React.ReactElement {
    const isTablet = useMediaQuery('(min-width: 768px)')

    if (isTablet)
        return (
            <Carousel>
                <CarouselContent>
                    {plans.map((p) => (
                        <CarouselItem key={p.id}>
                            <PlanCard plan={p} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className='mt-4 flex w-full flex-row items-center justify-center gap-x-2'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        )

    return (
        <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            className='flex w-full flex-col items-center justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'
        >
            {plans.map((p) => (
                <motion.div className='h-full w-full' variants={childrenVariants} key={p.id}>
                    <PlanCard plan={p} />
                </motion.div>
            ))}
        </motion.div>
    )
}
