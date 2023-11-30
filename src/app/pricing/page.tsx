import React from 'react'
import Container from 'components/Containers'
import pricing from 'utils/pricing'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/utils'
import Link from 'next/link'

export default function Pricing(): React.JSX.Element {
    return (
        <Container>
            <h1 className='m-8 text-4xl font-bold leading-tight tracking-wide'>
                Projelerim için fiyatlandırma listesi
            </h1>
            <div className='flex w-full flex-col items-center justify-center gap-y-8 md:flex-row md:items-stretch md:justify-start md:gap-x-8 md:gap-y-0'>
                {pricing.map((pricing) => (
                    <div className='relative min-h-full w-full' key={pricing.id}>
                        {pricing.mostPopular && (
                            <div className='animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
                        )}
                        <Card
                            className={cn(
                                'relative h-full',
                                pricing.mostPopular &&
                                    'animate-tilt z-50 border-2 border-indigo-400 dark:border-indigo-700'
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
                                <CardTitle>
                                    {pricing.price !== 'Custom' ? `${pricing.price} ₺` : pricing.price}
                                </CardTitle>
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
                                    {pricing.framework === 'Vite.js'
                                        ? 'Vite.js | Next.js ile geliştirme'
                                        : pricing.framework}
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
                                        className='w-full gap-x-2'
                                        variant={button.border ? 'default' : 'secondary'}
                                        size='sm'
                                        asChild
                                    >
                                        <Link href={`/pricing/${button.href}`}>
                                            {button.text} <ArrowRight className='h-4 w-4' />
                                        </Link>
                                    </Button>
                                ))}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    )
}
