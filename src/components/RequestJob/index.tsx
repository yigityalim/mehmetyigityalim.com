'use client'
import React, { useEffect, useState } from 'react'
import { IoLanguageOutline } from 'react-icons/io5'
import { VscFeedback } from 'react-icons/vsc'
import { Button } from 'components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import ResendForm from 'components/RequestProject/form'

type RequestJobProps = Readonly<{}>

export default function RequestJob(props: RequestJobProps): React.JSX.Element {
    const [language, setLanguage] = useState<'tr' | 'en'>(
        () => (localStorage.getItem('requestProjectLanguage') as 'tr' | 'en') ?? 'tr'
    )

    useEffect(() => {
        const preferedLanguage = localStorage.getItem('requestProjectLanguage') as 'tr' | 'en'
        if (preferedLanguage) {
            setLanguage(preferedLanguage)
        } else {
            localStorage.setItem('requestProjectLanguage', language)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('requestProjectLanguage', language)
    }, [language])

    const handleLanguageToggle = () => {
        setLanguage(language === 'tr' ? 'en' : 'tr')
        localStorage.setItem('requestProjectLanguage', language === 'tr' ? 'en' : 'tr')
    }

    return (
        <div className='background-animate flex w-full flex-row items-center justify-between gap-x-2 rounded bg-gradient-to-r from-pink-500 via-purple-40 via-red-500 to-blue-50 p-4'>
            <div className='flex flex-row items-center justify-center gap-x-2'>
                <h1>{language === 'tr' ? 'İş Teklifi gönder' : 'Request Job'}</h1>
                <button
                    className='inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors disabled:pointer-events-none disabled:opacity-50'
                    onClick={handleLanguageToggle}
                >
                    <IoLanguageOutline />
                </button>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size='icon' className='text-lg'>
                        <VscFeedback />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>İş Teklifi Başvuru Formu</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data
                            from our servers.
                        </DialogDescription>
                        <ResendForm />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
