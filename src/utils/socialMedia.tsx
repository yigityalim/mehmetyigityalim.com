import { BsInstagram, BsLinkedin, BsSnapchat, BsDiscord, BsSpotify, BsGithub } from 'react-icons/bs'
import { FaXTwitter, FaSquareThreads } from 'react-icons/fa6'
import React from 'react'
import hygraph, { gql } from '@/graphql'
import { Button } from 'components/ui/button'

type IconProps = {
    icon: React.ReactNode
    title: string
    url: string
}

const query = gql`
    query Social($id: ID) {
        author(where: { id: $id }) {
            id
            social {
                id
                title
                url
            }
        }
    }
`

type Social = {
    id: string
    social: {
        id: string
        title: string
        url: string
    }[]
}

export default async function SocialMedia({
    title,
    authorId,
    text,
}: {
    title: IconProps['title']
    authorId: string
    text?: boolean
}) {
    const { author } = await hygraph.request<{ author: Social }>(query, { id: authorId })
    const social = author.social.find((s) => s.title === title)
    const Icon = socials.find((s) => s.title === social?.title)?.icon
    if (!Icon) return null
    return (
        <Button
            className='w-full gap-x-2 font-semibold transition-all duration-200 hover:bg-gray-700 hover:text-white'
            size='sm'
        >
            {Icon} {text && 'Takip et'}
        </Button>
    )
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
