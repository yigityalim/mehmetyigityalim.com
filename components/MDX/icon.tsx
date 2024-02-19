import React from 'react'
import {
    SiTypescript,
    SiJavascript,
    SiCss3,
    SiHtml5,
    SiMarkdown,
    SiPython,
    SiPhp,
    type IconType,
} from '@icons-pack/react-simple-icons'
import { cn } from 'lib/utils'

const languages = {
    bash: 'bash',
    js: SiJavascript,
    jsx: SiJavascript,
    ts: SiTypescript,
    tsx: SiTypescript,
    html: SiHtml5,
    css: SiCss3,
    json: SiMarkdown,
    md: SiMarkdown,
    mdx: SiMarkdown,
    py: SiPython,
    php: SiPhp,
} as Record<string, string | IconType>

export function Icon({ meta, lang }: { meta: boolean | undefined; lang: string }) {
    const icon = languages[lang as keyof typeof languages]
    if (typeof icon === 'string') return <React.Fragment />
    if (!icon || !meta) return <React.Fragment />
    const Component = icon
    return (
        <span className={cn('absolute right-2 top-6 inline-block')}>
            <Component size={18} />
        </span>
    )
}
