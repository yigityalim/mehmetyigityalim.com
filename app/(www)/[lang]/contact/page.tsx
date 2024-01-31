import Container from 'components/Containers'
import { Metadata } from 'next'
import React from 'react'
import { Mail, Linkedin, Phone, MapPin, BookOpen, User } from 'lucide-react' // Icons for contacts

export const metadata: Metadata = {
    title: 'İletişim',
    description: 'İletişim bilgilerim',
    keywords: 'İletişim, İletişim bilgileri, İletişim bilgilerim',
}

export default function Contact() {
    return (
        <Container title='İletişim' description='İletişim bilgilerim'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <Section icon={<Mail size={20} />} title='E-Posta'>
                    <a href='mailto:mehmetyigityalim@gmail.com' className='text-blue-500 hover:underline'>
                        mehmetyigityalim@gmail.com
                    </a>
                </Section>
                <Section icon={<Linkedin size={20} />} title='LinkedIn'>
                    <a href='https://linkedin.com/in/yigityalim' className='text-blue-500 hover:underline'>
                        linkedin.com/in/yigityalim
                    </a>
                </Section>
                <Section icon={<Phone size={20} />} title='Telefon'>
                    <a href='tel:+905000000000' className='text-blue-500 hover:underline'>
                        +90 500 000 00 00
                    </a>
                </Section>
                <Section icon={<MapPin size={20} />} title='Konum'>
                    Ankara, Turkey | Muğla, Turkey
                </Section>
                <Section icon={<BookOpen size={20} />} title='Eğitim'>
                    Başkent University, Management Information Systems
                </Section>
                <Section icon={<User size={20} />} title='Pozisyon'>
                    Freelancer
                </Section>
            </div>
        </Container>
    )
}

function Section({
    children,
    icon,
    title,
}: Readonly<{ children: React.ReactNode; icon: React.ReactNode; title: string }>) {
    return (
        <div className='mb-4 flex flex-col items-start justify-center gap-y-1 rounded-md bg-gray-100 p-2 dark:bg-zinc-800'>
            <div className='flex items-center gap-2'>
                <div className='text-blue-500'>{icon}</div>
                <h2 className='text-lg font-semibold'>{title}</h2>
            </div>
            <p className='w-full text-lg font-medium'>{children}</p>
        </div>
    )
}
