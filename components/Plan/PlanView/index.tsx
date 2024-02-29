'use client'
import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { plans, features as featuresPrimitive } from '@/lib/plans'
import type { Feature, Plan } from '@/lib/types/plan'
import { cn, formatPrice } from 'lib/utils'
import Container from '@/components/Containers'
import { useInView } from 'framer-motion'
import {
    Select as SelectPrimitive,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { planVariants } from 'components/Plan/Card'
import { notFound } from 'next/navigation'
import { Checkbox } from 'components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function PlanView({ type }: Readonly<{ type?: Plan['type'] }>): React.ReactElement {
    const priceRef = React.useRef<React.ElementRef<'h2'>>(null)
    const isInView = useInView(priceRef, { margin: `-88px` })
    const plan = plans.find((p) => p.type === type) ?? notFound()
    const buttonVariant = type === 'basic' ? 'default' : type === 'standart' ? 'indigo' : 'destructive'
    const { toast } = useToast()

    const [isMonthly, setIsMonthly] = React.useState<boolean>(false)
    const [features, setFeatures] = React.useState<Feature[]>(() => {
        const featureKeys = Object.keys(featuresPrimitive).filter((key) =>
            plan.features.find((f) => f.id === featuresPrimitive[key].id)
        )
        return featureKeys.map((key) => featuresPrimitive[key])
    })
    const [selectedFeatures, setSelectedFeatures] = React.useState<Feature[]>(features)
    const [pageCount, setPageCount] = React.useState<number>(1)
    const [revisionCount, setRevisionCount] = React.useState<number>(1)
    const [openAddMore, setOpenAddMore] = React.useState<boolean>(false)
    const [data, setData] = React.useState<{
        pageCount: number
        revisionCount: number
        features: Feature[]
    }>({ pageCount: 1, revisionCount: 1, features: selectedFeatures })

    React.useEffect(() => {
        const value = plan.price.yearly * (isMonthly ? 1 / 12 : 1)
        const featuresPrice = selectedFeatures.reduce(
            (acc, f) => acc + (isMonthly ? f.price.monthly : f.price.yearly),
            0
        )
        const pageCountPrice = pageCount * 100
        const revisionCountPrice = revisionCount * 100
        const totalPrice = value + featuresPrice + pageCountPrice + revisionCountPrice
        console.log('Total Price:', totalPrice)

        setData({ pageCount, revisionCount, features: selectedFeatures })
    }, [isMonthly, pageCount, plan.price.yearly, revisionCount, selectedFeatures])
    function sendData() {
        setData({ pageCount, revisionCount, features: selectedFeatures })
        priceRef.current?.scrollIntoView({ behavior: 'smooth' })
        toast({
            title: 'Teklif Alındı',
            description: 'Teklifiniz alındı. En kısa sürede size dönüş yapılacaktır.',
        })
    }

    const planText = cn(
        type === 'basic'
            ? 'text-zinc-500 dark:text-zinc-400'
            : type === 'standart'
              ? 'text-indigo-500 dark:text-indigo-400'
              : 'text-red-500 dark:text-red-400'
    )

    const hasFeatures = Object.keys(featuresPrimitive).filter(
        (f) => !features.find((feature) => feature.id === featuresPrimitive[f].id)
    )

    return (
        <Container className='items-start'>
            <div className='flex w-full flex-col items-start justify-center gap-y-8'>
                <div
                    className={cn(
                        'fixed left-2 right-2 flex flex-row items-center justify-between gap-x-2 rounded-lg bg-card p-3 transition-all duration-300 dark:bg-card',
                        isInView ? '-bottom-full' : 'bottom-4'
                    )}
                >
                    <div className='flex flex-col items-start justify-between gap-y-2'>
                        <h1 className={cn(planVariants({ heading: type }), 'text-2xl font-bold italic')}>
                            {plan.name}
                        </h1>
                        <h2 className='text-xl font-bold italic text-gray-900 dark:text-gray-200'>
                            {formatPrice(plan.price[isMonthly ? 'monthly' : 'yearly'])}
                        </h2>
                    </div>
                </div>
                <h1 className={cn(planVariants({ heading: type }), 'text-5xl font-bold italic')}>{plan.name}</h1>
                <div className='flex w-full items-center justify-between gap-x-6'>
                    <h2 ref={priceRef} className='w-full text-4xl font-bold italic text-gray-900 dark:text-gray-200'>
                        {formatPrice(plan.price[isMonthly ? 'monthly' : 'yearly'])}
                        <span className='text-xl font-bold italic text-gray-600 dark:text-gray-400'>
                            {isMonthly ? ' / ay' : ' / yıl'}
                        </span>
                    </h2>
                    <SelectPrimitive
                        value={isMonthly ? 'Aylık' : 'Yıllık'}
                        onValueChange={(e) => {
                            setIsMonthly(e === 'Aylık')
                            toast({
                                title: 'Fiyatlandırma değiştirildi',
                                description: `Fiyatlandırma ${e} olarak değiştirildi.`,
                            })
                        }}
                    >
                        <SelectTrigger className='h-8 w-[140px]'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Aylık'>Aylık</SelectItem>
                            <SelectItem value='Yıllık'>Yıllık</SelectItem>
                        </SelectContent>
                    </SelectPrimitive>
                </div>
                <p className='mb-4 text-lg text-gray-600 dark:text-gray-400'>{plan.description}</p>
                <div className='grid w-full grid-cols-1 gap-6'>
                    <h2 className='text-xl font-semibold'>Plan Özellikleri:</h2>
                    <h3 className='mb-2 font-semibold text-gray-600 dark:text-gray-400'>
                        Eklemek istediklerinize basarak ekleme işlemini gerçekleştirebilirsiniz.
                    </h3>
                    <Alert variant='destructive'>
                        <AlertCircle className='size-4' />
                        <AlertTitle>Bu sayfa daha geliştirme aşamasındadır.</AlertTitle>
                        <AlertDescription>Bu sayfada yapacağınız işlemler kaydedilmeyecektir.</AlertDescription>
                    </Alert>
                    <div className='flex w-full flex-col items-center justify-center gap-y-2'>
                        {features.map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                feature={feature}
                                plan={plan}
                                type={type}
                                selectedFeatures={selectedFeatures}
                                setSelectedFeatures={setSelectedFeatures}
                            />
                        ))}
                        {hasFeatures.length > 0 && (
                            <Collapsible open={openAddMore} onOpenChange={setOpenAddMore} className='w-full'>
                                <CollapsibleTrigger
                                    className={cn(
                                        'flex w-full flex-row items-center justify-start gap-x-2 rounded-lg border px-4 py-2',
                                        buttonVariants({ variant: buttonVariant })
                                    )}
                                >
                                    {openAddMore ? 'Özellik eklemeyi kapat...' : 'Daha fazla özellik ekle...'}
                                </CollapsibleTrigger>
                                <CollapsibleContent className='mt-2 flex w-full flex-col items-center justify-center gap-y-2'>
                                    {hasFeatures.map((f, i) => (
                                        <FeatureCard
                                            key={i}
                                            feature={featuresPrimitive[f]}
                                            plan={plan}
                                            type={type}
                                            selectedFeatures={selectedFeatures}
                                            setSelectedFeatures={setSelectedFeatures}
                                        />
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </div>
                    <div className='flex w-full items-center justify-between gap-x-2'>
                        <p className={cn('text-lg font-semibold', planVariants({ accent: type }))}>
                            Sayfa Sayısı: <span className={cn('text-lg font-semibold', planText)}>{pageCount}</span>
                        </p>

                        <SelectPrimitive
                            value={pageCount.toString()}
                            onValueChange={(e) => {
                                setPageCount(Number(e))
                                toast({
                                    title: 'Sayfa sayısı değiştirildi',
                                    description: `Sayfa sayısı ${e} olarak değiştirildi.`,
                                })
                            }}
                        >
                            <SelectTrigger className='h-8 w-[140px]'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: plan.pageCount.max }, (_, i) => (
                                    <SelectItem key={i} value={(i + 1).toString()}>
                                        {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectPrimitive>
                    </div>
                    <div className='flex w-full items-center justify-between gap-x-2'>
                        <p className={cn('text-lg font-semibold', planVariants({ accent: type }))}>
                            Revizyon: <span className={cn('text-lg font-semibold', planText)}>{pageCount}</span>
                        </p>

                        <SelectPrimitive
                            value={revisionCount.toString()}
                            onValueChange={(e) => {
                                setRevisionCount(Number(e))
                                toast({
                                    title: 'Revizyon sayısı değiştirildi',
                                    description: `Revizyon sayısı ${e} olarak değiştirildi.`,
                                })
                            }}
                        >
                            <SelectTrigger className='h-8 w-[140px]'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: plan.revisionCount.max }, (_, i) => (
                                    <SelectItem key={i} value={(i + 1).toString()}>
                                        {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectPrimitive>
                    </div>
                </div>
                <div className='flex w-full items-center justify-start gap-x-2'>
                    <Button type='button' className='w-full' variant={buttonVariant} onClick={sendData}>
                        Teklif Al
                    </Button>
                </div>
            </div>
        </Container>
    )
}

type FeatureCardProps = Readonly<{
    feature: Feature
    selectedFeatures: Feature[]
    setSelectedFeatures: React.Dispatch<React.SetStateAction<Feature[]>>
    plan: Plan
    type: Plan['type']
}>

function FeatureCard({ feature, setSelectedFeatures, type, selectedFeatures }: FeatureCardProps): React.ReactElement {
    const [isChecked, setIsChecked] = React.useState<boolean>(
        selectedFeatures.find((f) => f.id === feature.id) !== undefined
    )
    return (
        <div
            onClick={() => setIsChecked((prev) => !prev)}
            key={feature.id}
            className={cn(
                'flex w-full flex-row items-center justify-start gap-4 rounded-lg border px-4 py-2',
                selectedFeatures.find((f) => f.id === feature.id)
                    ? type === 'basic'
                        ? 'border-zinc-200/20'
                        : type === 'standart'
                          ? 'border-indigo-400/20'
                          : 'border-red-500/20'
                    : 'border-gray-200 dark:border-gray-700'
            )}
        >
            <Checkbox
                id={feature.id}
                className={planVariants({ accent: type })}
                checked={isChecked}
                onCheckedChange={(e) => {
                    if (e) {
                        setSelectedFeatures((prev) => [...prev, feature])
                    } else {
                        setSelectedFeatures((prev) => prev.filter((f) => f.id !== feature.id))
                    }
                }}
            />
            <div className='flex h-full w-full flex-col items-start justify-between gap-y-2'>
                <p className='text-lg font-semibold'>{feature.name}</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{feature.description}</p>
            </div>
        </div>
    )
}

PlanView.displayName = 'PlanView'
