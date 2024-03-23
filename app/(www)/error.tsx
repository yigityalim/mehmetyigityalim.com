'use client'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const [copy, setCopy] = useState(false)
    useEffect(() => {
        console.error(error)
    }, [error])

    async function copyToClipboard() {
        setCopy(true)
        await navigator.clipboard.writeText(error.digest ?? "'digest' değeri yok.")
        setTimeout(() => {
            setCopy(false)
        }, 3000)
    }

    return (
        <Container className='w-full'>
            <h2 className='text-primary-500 text-3xl font-bold'>Bir şeyler ters gitmiş olabilir mi? 🤔</h2>
            <Accordion className='w-full' type='single' collapsible>
                <AccordionItem value={error.message}>
                    <AccordionTrigger>Hatayı gör:</AccordionTrigger>
                    <AccordionContent>
                        <h1 className='text-xl font-bold text-black dark:text-white'>{error.message}</h1>
                        <pre className='relative mb-4 mt-2 max-h-[650px] overflow-x-auto rounded-lg bg-zinc-200 p-4 text-black dark:bg-zinc-900 dark:text-white'>
                            <code className='block'>{error.stack}</code>
                        </pre>
                        <hr className='my-4' />
                        <p className='mb-4 text-sm font-semibold text-black text-opacity-80 dark:text-white'>
                            Bu hata, <code>{error.digest}</code> koduyla izlenebilir. Lütfen bu kodu bana bildirin.
                        </p>
                        <Button
                            variant='secondary'
                            size='sm'
                            onClick={copyToClipboard}
                            className='w-full text-base font-bold'
                        >
                            {copy ? 'Kopyalandı!' : 'Kodu Kopyala'}
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button variant='destructive' className='w-full' size='sm' onClick={() => reset()}>
                Tekrar Dene
            </Button>
        </Container>
    )
}
