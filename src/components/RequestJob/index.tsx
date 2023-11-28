'use client'
import React, { useEffect, useState } from 'react'

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

    return (
        <div className='w-full bg-blue-500 p-4'>
            <h1>{language === 'tr' ? 'İş Teklifi gönder' : 'Request Job'}</h1>
            <button onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}>dil</button>
        </div>
    )
}
