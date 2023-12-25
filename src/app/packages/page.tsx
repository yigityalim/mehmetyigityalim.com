import React from 'react'
import Container from 'components/Containers'
import { Pricing, pricing } from 'lib/pricing'
import { quickJobs } from 'lib/quickJob'
import { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'
import QuickJobCard from 'components/Pricing/QuickJobCard'
import PricingContainer from 'components/Containers/PricingContainer'

export const metadata: Metadata = {
    title: 'Fiyatlandırma',
    description: 'Fiyatlandırma listesi',
}

export async function generateStaticParams(): Promise<{ params: { type: Pricing['type'] } }[]> {
    return pricing.map((pricing) => ({ params: { type: pricing.type } }))
}

export default function Pricing(): React.ReactElement {
    return (
        <Container
            title='Projeleriniz için fiyatlandırma listesi'
            description='Fiyatlar, projenin gereksinimlerine göre değişiklik gösterebilir.'
        >
            <PricingContainer />
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
