import React from 'react'
import hygraph from '@/graphql'
import { AUTHORS_BY_SLUG } from '@/graphql/queries'
import { cn } from 'lib/utils'
import { Author } from 'lib/types'
import AuthorContainer from 'components/Containers/AuthorContainer'
import Container from 'components/Containers'

export async function generateMetadata({
    params,
}: {
    params: { id: string }
}): Promise<{ title: string; description: string }> {
    const { author } = await hygraph.request<{ author: Author }>(AUTHORS_BY_SLUG, { slug: params.id })

    return {
        title: author.name,
        description: author.about.raw.children
            .map(({ children }) => children.map(({ text }) => text).join(''))
            .join(','),
    }
}

export default async function Page({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
    const { author } = await hygraph.request<{ author: Author }>(AUTHORS_BY_SLUG, { slug: params.id })

    return (
        <Container className={cn(author.name.length > 10 ? 'gap-y-4' : 'gap-y-1')}>
            <AuthorContainer author={author} key={author.id} />
        </Container>
    )
}
