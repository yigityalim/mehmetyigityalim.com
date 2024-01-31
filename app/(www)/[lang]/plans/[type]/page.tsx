import React from 'react'
import { notFound } from 'next/navigation'
import { plans } from 'lib/plans'
import PlanView from 'components/Plan/PlanView'
import { Metadata } from 'next'
import { usePlanStore } from 'store/plan'
import { Plan } from 'lib/types/plan'

type PageProps = Readonly<{ params: { type: Plan['type'] } }>

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

export default function Page({ params: { type } }: PageProps): React.ReactElement {
    return <PlanView type={type} />
}
