import React from 'react'
import Container from 'components/Containers'
import { plans } from 'lib/plans'
import { PlanCard } from 'components/Plan'

export default function NotFound(): React.ReactElement {
    return (
        <Container>
            <h1 className='m-4 ml-0 text-4xl font-bold leading-tight tracking-wide'>İlgili plan Bulunamadı.</h1>
            <p className='w-full text-start text-base font-medium leading-tight tracking-wide text-gray-500 dark:text-gray-400'>
                <span className='text-xs'>İşte! diğer tüm planlar:</span>
            </p>
            {plans.map((p) => (
                <PlanCard plan={p} key={p.id} />
            ))}
        </Container>
    )
}
