import React from 'react'
import Container from 'components/Containers'
import { pricing } from 'utils/pricing'
import { quickJobs } from 'utils/quickJob'
import { Metadata } from 'next'
import { PricingCard } from 'components/Pricing'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'
import QuickJobCard from 'components/Pricing/QuickJobCard'

export const metadata: Metadata = {
    title: 'Fiyatlandırma',
    description: 'Fiyatlandırma listesi',
}

export default async function Pricing(): Promise<React.ReactElement> {
    return (
        <Container>
            <h1 className='m-4 ml-0 text-4xl font-bold leading-tight tracking-wide'>
                Projeleriniz için fiyatlandırma listesi
            </h1>
            <p className='text-base font-medium leading-tight tracking-wide text-gray-500 dark:text-gray-400'>
                <span className='text-xs'>Fiyatlar, projenin gereksinimlerine göre değişiklik gösterebilir.</span>
            </p>
            <div className='flex w-full flex-col items-center justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'>
                {pricing.map((pricing) => (
                    <PricingCard pricing={pricing} key={pricing.id} />
                ))}
            </div>
            <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1' className='w-full'>
                    <AccordionTrigger className='w-full'>Hızlı İşlemler</AccordionTrigger>
                    <AccordionContent className='space-y-2'>
                        {quickJobs.map((job) => (
                            <QuickJobCard job={job} key={job.id} />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Container>
    )
}
