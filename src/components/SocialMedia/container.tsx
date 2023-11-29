'use client'
import React, { useEffect } from 'react'
import { SocialMedia } from 'components/SocialMedia/socialMedia'
import { Social } from '@/lib/types/home'
import { Switch } from 'components/ui/switch'

type SocialMediaSwitchProps = Readonly<{
    social: Social[]
}>

type SocialMediaSwitchType = 'grid' | 'list'

export function SocialMediaSwitchContainer({ social }: SocialMediaSwitchProps): React.JSX.Element {
    const [socialMediaSwitch, setSocialMediaSwitch] = React.useState<SocialMediaSwitchType>('grid')

    useEffect(() => {
        const socialMediaSwitchLs = localStorage.getItem('socialMediaSwitch')
        if (socialMediaSwitchLs) {
            setSocialMediaSwitch(socialMediaSwitchLs as SocialMediaSwitchType)
        }

        return () => {
            localStorage.setItem('socialMediaSwitch', socialMediaSwitchLs as SocialMediaSwitchType)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('socialMediaSwitch', socialMediaSwitch)
    }, [socialMediaSwitch])

    return (
        <div className='flex w-full flex-col items-center justify-start gap-y-4'>
            <div className='flex w-full flex-row items-center justify-between'>
                <h4 className='text-xs font-semibold tracking-wide text-gray-800 dark:text-gray-600'>
                    Görünüm: {socialMediaSwitch === 'grid' ? 'Kare' : 'Liste'}
                </h4>
                <Switch
                    value={socialMediaSwitch}
                    checked={socialMediaSwitch === 'list'}
                    onCheckedChange={() => setSocialMediaSwitch(socialMediaSwitch === 'grid' ? 'list' : 'grid')}
                />
            </div>
            <SocialMedia social={social} type={socialMediaSwitch} />
        </div>
    )
}
