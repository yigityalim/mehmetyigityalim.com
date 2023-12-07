import React from 'react'
import { Pricing } from 'utils/pricing'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { cn, formatPrice } from '@/utils'

type PricingCardProps = Readonly<{
    pricing: Pricing
}>

export function PricingCard({ pricing }: PricingCardProps): React.ReactElement {
    return (
        <div className='relative min-h-full w-full' key={pricing.id}>
            <SubCard
                className={pricing.color?.backdrop}
                condition={pricing.mostPopular ?? pricing.recommended}
                type='backdrop'
            />
            <Card
                className={cn('relative h-full', (pricing.mostPopular || pricing.recommended) && pricing.color?.border)}
            >
                <SubCard
                    text={pricing.mostPopular ? 'En Popüler' : 'Önerilen'}
                    condition={pricing.mostPopular ?? pricing.recommended}
                    type='top'
                    className={pricing.color?.top}
                />
                <CardHeader>
                    <h1 className={cn('font-poppins text-3xl font-bold', pricing.color?.heading)}>{pricing.name}</h1>
                    <CardTitle className='font-noto-sans'>
                        {formatPrice(pricing.price)}
                        <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>min.</span>
                    </CardTitle>
                    <CardDescription className='text-xs'>{pricing?.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-start gap-y-2'>
                    <SubCard text={`${pricing.pageNumber} Sayfa`} condition={pricing.pageNumber > 1} type='feature' />
                    <SubCard
                        text={`${pricing.revision} Revizyon Hakkı`}
                        condition={pricing.revision > 0}
                        type='feature'
                    />
                    <SubCard
                        text={
                            pricing.framework === 'Vite.js'
                                ? 'Vite.js | Next.js ile geliştirme'
                                : (pricing.framework as string)
                        }
                        condition={Boolean(pricing.framework)}
                        type='feature'
                    />
                    <SubCard text='TypeScript' condition={pricing.typeScript} type='feature' />
                    <SubCard text='Tasarım' condition={pricing.design} type='feature' />
                    <SubCard text='Testing' condition={pricing.testing} type='feature' />
                    <SubCard text='Oturum İşlemleri' condition={pricing.auth} type='feature' />
                    <SubCard text='Ödeme Sistemi' condition={pricing.payment} type='feature' />
                    <SubCard text='SEO Optimizasyonu' condition={pricing.seo} type='feature' />
                    <SubCard text='Analitik' condition={pricing.analytics} type='feature' />
                    <SubCard text='Hosting' condition={pricing.hosting} type='feature' />
                    <SubCard text='DNS' condition={pricing.dns} type='feature' />
                    <SubCard text='Çoklu Dil Desteği' condition={pricing.i18n} type='feature' />
                </CardContent>
                <CardFooter
                    className={cn(
                        'pt-auto',
                        pricing.button.length === 1 ? 'justify-center' : 'justify-between gap-x-2'
                    )}
                >
                    {pricing.button.map(({ id, colorVariant, supPage, href, text }) => (
                        <Button key={id} className='w-full gap-x-2 shadow-2xl' variant={colorVariant} size='sm' asChild>
                            <Link href={supPage ? href : `/pricing/${href}`}>
                                {text} <ArrowRight className='h-4 w-4' />
                            </Link>
                        </Button>
                    ))}
                </CardFooter>
            </Card>
        </div>
    )
}

type ValueOrUndefined<T> = T | undefined
type Nullable<T> = T | null
type SubCardProps = {
    text?: string
    condition?: boolean
    type?: ValueOrUndefined<'feature' | 'backdrop' | 'top'>
    className?: string
}

export function SubCard({ text, condition, type, className }: SubCardProps): Nullable<React.ReactElement> {
    const classNames = cn(className, {
        'absolute -inset-0.5 rounded-lg opacity-75 animate-tilt blur transition duration-1000 group-hover:opacity-100':
            type === 'backdrop',
        'absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-2 py-1 font-semibold': type === 'top',
        'inline-flex w-full flex-row items-center justify-start gap-x-2': type === 'feature',
    })

    return condition ? (
        <div className={type ? classNames : className}>
            {type === 'feature' ? (
                <>
                    <CheckCircle2 className='h-4 w-4' /> {text}
                </>
            ) : (
                text
            )}
        </div>
    ) : null
}
