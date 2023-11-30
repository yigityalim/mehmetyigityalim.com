import React from 'react'
import { Pricing } from 'utils/pricing'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { cn } from '@/utils'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import Link from 'next/link'

export function PricingCard({ pricing }: Readonly<{ pricing: Pricing }>): React.JSX.Element {
    return (
        <div className='relative min-h-full w-full' key={pricing.id}>
            {pricing.mostPopular && (
                <div className='absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            )}
            <Card
                className={cn(
                    'relative h-full',
                    pricing.mostPopular && 'z-50 animate-tilt border-2 border-indigo-400 dark:border-indigo-700'
                )}
            >
                {pricing.mostPopular && (
                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-md bg-indigo-400 px-2 py-1 dark:bg-indigo-700'>
                        En Popüler
                    </div>
                )}
                {pricing.recommended && (
                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border border-zinc-200 bg-white px-2 py-1 dark:border-zinc-800 dark:bg-zinc-950'>
                        Önerilen
                    </div>
                )}
                <CardHeader>
                    <CardTitle>{typeof pricing.price !== 'number' ? `${pricing.price} ₺` : pricing.price}</CardTitle>
                    <CardDescription className='text-xs'>{pricing?.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-start gap-y-2'>
                    <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                        <CheckCircle2 className='h-4 w-4' /> {pricing.pageNumber} Sayfa
                    </span>
                    <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                        <CheckCircle2 className='h-4 w-4' /> {pricing.revision} Revizyon Hakkı
                    </span>
                    <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                        <CheckCircle2 className='h-4 w-4' />{' '}
                        {pricing.framework === 'Vite.js' ? 'Vite.js | Next.js ile geliştirme' : pricing.framework}
                    </span>
                    {pricing.typeScript && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> TypeScript desteği
                        </span>
                    )}
                    {pricing.design && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Tasarım
                        </span>
                    )}
                    {pricing.testing && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Test
                        </span>
                    )}
                    {pricing.auth && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Oturum işlemleri
                        </span>
                    )}
                    {pricing.payment && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Ödeme işlemleri
                        </span>
                    )}
                    {pricing.seo && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> SEO Optimizasyonu
                        </span>
                    )}
                    {pricing.analytics && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Analitik
                        </span>
                    )}
                    {pricing.hosting && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Hosting
                        </span>
                    )}
                    {pricing.dns && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> DNS
                        </span>
                    )}
                    {pricing.i18n && (
                        <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                            <CheckCircle2 className='h-4 w-4' /> Çoklu Dil Desteği
                        </span>
                    )}
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
                            variant={button.border ? 'default' : 'secondary'}
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
