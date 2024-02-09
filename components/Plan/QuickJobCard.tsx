'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { type QuickJobs } from 'lib/quickJob'
import React from 'react'
import { Button } from 'components/ui/button'
import { cn, formatPrice } from 'lib/utils'
import { useToast } from 'components/ui/use-toast'

type QuickJobProps = Readonly<{
    job: QuickJobs
}>

export default function QuickJobCard({ job }: QuickJobProps): React.ReactElement {
    const { toast } = useToast()
    const classNames: Partial<Record<keyof QuickJobs['color'], string>> = {
        heading: job.color?.heading,
        border: job.color?.border,
    }

    return (
        <Card className={cn(classNames.border, 'relative z-10')}>
            <CardHeader>
                <div className='flex w-full items-center justify-between gap-x-2'>
                    <h1 className={cn('font-poppins text-2xl font-bold', classNames.heading)}>{job.name}</h1>
                </div>
                <CardTitle className='font-noto-sans'>
                    {formatPrice(job.price.value)}
                    <PriceText type={job.price.type} />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex w-full flex-col items-start justify-center gap-y-2'>
                <CardDescription className='text-xs'>{job.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button
                    className='w-full'
                    size='sm'
                    variant='secondary'
                    onClick={() =>
                        toast({
                            title: 'İrtibata Geçin',
                            description: job.name,
                        })
                    }
                >
                    İrtibata Geçin
                </Button>
            </CardFooter>
        </Card>
    )
}

const priceTextMap: Record<QuickJobs['price']['type'], string> = {
    hourly: 'saat',
    monthly: 'aylık',
    fixed: 'ort.',
    yearly: 'yıllık',
}

function PriceText({ type }: { type: QuickJobs['price']['type'] }) {
    const text = priceTextMap[type] ?? 'ort.'
    return <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>{text}</span>
}
