import React from 'react'
import { plans } from 'lib/plans'
import { PlanView } from 'components/Plan/PlanView'
import type { Metadata } from 'next'
import { Plan } from 'lib/types/plan'
import { notFound } from 'next/navigation'
import Container from 'components/Containers'

type PageProps = Readonly<{
    params: { type: Plan['type'] }
}>

export default function Page({ params: { type } }: PageProps): React.ReactElement {
    if (!plans.find((plan) => plan.type === type)) notFound()
    return (
        <Container className='items-start' isDev>
            <PlanView type={type} />
        </Container>
    )
}

export async function generateMetadata({ params: { type } }: PageProps): Promise<Metadata> {
    const plan = plans.find((plan) => plan.type === type)

    if (!plan)
        return {
            title: 'Sayfa bulunamadı',
            description: 'Sayfa bulunamadı',
        }

    return {
        title: `${plan.name} | Fiyatlandırma`,
        description: plan.description,
    }
}

export async function generateStaticParams() {
    return plans.map((plan) => ({ type: plan.type }))
}
