import React from 'react'
import { notFound } from 'next/navigation'
import { pricing } from 'utils/pricing'
import { PlanView } from 'components/Pricing/PlanView'
import { Metadata } from 'next'

type PageProps = Readonly<{
    params: { type: string }
}>

export async function generateMetadata({ params: { type } }: PageProps): Promise<Metadata> {
    const plan = pricing.find((plan) => plan.type === type) ?? notFound()
    return {
        title: `${plan.name} | Fiyatlandırma`,
        description: plan.description,
    }
}

export default function Page({ params: { type } }: PageProps): React.ReactElement {
    const plan = pricing.find((plan) => plan.type === type) ?? notFound()
    return <PlanView plan={plan} />
}
