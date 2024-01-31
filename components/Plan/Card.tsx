import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { cn, formatPrice } from '@/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'components/ui/hover-card'
import type { Plan } from 'lib/types/plan'

type planageCardProps = Readonly<{ plan: Plan }>

export function PlanCard({ plan }: planageCardProps): React.ReactElement {
    return (
        <div className='relative min-h-full w-full' key={plan.id}>
            <SubCard
                className={plan.color?.backdrop}
                condition={plan.mostPopular ?? plan.recommended}
                type='backdrop'
            />
            <Card className={cn('relative h-full', (plan.mostPopular || plan.recommended) && plan.color?.border)}>
                <SubCard
                    text={plan.mostPopular ? 'En Popüler' : 'Önerilen'}
                    condition={plan.mostPopular ?? plan.recommended}
                    type='top'
                    className={plan.color?.top}
                />
                <CardHeader>
                    <h1 className={cn('font-poppins text-3xl font-bold', plan.color?.heading)}>{plan.name}</h1>
                    <CardTitle className='font-noto-sans'>
                        {formatPrice(plan.price)}
                        <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>ort.</span>
                    </CardTitle>
                    <CardDescription className='text-xs'>{plan?.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-start gap-y-2'>
                    <SubCard
                        text={`${plan.pageNumbers.page} Sayfa`}
                        condition={plan.pageNumbers.page > 1}
                        type='feature'
                    />
                    <SubCard
                        text={`${plan.revisions.revision} Revizyon Hakkı`}
                        condition={plan.revisions.revision > 0}
                        type='feature'
                    />
                    <HoverCard>
                        <HoverCardTrigger className='hidden w-full cursor-pointer'>
                            <SubCard
                                text={plan.framework.find((fw) => fw.index)?.name}
                                condition={Boolean(plan.framework)}
                                type='feature'
                            />
                        </HoverCardTrigger>
                        <HoverCardContent>
                            The React Framework – created and maintained by @vercel.{' '}
                            {plan.framework.find((fw) => fw.index)?.name}
                        </HoverCardContent>
                    </HoverCard>
                    <SubCard text='TypeScript' condition={plan.optionals.typeScript.has} type='feature' />
                    <SubCard text='Tasarım' condition={plan.optionals.design.has} type='feature' />
                    <SubCard text='Testing' condition={plan.optionals.testing.has} type='feature' />
                    <SubCard text='Oturum İşlemleri' condition={plan.optionals.auth.has} type='feature' />
                    <SubCard text='Ödeme Sistemi' condition={plan.optionals.payment.has} type='feature' />
                    <SubCard text='SEO Optimizasyonu' condition={plan.optionals.seo.has} type='feature' />
                    <SubCard text='Analitik' condition={plan.optionals.analytics.has} type='feature' />
                    <SubCard text='Hosting' condition={plan.optionals.hosting.has} type='feature' />
                    <SubCard text='DNS' condition={plan.optionals.dns.has} type='feature' />
                    <SubCard text='Çoklu Dil Desteği' condition={plan.optionals.i18n.has} type='feature' />
                </CardContent>
                <CardFooter
                    className={cn('mt-auto', plan.button.length === 1 ? 'justify-center' : 'justify-between gap-x-2')}
                >
                    {plan.button.map(({ colorVariant, supPage, href, text }) => (
                        <Button
                            key={crypto.randomUUID().toString()}
                            className='w-full gap-x-2 shadow-2xl'
                            variant={colorVariant}
                            size='sm'
                            asChild
                        >
                            <Link href={supPage ? href : `/plans/${href}`}>
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
    const classNames: string = cn(className, {
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
