import React from 'react'
import Container from 'components/Containers'
import { plans } from 'lib/plans'
import type { Plan } from 'lib/types/plan'
import { quickJobs } from 'lib/quickJob'
import { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'
import QuickJobCard from 'components/Plan/QuickJobCard'
import PlanContainer from 'components/Containers/PlanContainer'

export const metadata = {
    title: 'Fiyatlandırma',
    description: 'Fiyatlandırma listesi',
} satisfies Metadata

export async function generateStaticParams(): Promise<{ params: { type: Plan['type'] } }[]> {
    return plans.map((p) => ({ params: { type: p.type } }))
}

export default function PlansPage(): React.ReactElement {
    return (
        <Container
            title='Projeleriniz için fiyatlandırma listesi'
            description='Fiyatlar, projenin gereksinimlerine göre değişiklik gösterebilir.'
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
