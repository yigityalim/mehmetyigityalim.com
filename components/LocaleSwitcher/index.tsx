'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import i18n from '@/i18n.config'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utils'

export default function LocaleSwitcher(): React.ReactElement {
    const pathName = usePathname()
    const router = useRouter()
    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    const localePathname: string = pathName.split('/')[1]
    const placeholder = (
        localePathname === 'tr' ? 'Dil Seçiniz' : 'Select Language'
    ) as string
    const selectMessage = ['Türkçe', 'English']

    return (
        <Select defaultValue={localePathname} onValueChange={(locale) => router.push(redirectedPathName(locale))}>
            <SelectTrigger
                className={cn('w-full')}
                tabIndex={0}
                role='button'
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {i18n.locales.map((locale, index) => (
                    <SelectItem value={locale} key={locale} tabIndex={index + 1} className='z-[201]'>
                        {selectMessage[i18n.locales.indexOf(locale)]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}