'use client'
import React from 'react'
import { notFound } from 'next/navigation'
import { useInView } from 'framer-motion'
import { toast } from 'sonner'
import { plans, features as featuresPrimitive } from '@/lib/plans'
import type { Feature, Plan } from '@/lib/types/plan'
import { cn, formatPrice } from '@/lib/utils'
import {
    Select as SelectPrimitive,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button, buttonVariants } from '@/components/ui/button'
import { planVariants } from '@/components/plan-card'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// TODO - Nextjs ve vite seçimlerinde şu an ikisi de seçilebilir halde, bunu düzelt.
// TODO - özellik ekleme ekranında seçileni üste atmayı, üsttekini elemanların belki checkbox yerine bir butonla seçilmesini dene. fiyat güncellemesi yapılacak. sonrasında da email istenip seçilen seçenekler gönderilecek.

export function PlanView({ type }: Readonly<{ type?: Plan['type'] }>): React.ReactElement {
    const priceRef = React.useRef<React.ElementRef<'h2'>>(null)
    const isInView = useInView(priceRef, { margin: `-88px` })
    const plan = plans.find((p) => p.type === type) ?? notFound()
    const buttonVariant = type === 'basic' ? 'default' : type === 'standart' ? 'indigo' : 'destructive'

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
    const [price, setPrice] = React.useState<number>(plan.price.yearly)

    React.useEffect(() => {
        // burada pageCount, revisionCount, selectedFeatures değiştiğinde fiyatı güncelle.
        const featurePrice = selectedFeatures.reduce((acc, feature) => {
            return isMonthly ? acc + feature.price.monthly : acc + feature.price.yearly
        }, 0)
        const pageCountPrice = pageCount * plan.pageCount.price
        const revisionCountPrice = revisionCount * plan.revisionCount.price
        // FIXME - aylık fiyatlandırmada yanlış fiyat veriyor. buradaki hesaplamada aylık ve yıllık sisteme artışı olmaması lazım.
        /*
        TODO - sayfa sayısı ve revizyon sayısı fiyatlandırması yapılacak. bunlar aylık veya yıllık hesaplanmayacak.
               sadece tek ödeme gibi ya da aylık veya yıllık ödemeede sadece ilk 3 ay hariç 9 ay hesaba eklenip
               ona göre gösterilmesi şeklinde ödeme sistemini konfigüre et.

        FIXME - Şu anki hesaplamada planın kendi features değerleri de hesabıa katılıyor. planın kendisinde olanları hesaba katmamak lazım.
         */
        const price = plan.price.yearly + (featurePrice + pageCountPrice + revisionCountPrice)
        setPrice(price)
    }, [
        pageCount,
        revisionCount,
        selectedFeatures,
        isMonthly,
        plan.pageCount.price,
        plan.revisionCount.price,
        plan.price.yearly,
    ])
    function sendData() {
        setData({ pageCount, revisionCount, features: selectedFeatures })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        toast.success(`Teklifiniz başarıyla oluşturuldu. !!Düzeltilecek!! Toplam Tutarınız ${formatPrice(price)}`, {
            description: 'Teklifiniz: ' + JSON.stringify(data),
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
        <div className='flex w-full flex-col items-start justify-center gap-y-8'>
            <div
                className={cn(
                    'fixed left-2 right-2 z-20 flex flex-row items-center justify-between gap-x-2 rounded-lg bg-card p-3 saturate-100 backdrop-blur-md transition-all duration-300 dark:bg-card dark:backdrop-blur-xl',
                    isInView ? '-bottom-full' : 'bottom-4'
                )}
            >
                <div className='flex flex-col items-start justify-between gap-y-2'>
                    <h1 className={cn(planVariants({ heading: type }), 'text-2xl font-bold italic')}>{plan.name}</h1>
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
                        toast.success('Fiyatlandırma değiştirildi.', {
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
                            toast.success('Sayfa sayısı değiştirildi.', {
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
                        Revizyon: <span className={cn('text-lg font-semibold', planText)}>{revisionCount}</span>
                    </p>

                    <SelectPrimitive
                        value={revisionCount.toString()}
                        onValueChange={(e) => {
                            setRevisionCount(Number(e))
                            toast.success('Revizyon sayısı değiştirildi.', {
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
            <div className='flex h-full w-full flex-col items-start justify-between gap-y-2'>
                <p className='text-lg font-semibold'>{feature.name}</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{feature.description}</p>
            </div>
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
        </div>
    )
}

PlanView.displayName = 'PlanView'
