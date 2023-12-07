import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { QuickJobs } from 'utils/pricing'
import React from 'react'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { formatPrice } from '@/utils'

type QuickJobProps = Readonly<{
    job: QuickJobs
}>

export default function QuickJobCard({ job }: QuickJobProps): React.ReactElement {
    return (
        <Card>
            <CardHeader>
                <h1 className='font-poppins text-2xl font-bold'>{job.name}</h1>
                <CardTitle className='font-noto-sans'>
                    {formatPrice(job.price.value)}
                    <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>
                        {job.price.type === 'hourly' ? 'saat' : 'ort.'}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex w-full flex-col items-start justify-center gap-y-2'>
                <CardDescription className='text-xs'>{job.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button className='w-full' size='sm' variant='secondary'>
                    İrtibata Geçin
                </Button>
            </CardFooter>
        </Card>
    )
}
