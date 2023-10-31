import React from 'react'
import {
    FaHtml5 as HTMLIcon,
    FaCss3 as CSSSIcon,
    FaReact as ReactIcon,
    FaPhp as PHPIcon,
    FaJava as JavaIcon,
    FaNodeJs as NodeJSIcon,
    FaSass as SASSIcon,
    FaAndroid as AndroidIcon,
    FaSwift as SwiftIcon,
    FaAngular as AngularIcon,
    FaBootstrap as BootstrapIcon,
} from 'react-icons/fa'
import { BiLogoJavascript as JavaScriptIcon } from 'react-icons/bi'
import {
    SiMysql as MySQLIcon,
    SiTypescript as TypeScriptIcon,
    SiTailwindcss as TailwindcssIcon,
    SiExpress as ExpressJSIcon,
    SiRedux as ReduxIcon,
} from 'react-icons/si'
import { TbBrandNextjs as NextJSIcon } from 'react-icons/tb'
import { BsMarkdownFill as MarkdownIcon } from 'react-icons/bs'

export type SkillProps = {
    name: string
    percentage: number
    color: string
    icon: React.JSX.Element
}

export default [
    {
        name: 'HTML',
        percentage: 100,
        color: '#FF4B1E',
        icon: <HTMLIcon />,
    },
    {
        name: 'CSS',
        percentage: 100,
        color: '#2965F1',
        icon: <CSSSIcon />,
    },
    {
        name: 'JavaScript',
        percentage: 100,
        color: '#F0DB4F',
        icon: <JavaScriptIcon />,
    },
    {
        name: 'React',
        percentage: 95,
        color: '#61DBFB',
        icon: <ReactIcon />,
    },
    {
        name: 'PHP',
        percentage: 80,
        color: '#777BB4',
        icon: <PHPIcon />,
    },
    {
        name: 'Java',
        percentage: 70,
        color: '#007396',
        icon: <JavaIcon />,
    },
    {
        name: 'MySQL',
        percentage: 90,
        color: '#4479A1',
        icon: <MySQLIcon />,
    },
    {
        name: 'NodeJS',
        percentage: 60,
        color: '#339933',
        icon: <NodeJSIcon />,
    },
    {
        name: 'TypeScript',
        percentage: 100,
        color: '#3178c6',
        icon: <TypeScriptIcon />,
    },
    {
        name: 'NextJS',
        percentage: 70,
        color: '#000000',
        icon: <NextJSIcon />,
    },
    {
        name: 'TailwindCSS',
        percentage: 100,
        color: '#06B6D4',
        icon: <TailwindcssIcon />,
    },
    {
        name: 'SASS',
        percentage: 100,
        color: '#CC6699',
        icon: <SASSIcon />,
    },
    {
        name: 'Android',
        percentage: 50,
        color: '#3DDC84',
        icon: <AndroidIcon />,
    },
    {
        name: 'iOS',
        percentage: 30,
        color: '#FC2421',
        icon: <SwiftIcon />,
    },
    {
        name: 'Angular',
        percentage: 30,
        color: '#DD0031',
        icon: <AngularIcon />,
    },
    {
        name: 'Markdown',
        percentage: 100,
        color: '#000000',
        icon: <MarkdownIcon />,
    },
    {
        name: 'Bootstrap',
        percentage: 90,
        color: '#7952B3',
        icon: <BootstrapIcon />,
    },
    {
        name: 'ExpressJS',
        percentage: 60,
        color: '#000000',
        icon: <ExpressJSIcon />,
    },
    {
        name: 'Redux',
        percentage: 70,
        color: '#764ABC',
        icon: <ReduxIcon />,
    },
].sort((a: SkillProps, b: SkillProps) => a.name.localeCompare(b.name)) as SkillProps[]
