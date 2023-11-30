import React from 'react'
import { Pricing } from 'utils/pricing'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { cn } from '@/utils'

export function PricingCard({ pricing }: Readonly<{ pricing: Pricing }>) {
    const renderFeature = (text: string, condition: boolean): React.ReactElement | null => {
        return condition ? (
            <span className='inline-flex w-full flex-row items-center justify-start gap-x-2'>
                <CheckCircle2 className='h-4 w-4' /> {text}
            </span>
        ) : null
    }

    return (
        <div className='relative min-h-full w-full' key={pricing.id}>
            {pricing.mostPopular && (
                <div className='absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-pink-900 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            )}
            {pricing.recommended && (
                <div className='absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-red-900 to-yellow-600 opacity-75 blur transition duration-1000 group-hover:opacity-100'></div>
            )}
            <Card
                className={cn(
                    'relative h-full',
                    pricing.mostPopular && 'z-50 animate-tilt border-2 border-indigo-400 dark:border-indigo-700',
                    pricing.recommended && 'z-40 animate-tilt border-2 border-red-500 dark:border-red-700'
                )}
            >
                {pricing.mostPopular && (
                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border border-indigo-500 bg-white px-2 py-1 text-indigo-500 dark:border-indigo-700 dark:bg-zinc-950 dark:text-indigo-400'>
                        En Popüler
                    </div>
                )}
                {pricing.recommended && (
                    <div className='absolute -top-4 left-1/2 -translate-x-1/2 rounded-md border border-red-500 bg-white px-2 py-1 text-red-500 dark:border-red-700 dark:bg-zinc-950 dark:text-red-400'>
                        Önerilen
                    </div>
                )}
                <CardHeader>
                    <h1
                        className={cn(
                            'text-3xl font-bold',
                            pricing.mostPopular && 'text-indigo-400 dark:text-indigo-700',
                            pricing.recommended && 'text-red-500',
                            !pricing.mostPopular && !pricing.recommended && 'text-zinc-900 dark:text-zinc-50'
                        )}
                    >
                        {pricing.name}
                    </h1>
                    <CardTitle className='gap-y-4'>
                        {typeof pricing.price === 'number' ? `${pricing.price} ₺` : pricing.price}
                    </CardTitle>
                    <CardDescription className='text-xs'>{pricing?.description}</CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center justify-start gap-y-2'>
                    {renderFeature(`${pricing.pageNumber} Sayfa`, true)}
                    {renderFeature(`${pricing.revision} Revizyon Hakkı`, true)}
                    {renderFeature(
                        pricing.framework === 'Vite.js'
                            ? 'Vite.js | Next.js ile geliştirme'
                            : (pricing.framework as string),
                        true
                    )}
                    {renderFeature('TypeScript desteği', pricing.typeScript)}
                    {renderFeature('Tasarım', pricing.design)}
                    {renderFeature('Testing', pricing.testing)}
                    {renderFeature('Oturum İşlemleri', pricing.auth)}
                    {renderFeature('Ödeme Sistemi', pricing.payment)}
                    {renderFeature('SEO', pricing.seo)}
                    {renderFeature('Analitik', pricing.analytics)}
                    {renderFeature('Hosting', pricing.hosting)}
                    {renderFeature('DNS', pricing.dns)}
                    {renderFeature('Çoklu Dil Desteği', pricing.i18n)}
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

export default PricingCard
