import React from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { BlogView } from 'components/Blog/BlogView'
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'
import { AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Blog Sayfası',
    description: 'Tüm Bloglar',
    keywords: 'bloglar, tüm bloglar',
} as Metadata satisfies Metadata

// FIXME - burada kategorilere göre gösterim yapılacak. örneğin dark mode içiin klasör mantığı. table of contents mantığı olabilir. şu an çünkü hepsini listeliyoruz.

export default async function Page(): Promise<React.JSX.Element> {
    return (
        <Container title='Blog'>
            <Alert variant='destructive'>
                <AlertCircle className='size-4' />
                <AlertTitle>Bu sayfa daha geliştirme aşamasındadır.</AlertTitle>
                <AlertDescription>Bu sayfada yapacağınız işlemler kaydedilmeyecektir.</AlertDescription>
            </Alert>
            <BlogView />
        </Container>
    )
}
