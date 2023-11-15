import React from 'react'
import { type Language, useLanguage } from 'store/language'
import { Button, ButtonProps } from 'components/ui/button'

const Languages: { name: string; code: string }[] = [
    {
        name: 'Türkçe',
        code: 'tr',
    },
    {
        name: 'English',
        code: 'en',
    },
]

export default function LanguageSwitch(): React.JSX.Element {
    const { language, setLanguage } = useLanguage()
    return (
        <div className='flex w-full items-center justify-center gap-2'>
            {Languages.map(({ name, code }) => (
                <Button
                    key={code}
                    variant={code === language ? 'default' : ('secondary' as ButtonProps['variant'])}
                    onClick={() => setLanguage(code as Language)}
                >
                    {name}
                </Button>
            ))}
        </div>
    )
}
