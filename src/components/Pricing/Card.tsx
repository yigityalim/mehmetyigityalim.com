import React from 'react'
import { Pricing } from 'lib/pricing'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { cn, formatPrice } from '@/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'components/ui/hover-card'

type PricingCardProps = Readonly<{ pricing: Pricing }>

// FIXME - HTMLCSSJS kaldırılacak. yerine frontend vitejs ile backend dahil ve nextj ile hepsi birlikte olacak şekilde güncellenecek.
/* TODO *
vitejs frontend- backend dahil değil. (sadece mock data için type safe GET yapılacak.)
vitejs frontend- backend dahil. (burada hygrahp ile sadece GET isteği yapılıyor. belki supabase ile auth ve POST isteği yapılabilir.)
nextjs frontend- backend dahil.
 */
// FIXME - bu durumda üzerine hover olunca "hover card" komponenti çalışacak ve bilmeyen kullanıcıya info verilecek. bunuda pricing objesi ile yap
// TODO - isimler düzeltilecek. proje kaynak kodu daha okunaklı ve güzel olsun. menü falan utils yerine lib'e taşınacak.

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
                        <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>ort.</span>
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
                    <HoverCard>
                        <HoverCardTrigger className='w-full cursor-pointer'>
                            <SubCard
                                text={pricing.framework.find((fw) => fw.index)?.name}
                                condition={Boolean(pricing.framework)}
                                type='feature'
                            />
                        </HoverCardTrigger>
                        <HoverCardContent>
                            The React Framework – created and maintained by @vercel.{' '}
                            {pricing.framework.find((fw) => fw.index)?.name}
                        </HoverCardContent>
                    </HoverCard>
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
                        'mt-auto',
                        pricing.button.length === 1 ? 'justify-center' : 'justify-between gap-x-2'
                    )}
                >
                    {pricing.button.map(({ id, colorVariant, supPage, href, text }) => (
                        <Button key={id} className='w-full gap-x-2 shadow-2xl' variant={colorVariant} size='sm' asChild>
                            <Link href={supPage ? href : `/packages/${href}`}>
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
