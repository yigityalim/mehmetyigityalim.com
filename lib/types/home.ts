export type Home = {
    id: string
    title: string
    picture: {
        url: string
        width: number
        height: number
    }
    description: string
    social: Social[]
}

export type Social = {
    id: string
    title: string
    url: string
    color: {
        hex: string
    }[]
    username: string
    social: string
}

export type HomeWithoutSocialAndDescription = Omit<Home, 'social' | 'description'>
