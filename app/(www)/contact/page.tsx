import Container from 'components/Containers'
import { Metadata } from 'next'
import React from 'react'
import { Icon, IconProps } from '@/components/Icon'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'İletişim',
    description: 'İletişim bilgilerim',
    keywords: 'İletişim, İletişim bilgileri, İletişim bilgilerim',
}

export default async function Contact() {
    async function handleSubmit(data: FormData) {
        'use server'
        const res = await fetch('/api/contact', {
            method: 'POST',
            body: data,
        })
        const json = await res.json()
        console.log(json)
    }

    return (
        <Container title='İletişim' description='İletişim bilgilerim'>
            <div className='flex flex-col gap-3'>
                <Section icon='mail' title='E-Posta'>
                    <a href='mailto:mehmetyigityalim@gmail.com' className='text-blue-500 hover:underline'>
                        mehmetyigityalim@gmail.com
                    </a>
                </Section>
                <Section icon='linkedin' title='LinkedIn'>
                    <a href='https://linkedin.com/in/yigityalim' className='text-blue-500 hover:underline'>
                        linkedin.com/in/yigityalim
                    </a>
                </Section>
                <Section icon='phone' title='Telefon'>
                    <a href='tel:+905000000000' className='text-blue-500 hover:underline'>
                        +90 500 000 00 00
                    </a>
                </Section>
                <Section icon='map-pin' title='Konum'>
                    Ankara, Turkey | Muğla, Turkey
                </Section>
                <Section icon='book-open' title='Eğitim'>
                    Başkent University, Management Information Systems
                </Section>
                <Section icon='user' title='Pozisyon'>
                    Freelancer
                </Section>
            </div>
            <form action={handleSubmit} className='flex w-full flex-col gap-3'>
                <h1 className='text-2xl font-semibold'>Bana Ulaşın</h1>
                <Input type='text' name='name' placeholder='Adınız' />
                <Input type='email' name='email' placeholder='E-Posta Adresiniz' />
                <Textarea name='message' placeholder='Mesajınız' />
                <Button type='submit' variant='ghost' size='sm'>
                    Gönder
                </Button>
            </form>
        </Container>
    )
}

function Section({
    children,
    icon,
    title,
}: Readonly<{ children: React.ReactNode; icon: IconProps['name']; title: string }>) {
    return (
        <div className='flex flex-col items-start justify-center gap-y-1'>
            <div className='mb-2 flex items-center gap-2'>
                <Icon name={icon} size={24} className='text-blue-500' />
                <h2 className='text-lg font-semibold'>{title}</h2>
            </div>
            <div className='w-full rounded-md bg-gray-100 p-2 text-lg font-medium dark:bg-zinc-800'>{children}</div>
        </div>
    )
}
