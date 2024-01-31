import { BsInstagram, BsLinkedin, BsSnapchat, BsDiscord, BsSpotify, BsGithub } from 'react-icons/bs'
import { FaXTwitter, FaSquareThreads } from 'react-icons/fa6'
import React from 'react'
import hygraph, { gql } from '@/graphql'
import { Button } from 'components/ui/button'
import { Author } from 'lib/types/Author'
import { cn } from '@/utils'

type Props = Author['social'][number] & {
    text?: boolean
    iterator?: number
}

export default async function SocialMedia(props: Props): Promise<React.JSX.Element> {
    const Icon = socials.find((s) => s.title === props.title)?.icon
    return (
        <Button
            className={cn(
                'w-full gap-x-2 font-semibold transition-all duration-200 hover:bg-gray-700 hover:text-white',
                props.iterator === 3 && 'last:col-span-2'
            )}
            size='sm'
            asChild={true}
        >
            <a className='flex w-full items-center justify-center' href={props.url}>
                {Icon}
                {props.text && <span className='ml-2'>Takip Et</span>}
            </a>
        </Button>
    )
}

type IconProps = {
    icon: React.ReactNode
    title: string
    url: string
}

const socials = [
    {
        icon: <BsInstagram size={24} />,
        title: 'instagram',
        url: 'https://www.instagram.com/mehmet_yigit_yalim',
    },
    {
        icon: <FaXTwitter size={24} />,
        title: 'twitter',
        url: 'https://twitter.com/yigityalim',
    },
    {
        icon: <BsLinkedin size={24} />,
        title: 'linkedin',
        url: 'https://www.linkedin.com/in/yigityalim',
    },
    {
        icon: <BsSnapchat size={24} />,
        title: 'snapchat',
        url: 'https://www.snapchat.com/add/yigityalim',
    },
    {
        icon: <FaSquareThreads size={24} />,
        title: 'threads',
        url: 'https://www.threads.net/yigityalim',
    },
    {
        icon: <BsDiscord size={24} />,
        title: 'discord',
        url: 'https://discord.gg/yigityalim',
    },
    {
        icon: <BsSpotify size={24} />,
        title: 'spotify',
        url: 'https://open.spotify.com/user/yigityalim',
    },
    {
        icon: <BsGithub size={24} />,
        title: 'github',
        url: 'https://github.com/yigityalim',
    },
] as IconProps[]
