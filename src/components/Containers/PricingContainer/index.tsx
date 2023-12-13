'use client'
import React from 'react'
import { pricing } from 'utils/pricing'
import { PricingCard } from 'components/Pricing'
import { motion, Variants } from 'framer-motion'

const variants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
            //when: 'afterChildren',
        },
    },
}

const childrenVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
}

export default function PricingContainer(): React.ReactElement {
    return (
        <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            className='flex w-full flex-col items-center justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'
        >
            {pricing.map((p) => (
                <motion.div className='h-full w-full' variants={childrenVariants} key={p.id}>
                    <PricingCard pricing={p} />
                </motion.div>
            ))}
        </motion.div>
    )
}
