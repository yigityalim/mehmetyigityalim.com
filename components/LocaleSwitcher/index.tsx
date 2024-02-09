'use client'
import React from 'react'
import { locales, usePathname, useRouter } from 'lib/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from 'lib/utils'
import { useLocale } from 'next-intl'

export default function LocaleSwitcher(): React.ReactElement {
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()

    const placeholder = (locale === 'tr' ? 'Dil Seçiniz' : 'Select Language') as string
    const selectMessage = ['Türkçe', 'English']

    return (
        <Select onValueChange={(locale) => router.replace(pathname, { locale })} defaultValue={locale}>
            <SelectTrigger className={cn('w-full')} tabIndex={0} role="button">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {locales.map((locale, index) => (
                    <SelectItem value={locale} key={locale} tabIndex={index + 1} className='z-[201]'>
                        {selectMessage[index]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
