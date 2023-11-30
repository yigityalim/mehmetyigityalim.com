import React from 'react'
import { Metadata } from 'next'
import { Button } from 'components/ui/button'

export const metadata: Metadata = {
    title: 'Başlangıç Planı',
    description:
        'Temel web siteleri için ideal bir başlangıç. HTML, CSS ve JS ile oluşturulmuş, kullanımı kolay ve hızlı.',
}

export function BasicPlanView(): React.ReactElement {
    return (
        <>
            <h1 className='mb-4 text-4xl font-bold'>Başlangıç Planı</h1>
            <p className='mb-6 text-lg text-gray-600'>
                Temel web siteleri için ideal bir başlangıç. HTML, CSS ve JS ile oluşturulmuş, kullanımı kolay ve hızlı.
            </p>
            <span className='text-2xl font-bold text-gray-900 dark:text-gray-200'>5000₺</span>
            <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className='mb-2 text-xl font-semibold'>Plan Özellikleri:</h2>
                <ul className='list-inside list-disc text-gray-700 dark:text-gray-300'>
                    <li>Sayfa Sayısı: 3</li>
                    <li>Revizyon Sayısı: 2</li>
                    <li>Framework: HTML, CSS, JS</li>
                    <li>TypeScript Desteği: Yok</li>
                    <li>Testing: Yok</li>
                    <li>Tasarım: Var</li>
                    <li>Authentication (Auth): Yok</li>
                    <li>Payment: Yok</li>
                    <li>SEO: Yok</li>
                    <li>Analytics: Var</li>
                    <li>Hosting: Yok</li>
                    <li>DNS: Var</li>
                    <li>Internationalization (i18n): Yok</li>
                </ul>
                <div className='flex flex-col justify-between gap-4' style={{ height: 'fit-content' }}>
                    <Button>Hemen Teklif Ver</Button>
                </div>
            </div>
        </>
    )
}
