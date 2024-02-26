import React from 'react'
import { SiTailwindcss, SiFramer, SiRedux } from '@icons-pack/react-simple-icons'

export default [
    {
        key: 'tailwindcss',
        name: 'TailwindCSS',
        tech: <SiTailwindcss size={32} />,
    },
    {
        key: 'framer-motion',
        name: 'Framer Motion',
        tech: <SiFramer size={32} />,
    },
    {
        key: 'zustand',
        name: 'Zustand',
        tech: <span className='text-4xl'>Z</span>,
    },
    {
        key: 'redux',
        name: 'Redux',
        tech: <SiRedux size={32} />,
    },
] as Technology[]

export type Technology = {
    key: string
    name: string
    tech: React.ReactNode
}
