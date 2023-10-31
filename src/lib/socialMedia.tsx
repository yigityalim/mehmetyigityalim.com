import { BsInstagram, BsLinkedin, BsSnapchat, BsDiscord, BsSpotify, BsGithub } from 'react-icons/bs'
import { FaXTwitter, FaSquareThreads } from 'react-icons/fa6'
import React from 'react'

type IconProps = Array<{
    icon: React.ReactNode
    title: string
    url: string
}>
export type IconType = {
    [key: string]: () => React.JSX.Element
}

export default [
    {
        icon: <BsInstagram />,
        title: 'instagram',
        url: 'https://www.instagram.com/mehmet_yigit_yalim',
    },
    {
        icon: <FaXTwitter />,
        title: 'twitter',
        url: 'https://twitter.com/yigityalim',
    },
    {
        icon: <BsLinkedin />,
        title: 'linkedin',
        url: 'https://www.linkedin.com/in/yigityalim',
    },
    {
        icon: <BsSnapchat />,
        title: 'snapchat',
        url: 'https://www.snapchat.com/add/yigityalim',
    },
    {
        icon: <FaSquareThreads />,
        title: 'threads',
        url: 'https://www.threads.net/yigityalim',
    },
    {
        icon: <BsDiscord />,
        title: 'discord',
        url: 'https://discord.gg/yigityalim',
    },
    {
        icon: <BsSpotify />,
        title: 'spotify',
        url: 'https://open.spotify.com/user/yigityalim',
    },
    {
        icon: <BsGithub />,
        title: 'github',
        url: 'https://github.com/yigityalim',
    },
] as IconProps
