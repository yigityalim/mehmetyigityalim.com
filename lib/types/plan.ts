import { ButtonProps } from 'components/ui/button'

export type Framework = 'HTML, CSS, JS' | 'Vite.js' | 'Next.js'
export type FrameworkType = {
    id: number
    index?: boolean
    name: Framework
    description: string
    cost: number
}

export interface Plan {
    id: string
    name: string
    type: 'basic' | 'standart' | 'advanced'
    description?: string
    price: number
    pageNumbers: PageNumbers
    revisions: Revision
    framework: Array<FrameworkType>
    optionals: Optionals
    mostPopular?: boolean
    recommended?: boolean
    color?: Color
    button: Array<Button>
}

type PageNumbers = {
    page: number
    min: number
    max: number
    cost: number
}
type Revision = {
    revision: number
    min: number
    max: number
    cost: number
}

export interface Optionals<T = Optional> {
    typeScript: T
    testing: T
    design: T
    auth: T
    payment: T
    seo: T
    analytics: T
    hosting: T
    dns: T
    i18n: T
}

type Optional<T = {}> = T extends boolean
    ? boolean
    : {
          has: boolean
          cost: number
      }

export type Button = {
    border: boolean
    text: string
    href: string
    colorVariant?: ButtonProps['variant']
    [key: string]: any
}

export type Color = {
    heading: string
    backdrop?: string
    border?: string
    top?: string
    icon?: string
    button?: string
    addPrice?: string
}

export type OptionPrices = {
    pageNumber: number
    revision: number
    framework: {
        tech: Framework
        cost: number
    }[]
    typeScript: number
    testing: number
    design: number
    auth: number
    payment: number
    seo: number
    analytics: number
    hosting: number
    dns: number
    i18n: number
}

export type HasAddPlan = {
    type: Plan['type']
    add: Array<keyof OptionPrices>
    priceValue: {
        min: number
        max: number
    }
    [key: string]: any
}

type t = HasAddPlan['add'][number]
