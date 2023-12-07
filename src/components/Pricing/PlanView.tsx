'use client'
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { Metadata } from 'next'
import { Button } from 'components/ui/button'
import { Pricing, addPricing } from 'utils/pricing'
import { cn, formatPrice } from '@/utils'
import Container from 'components/Containers'
import { useInView } from 'framer-motion'
import { z } from 'zod'
import { useToast } from 'components/ui/use-toast'

export const metadata: Metadata = {
    title: 'Başlangıç Planı',
    description:
        'Temel web siteleri için ideal bir başlangıç. HTML, CSS ve JS ile oluşturulmuş, kullanımı kolay ve hızlı.',
}

type SelectedOptions = Partial<Record<keyof typeof addPricing, boolean>>

const FormSchema = z.object({
    items: z.array(z.string()).min(1, 'Select at least one item.'),
    pageNumber: z.number().min(0, 'Page number cannot be negative.'),
    revision: z.number().min(0, 'Revision cannot be negative.'),
})

export const PlanView: React.FC<{ plan: Pricing }> = React.memo(({ plan }) => {
    const priceRef = useRef<HTMLHeadingElement>(null)
    const isInView = useInView(priceRef, {
        margin: '-88px',
    })
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
    const [pageNumber, setPageNumber] = useState<number>(() => {
        const savedPageNumber = localStorage.getItem('pageNumber')
        return savedPageNumber ? Math.max(parseInt(savedPageNumber, 10), 0) : 0
    })
    const [revision, setRevision] = useState<number>(() => {
        const savedRevision = localStorage.getItem('revision')
        return savedRevision ? Math.max(parseInt(savedRevision, 10), 0) : 0
    })
    const { toast } = useToast()

    useEffect(() => {
        localStorage.setItem('pageNumber', pageNumber.toString())
    }, [pageNumber])

    useEffect(() => {
        localStorage.setItem('revision', revision.toString())
    }, [revision])

    const handleOptionSelect = useCallback((optionKey: keyof typeof addPricing) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [optionKey]: !prevSelectedOptions[optionKey],
        }))
    }, [])

    const calculateNewPrice = useMemo(() => {
        let newPrice = plan.price
        Object.keys(selectedOptions).forEach((key) => {
            if (selectedOptions[key as keyof typeof selectedOptions])
                newPrice += addPricing[key as keyof typeof addPricing]
        })
        newPrice += pageNumber * 100
        newPrice += revision * 200
        return newPrice
    }, [plan.price, selectedOptions, pageNumber, revision])

    const incrementPageNumber = useCallback(() => setPageNumber((prevPageNumber) => prevPageNumber + 1), [])
    const decrementPageNumber = useCallback(
        () => pageNumber > 0 && setPageNumber((prevPageNumber) => prevPageNumber - 1),
        [pageNumber]
    )

    const incrementRevision = useCallback(() => setRevision((prevRevision) => prevRevision + 1), [])
    const decrementRevision = useCallback(
        () => revision > 0 && setRevision((prevRevision) => prevRevision - 1),
        [revision]
    )

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const data = FormSchema.safeParse({
                items: Object.keys(selectedOptions).filter(
                    (key) => selectedOptions[key as keyof typeof selectedOptions]
                ),
                pageNumber,
                revision,
            })
            if (data.success) {
                toast({
                    title: 'Teklif Gönderiliyor...',
                    description: JSON.stringify(data.data, null, 2),
                })
            }
        },
        [selectedOptions, pageNumber, revision, toast]
    )

    useEffect(() => {
        setSelectedOptions({
            framework: !!plan.framework,
            typeScript: plan.typeScript,
            testing: plan.testing,
            design: plan.design,
            auth: plan.auth,
            payment: plan.payment,
            seo: plan.seo,
            analytics: plan.analytics,
            hosting: plan.hosting,
            dns: plan.dns,
            i18n: plan.i18n,
        })
    }, [plan])

    return (
        <Container className='items-start'>
            <form
                onSubmit={onSubmit}
                className='flex w-full flex-col items-start justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'
            >
                <div
                    className={cn(
                        'fixed left-2 right-2 flex flex-row items-center justify-between gap-x-2 rounded-lg bg-card p-3 transition-all duration-300 dark:bg-wash-dark',
                        isInView ? '-bottom-full' : 'bottom-2'
                    )}
                >
                    <div className='flex flex-col items-start justify-between gap-y-2'>
                        <h1 className={cn('text-2xl font-bold italic', plan.color?.heading)}>{plan.name}</h1>
                        <h2 className='text-xl font-bold italic text-gray-900 dark:text-gray-200'>
                            {formatPrice(calculateNewPrice)}
                        </h2>
                    </div>
                    <button type='submit'>Teklifi ver</button>
                </div>
                <h1 className={cn('text-5xl font-bold italic', plan.color?.heading)}>{plan.name}</h1>
                <h2 ref={priceRef} className='text-4xl font-bold italic text-gray-900 dark:text-gray-200'>
                    {formatPrice(calculateNewPrice)}
                </h2>
                <p className='mb-6 text-lg text-gray-600 dark:text-gray-400'>{plan.description}</p>
                <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
                    <h2 className='mb-2 text-xl font-semibold'>Plan Özellikleri:</h2>
                    <div>
                        {Object.keys(addPricing).map((key: string) => (
                            <div key={key} className='mb-2 flex w-full items-center justify-start gap-x-2'>
                                <input
                                    type='checkbox'
                                    id={key}
                                    checked={selectedOptions[key as keyof typeof addPricing] ?? false}
                                    onChange={() => handleOptionSelect(key as keyof typeof addPricing)}
                                    disabled={!!(key === 'framework' && plan.framework)}
                                />
                                <label htmlFor={key}>{key}</label>
                            </div>
                        ))}
                        <div className='flex w-full items-center justify-start gap-x-2'>
                            <Button type='button' size='icon' variant='ghost' onClick={decrementPageNumber}>
                                Azalt
                            </Button>
                            <p>Page Number: {pageNumber}</p>
                            <Button type='button' size='icon' variant='ghost' onClick={incrementPageNumber}>
                                Artır
                            </Button>
                        </div>
                        <div className='flex w-full items-center justify-start gap-x-2'>
                            <Button type='button' size='icon' variant='ghost' onClick={decrementRevision}>
                                Azalt
                            </Button>{' '}
                            <p>Revision: {revision}</p>
                            <Button type='button' size='icon' variant='ghost' onClick={incrementRevision}>
                                Artır
                            </Button>
                        </div>
                        {isInView && (
                            <Button size='icon' variant='ghost' className='w-full' type='submit'>
                                teklif ver
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </Container>
    )
})

export default PlanView
