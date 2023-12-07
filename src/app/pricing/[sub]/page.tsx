'use client'

import React from 'react'
import Container from 'components/Containers'
import { BasicPlanView, StandartPlanView, AdvancedPlanView } from 'components/Pricing'
import { notFound, useRouter } from 'next/navigation'

type PageProps = Readonly<{
    params: { sub: string }
}>

const PlanComponents: Record<string, React.FC> = {
    basic: BasicPlanView,
    standart: StandartPlanView,
    advanced: AdvancedPlanView,
}

export default function Page({ params: { sub } }: PageProps): React.ReactElement {
    const router = useRouter()
    if (!PlanComponents[sub]) notFound()
    const SelectedPlan: React.FC = PlanComponents[sub] ?? PlanComponents.basic

    return (
        <Container className='items-start'>
            <SelectedPlan />
        </Container>
    )
}
