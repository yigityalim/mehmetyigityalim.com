import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { quickJobs } from '@/lib/quickJob'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { QuickJobCard } from '@/components/quick-job-card'
import { PlanContainer } from '@/components/plan-container'

export default function PlansPage(): React.JSX.Element {
    return (
        <Container
            title='Projeleriniz için fiyatlandırma listesi'
            description='Fiyatlar, projenin gereksinimlerine göre değişiklik gösterebilir.'
            isDev
        >
            <PlanContainer />
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

export const metadata = {
    title: 'Fiyatlandırma',
    description: 'Fiyatlandırma listesi',
} satisfies Metadata
