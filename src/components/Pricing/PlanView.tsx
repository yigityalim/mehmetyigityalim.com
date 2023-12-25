'use client'
import React from 'react'
import { Button } from 'components/ui/button'
import { type Pricing, type HasAddPricing, addPricing, hasAddPricing } from 'lib/pricing'
import { cn, formatPrice } from '@/utils'
import Container from 'components/Containers'
import { useInView } from 'framer-motion'
import { z } from 'zod'
import { useToast } from 'components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'
import { OVERLAY_MENU_HEIGHT } from 'utils/constants'

type SelectedOptions = Partial<Record<keyof typeof addPricing, boolean>>

const FormSchema = z.object({
    items: z.array(z.string()).min(1, 'En az bir özellik seçmelisiniz.'),
    pageNumber: z.number().min(0, 'Sayfa sayısı negatif olamaz.'),
    revision: z.number().min(0, 'Revizyon sayısı negatif olamaz'),
})

export const PlanView: React.FC<{ plan: Pricing }> = React.memo(({ plan }) => {
    const priceRef: React.RefObject<HTMLHeadingElement> = React.useRef<HTMLHeadingElement>(null)
    const isInView = useInView(priceRef, { margin: `-${OVERLAY_MENU_HEIGHT}px` })

    const [selectedOptions, setSelectedOptions] = React.useState<SelectedOptions>({})
    const [pageNumber, setPageNumber] = React.useState<number>(plan.pageNumber ?? 1)
    const [revision, setRevision] = React.useState<number>(plan.revision ?? 0)
    const [newPrice, setNewPrice] = React.useState<number>(plan.price)

    const { toast } = useToast()

    const handleOptionSelect = React.useCallback<(optionKey: keyof typeof addPricing) => void>(
        (optionKey) => {
            const selectedPlan: HasAddPricing | undefined = hasAddPricing.find(({ type }) => type === plan.type)
            const allowedOptions: (keyof Pricing)[] = selectedPlan ? selectedPlan.add : []

            if (selectedOptions[optionKey]) {
                if (!allowedOptions.includes(optionKey)) {
                    toast({
                        duration: 2000,
                        variant: 'destructive',
                        title: 'Bu özellik bu plana dahil değil.',
                        description: 'Lütfen diğer planlara göz atın.',
                    })
                } else {
                    setSelectedOptions((prevSelectedOptions) => ({
                        ...prevSelectedOptions,
                        [optionKey]: !prevSelectedOptions[optionKey],
                    }))
                }
            } else if (allowedOptions.includes(optionKey)) {
                setSelectedOptions((prevSelectedOptions) => ({
                    ...prevSelectedOptions,
                    [optionKey]: !prevSelectedOptions[optionKey],
                }))
            } else {
                toast({
                    duration: 5000,
                    variant: 'destructive',
                    title: 'Bu özellik bu plana dahil değil.',
                    description: 'Lütfen diğer planlara göz atın.',
                })
            }
        },
        [plan.type, setSelectedOptions, toast, selectedOptions]
    )

    const handleFrameworkSelect = React.useCallback<(data: string) => void>(
        (data) => {
            if (plan.framework?.find((f) => f.name.localeCompare(data))?.index) return
            console.log(plan.framework?.find((f) => f.name === data))
            const frameworkCost = plan.framework?.find((f) => f.name.localeCompare(data))?.cost ?? 0
            setNewPrice((prevPrice) => prevPrice + frameworkCost)
        },
        [setNewPrice, plan.framework]
    )

    React.useEffect(() => {
        let updatedPrice = plan.price

        const controlledKeys: (keyof Pricing)[] = [
            'pageNumber',
            'revision',
            'framework',
            'typeScript',
            'testing',
            'design',
            'auth',
            'payment',
            'seo',
            'analytics',
            'hosting',
            'dns',
            'i18n',
        ]

        controlledKeys.forEach((key) => {
            /*
            framework değeri dizi dönüyor. diğer key değerleri string veya boolean dönüyor. buna göre hesaba katılması lazım.
            [
                {
                    "index": true,
                    "name": "HTML, CSS, JS",
                    "cost": 0
                },
                {
                    "name": "Vite.js (Hızlı Web Uygulamaları için)",
                    "description": "(Hızlı Web Uygulamaları için)",
                    "cost": 1000
                }
            ]
             */
            if (key === 'framework') {
                const frameworkCost = plan.framework?.find((f) => f.index)?.cost ?? 0
                //updatedPrice += frameworkCost
            }
        })
        updatedPrice += (pageNumber - plan.pageNumber) * 100
        updatedPrice += (revision - plan.revision) * 200
        if (updatedPrice > 0) setNewPrice(updatedPrice)
    }, [selectedOptions, pageNumber, revision, plan])

    const incrementPageNumber = React.useCallback(
        () => setPageNumber((prevPageNumber) => prevPageNumber + 1),
        [setPageNumber]
    )
    const decrementPageNumber = React.useCallback<() => false | void>(
        () => pageNumber > 0 && setPageNumber((prevPageNumber) => prevPageNumber - 1),
        [pageNumber, setPageNumber]
    )

    const incrementRevision = React.useCallback(() => setRevision((prevRevision) => prevRevision + 1), [setRevision])
    const decrementRevision = React.useCallback(
        () => revision > 0 && setRevision((prevRevision) => prevRevision - 1),
        [revision, setRevision]
    )

    const onSubmit = React.useCallback<(e: React.FormEvent<HTMLFormElement>) => void>(
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
                    duration: 2000,
                    title: 'Teklif Gönderiliyor...',
                    description: JSON.stringify(data.data, null, 2),
                })
            }
        },
        [selectedOptions, pageNumber, revision, toast]
    )

    React.useEffect(() => {
        setSelectedOptions({
            pageNumber: !!plan.pageNumber,
            revision: !!plan.revision,
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

    const incretmentPageNumberDisabled = React.useMemo(() => {
        switch (plan.type) {
            case 'basic':
                return pageNumber >= 5
            case 'standart':
                return pageNumber >= 7
            case 'advanced':
                return pageNumber >= 10
            default:
                return false
        }
    }, [plan.type, pageNumber])

    const decrementPageNumberDisabled = React.useMemo(() => {
        return pageNumber <= 1
    }, [pageNumber])

    const incretmentRevisionDisabled = React.useMemo(() => {
        switch (plan.type) {
            case 'basic':
                return revision >= 3
            case 'standart':
                return revision >= 5
            case 'advanced':
                return revision >= 7
            default:
                return false
        }
    }, [plan.type, revision])

    const decrementRevisionDisabled = React.useMemo(() => {
        return revision <= 1
    }, [revision])

    return (
        <Container className='items-start'>
            <form
                onSubmit={onSubmit}
                className='flex w-full flex-col items-start justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'
            >
                <div
                    className={cn(
                        'fixed left-2 right-2 flex flex-row items-center justify-between gap-x-2 rounded-lg bg-card p-3 transition-all duration-300 dark:bg-wash-dark',
                        isInView ? '-bottom-full' : 'bottom-4'
                    )}
                >
                    <div className='flex flex-col items-start justify-between gap-y-2'>
                        <h1 className={cn('text-2xl font-bold italic', plan.color?.heading)}>{plan.name}</h1>
                        <h2 className='text-xl font-bold italic text-gray-900 dark:text-gray-200'>
                            {formatPrice(newPrice)}
                        </h2>
                    </div>
                    <button type='submit'>Teklifi ver</button>
                </div>
                <h1 className={cn('text-5xl font-bold italic', plan.color?.heading)}>{plan.name}</h1>
                <h2 ref={priceRef} className='text-4xl font-bold italic text-gray-900 dark:text-gray-200'>
                    {formatPrice(newPrice)}
                </h2>
                <p className='mb-6 text-lg text-gray-600 dark:text-gray-400'>{plan.description}</p>
                <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
                    <h2 className='mb-2 text-xl font-semibold'>Plan Özellikleri:</h2>
                    <h3 className='mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400'>
                        Eklemek istediklerinize basarak ekleme işlemini gerçekleştirebilirsiniz.
                    </h3>
                    <div className='grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {Object.keys(addPricing)
                            .filter((key) => key !== 'pageNumber' && key !== 'revision')
                            .map((key: string) => {
                                if (key === 'framework' && plan.framework)
                                    if (plan.framework.length > 1)
                                        return (
                                            <Select key={key} onValueChange={handleFrameworkSelect}>
                                                <SelectTrigger className='mb-4'>
                                                    <SelectValue
                                                        placeholder={
                                                            plan.framework.find((f) => f.index)?.name ??
                                                            'Teknoloji Seçiniz...'
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {plan.framework.map(({ name, description }) => (
                                                        <SelectItem key={name} value={name}>
                                                            {name} ({description})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )
                                    else
                                        return (
                                            <h2 key={key} className='p-2 text-2xl'>
                                                {plan.framework.find((f) => f.index)?.name}
                                            </h2>
                                        )
                                else
                                    return (
                                        <div key={key} className='flex w-full items-center justify-start gap-x-2'>
                                            <input
                                                type='checkbox'
                                                className='hidden'
                                                id={key}
                                                checked={selectedOptions[key as keyof typeof addPricing] ?? false}
                                                onChange={() => handleOptionSelect(key as keyof typeof addPricing)}
                                                disabled={!!(key === 'framework' && plan.framework)}
                                            />
                                            <label
                                                htmlFor={key}
                                                className={cn(
                                                    'cursor-pointer rounded-lg px-4 py-1 text-lg font-semibold transition-all duration-300',
                                                    selectedOptions[key as keyof typeof addPricing]
                                                        ? plan?.color?.addPrice
                                                        : 'text-gray-600 dark:text-gray-400'
                                                )}
                                            >
                                                {key}
                                            </label>
                                        </div>
                                    )
                            })}
                    </div>
                    <div className='flex w-full items-center justify-start gap-x-2'>
                        <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            onClick={decrementPageNumber}
                            disabled={decrementPageNumberDisabled}
                        >
                            Azalt
                        </Button>
                        <p>Sayfa Sayısı: {pageNumber}</p>
                        <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            onClick={incrementPageNumber}
                            disabled={incretmentPageNumberDisabled}
                        >
                            Artır
                        </Button>
                    </div>
                    <div className='flex w-full items-center justify-start gap-x-2'>
                        <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            onClick={decrementRevision}
                            disabled={decrementRevisionDisabled}
                        >
                            Azalt
                        </Button>{' '}
                        <p>Revizyon: {revision}</p>
                        <Button
                            type='button'
                            size='icon'
                            variant='ghost'
                            onClick={incrementRevision}
                            disabled={incretmentRevisionDisabled}
                        >
                            Artır
                        </Button>
                    </div>
                    {isInView && (
                        <Button size='icon' variant='ghost' className='w-full' type='submit'>
                            teklif ver
                        </Button>
                    )}
                </div>
            </form>
        </Container>
    )
})

PlanView.displayName = 'PlanView'
export default PlanView
