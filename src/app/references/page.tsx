import React from 'react'
import Container from 'components/Containers'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'

const mockData = [
    {
        name: 'Google',
        url: 'https://google.com',
        image: 'https://via.placeholder.com/1000',
    },
    {
        name: 'Facebook',
        url: 'https://facebook.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Pinterest',
        url: 'https://pinterest.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'GitHub',
        url: 'https://github.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'GitLab',
        url: 'https://gitlab.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'BitBucket',
        url: 'https://bitbucket.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'StackOverflow',
        url: 'https://stackoverflow.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'CodePen',
        url: 'https://codepen.io',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Dribbble',
        url: 'https://dribbble.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Behance',
        url: 'https://behance.net',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Figma',
        url: 'https://figma.com',
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Adobe',
        url: 'https://adobe.com',
        image: 'https://via.placeholder.com/150',
    },
]

export default function Page(): React.ReactElement {
    return (
        <Container title='Referanslarım' description='Şu ana kadar çalıştığım firmalar ve projeleri'>
            <div className='mb-4 mt-4 flex flex-wrap items-center justify-center gap-4 md:grid md:grid-cols-2 lg:grid-cols-3'>
                {mockData.map((item, index) => (
                    <ReferenceCard key={index} {...item} />
                ))}
            </div>
        </Container>
    )
}

function ReferenceCard({
    name,
    url,
    image,
}: Readonly<{ name: string; url: string; image: string }>): React.ReactElement {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{url}</CardDescription>
            </CardHeader>
            <CardContent>
                <img className='aspect-square h-fit w-full rounded object-cover' src={image} alt={name} />
            </CardContent>
            <CardFooter>
                <Button className='w-full' variant='secondary' size='sm'>
                    Ziyaret Et
                </Button>
            </CardFooter>
        </Card>
    )
}
