import React from 'react'
import Container from 'components/Containers'
import { BasicPlanView, StandartPlanView, AdvancedPlanView } from 'components/Pricing'

type PageProps = Readonly<{
    params: { sub: string }
}>

const PlanComponents: Record<string, React.FC> = {
    basic: BasicPlanView,
    standart: StandartPlanView,
    advanced: AdvancedPlanView,
}

export default function Page({ params }: PageProps): React.ReactElement {
    const { sub } = params
    const SelectedPlan: React.FC = PlanComponents[sub] || BasicPlanView

    return (
        <Container className='items-start'>
            <SelectedPlan />
        </Container>
    )
}
