import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import '@/styles/mdx.css'
import { components } from '@/components/MDX/components'

export function Mdx({ code }: Readonly<{ code: string }>): React.ReactNode {
    const Component = useMDXComponent(code)

    return (
        <section className='mdx'>
            <Component components={components} />
        </section>
    )
}
