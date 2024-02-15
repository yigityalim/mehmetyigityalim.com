import { ButtonProps } from '@/components/ui/button'

interface Plan {
    id: string
    type: 'basic' | 'standart' | 'advanced' | null | undefined
    name: string
    description: string
    top?: string
    price: {
        monthly: number
        yearly: number
    }
    features: Feature[]
    details: string[]
    href: string
    buttonText: string
    buttonVariant: ButtonProps['variant']
}

type Features = Record<string, Feature>
type Feature = {
    id: string
    name: string
    description: string
    price: {
        monthly: number
        yearly: number
    }
}

export type { Plan, Features, Feature }
