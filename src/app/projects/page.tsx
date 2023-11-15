import { JSX } from 'react'
import Container from 'components/Containers'
import { Metadata } from 'next'
import { GithubView, VercelView } from 'components/Project'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Projelerim',
    // TODO add SEO
}

export default function Page(): JSX.Element {
    return (
        <Container>
            <Tabs defaultValue='github' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='github'>Github</TabsTrigger>
                    <TabsTrigger value='vercel'>Vercel</TabsTrigger>
                </TabsList>
                <TabsContent value='github'>
                    <GithubView />
                </TabsContent>
                <TabsContent value='vercel'>
                    <VercelView />
                </TabsContent>
            </Tabs>
        </Container>
    )
}
