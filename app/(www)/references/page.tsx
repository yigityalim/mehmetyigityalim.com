import React from 'react'
import Container from 'components/Containers'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { buttonVariants } from 'components/ui/button'
import Link from 'next/link'
import { cn } from 'lib/utils'
import { Badge } from 'components/ui/badge'

function ReferenceCard({ name, url, icon, description, tags }: Readonly<Reference>): React.ReactElement {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                {icon && <div className='flex w-full items-center justify-center'>{icon}</div>}
                {description && <CardDescription>{description}</CardDescription>}
                <div className='flex flex-row flex-wrap gap-2'>
                    {tags.map((tag) => (
                        <Badge key={tag} variant='outline'>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Link href={url} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'w-full')}>
                    Ziyaret Et
                </Link>
            </CardFooter>
        </Card>
    )
}
export default function Page(): React.ReactElement {
    return (
        <Container title='Referanslarım' description='Şu ana kadar çalıştığım firmalar ve projeleri' isDev>
            <div className='mb-4 mt-4 flex flex-wrap items-center justify-center gap-4 md:grid md:grid-cols-2 lg:grid-cols-3'>
                {references.map((item) => (
                    <ReferenceCard key={item.id} {...item} />
                ))}
            </div>
        </Container>
    )
}

interface Reference {
    id: string
    name: string
    url: string
    icon?: React.ReactNode
    description?: string
    tags: string[]
}

const references = [
    {
        id: 'sisa-soft',
        name: 'SisaSoft Bilgi Teknolojileri & İnovasyon A.Ş.',
        url: 'https://sisasoft.com',
        tags: ['JavaScript', 'UI', 'AngularJS', 'TypeScript'],
    },
    {
        id: 'yenimahalle-belediyesi',
        name: 'Yenimahalle Belediyesi',
        url: 'https://yenimahalle.bel.tr/',
        tags: ['Donanım', 'Bilgi İşlem', 'Devlet Kurumu'],
    },
] as Reference[]
