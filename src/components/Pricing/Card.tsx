import React from 'react'
import { Pricing } from 'utils/pricing'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { cn, formatPrice } from '@/utils'

export function PricingCard({ pricing }: Readonly<{ pricing: Pricing }>) {
    return (
        <div className='relative min-h-full w-full' key={pricing.id}>
            <RenderBackdrop
                condition={pricing.mostPopular ?? pricing.recommended}
                className={pricing.color?.backdrop}
            />
            <Card
                className={cn('relative h-full', (pricing.mostPopular || pricing.recommended) && pricing.color?.border)}
            >
                <RenderTop
                    condition={pricing.mostPopular ?? pricing.recommended}
                    className={pricing.color?.top}
                    text={pricing.mostPopular ? 'En Popüler' : 'Önerilen'}
                />
                <CardHeader>
                    <h1 className={cn('text-3xl font-bold', pricing.color?.heading)}>{pricing.name}</h1>
                    <CardTitle>
                        {formatPrice(pricing.price)}
                        <span className='ml-1 text-xs text-gray-200 dark:text-gray-400'>min.</span>
                    </CardTitle>
                    <CardDescription className='text-xs'>{pricing?.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-start gap-y-2'>
                    <RenderFeature text={`${pricing.pageNumber} Sayfa`} condition={pricing.pageNumber > 1} />
                    <RenderFeature text={`${pricing.revision} Revizyon Hakkı`} condition={pricing.revision > 0} />
                    <RenderFeature
                        text={
                            pricing.framework === 'Vite.js'
                                ? 'Vite.js | Next.js ile geliştirme'
                                : (pricing.framework as string)
                        }
                        condition={Boolean(pricing.framework)}
                    />
                    <RenderFeature text='TypeScript' condition={pricing.typeScript} />
                    <RenderFeature text='Tasarım' condition={pricing.design} />
                    <RenderFeature text='Testing' condition={pricing.testing} />
                    <RenderFeature text='Oturum İşlemleri' condition={pricing.auth} />
                    <RenderFeature text='Ödeme Sistemi' condition={pricing.payment} />
                    <RenderFeature text='SEO Optimizasyonu' condition={pricing.seo} />
                    <RenderFeature text='Analitik' condition={pricing.analytics} />
                    <RenderFeature text='Hosting' condition={pricing.hosting} />
                    <RenderFeature text='DNS' condition={pricing.dns} />
                    <RenderFeature text='Çoklu Dil Desteği' condition={pricing.i18n} />
                </CardContent>
                <CardFooter
                    className={cn(
                        'pt-auto',
                        pricing.button.length === 1 ? 'justify-center' : 'justify-between gap-x-2'
                    )}
                >
                    {pricing.button.map((button) => (
                        <Button
                            key={button.id}
                            className='w-full gap-x-2 shadow-2xl'
                            variant={button.colorVariant}
                            size='sm'
                            asChild
                        >
                            <Link href={button.supPage ? button.href : `/pricing/${button.href}`}>
                                {button.text} <ArrowRight className='h-4 w-4' />
                            </Link>
                        </Button>
                    ))}
                </CardFooter>
            </Card>
        </div>
    )
}

type ValueOrUndefined<T> = T | undefined

function RenderFeature({ text, condition }: Readonly<{ text: string; condition: boolean }>): React.ReactElement | null {
    return condition ? (
        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
            <CheckCircle2 className='h-4 w-4' /> {text}
        </span>
    ) : null
}

function RenderBackdrop({
    condition,
    className,
}: Readonly<{
    condition: ValueOrUndefined<boolean>
    className: ValueOrUndefined<string>
}>): React.ReactElement | null {
    return condition ? (
        <div
            className={cn(
                'absolute -inset-0.5 animate-tilt rounded-lg opacity-75 blur transition duration-1000 group-hover:opacity-100',
                className
            )}
        />
    ) : null
}

function RenderTop({
    condition,
    className,
    text,
}: Readonly<{
    condition: ValueOrUndefined<boolean>
    className: ValueOrUndefined<string>
    text: string
}>): React.ReactElement | null {
    return condition ? (
        <div
            className={cn(
                'absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-2 py-1 font-semibold',
                className
            )}
        >
            {text}
        </div>
    ) : null
}
