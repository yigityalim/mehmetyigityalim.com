import React from 'react'
import hygraph from '@/src/graphql'
import Link from 'next/link'
import Image from 'next/image'
import { AUTHORS_BY_SLUG } from '@/src/graphql/queries'
import { cn, textColorForBackground } from 'lib/utils'
import { Author } from 'lib/types'
import AuthorContainer from 'components/Containers/AuthorContainer'
import Container from 'components/Containers'
import SocialMedia from 'lib/socialMedia'

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
    //await delay(20000)

    const { author } = await hygraph.request<{ author: Author }>(AUTHORS_BY_SLUG, { slug: params.id })
    // TODO - Social kısmı şu an sadece kendim için yazıldı. onu dinamik bir hale getirmen lazım. bir hook yazıp içine parametreyi ve ikonları dizi olarak yollayıp
    // TODO - çıktı olarak o kullanıcıya özel bir sosyal medya listesi döndürmen lazım.

    return (
        <Container className={cn(author.name.length > 10 ? 'gap-y-4' : 'gap-y-1')}>
            <div className='flex w-full items-center justify-between gap-x-2'>
                <Image
                    src={author.picture.url}
                    width={author.picture.width}
                    height={author.picture.height}
                    alt='user'
                    className='h-24 w-24 rounded-full'
                    priority
                />
                <h1 className='text-center text-4xl font-bold italic md:text-start'>{author.name}</h1>
            </div>
            <div className='flex w-full flex-col items-start justify-center gap-4 md:flex-row'>
                {author.about.raw.children.map((child) => (
                    <div key={child.type} className='text-center text-sm md:text-start md:text-base'>
                        {child.children.map(({ text }) => (
                            <p key={text}>{text}</p>
                        ))}
                    </div>
                ))}
            </div>
            <h1 className='w-full text-start text-3xl font-bold italic'>Sosyal</h1>
            <div className='flex w-full flex-col flex-wrap items-center justify-start gap-4 md:justify-start'>
                {SocialMedia.map(({ url, icon }) => (
                    <a
                        key={url}
                        href={url}
                        className='inline-flex w-full items-center justify-center bg-gray-50 p-2 text-2xl transition active:scale-90 dark:bg-gray-950'
                    >
                        {icon}
                    </a>
                ))}
            </div>

            <h1 className='w-full text-start text-3xl font-bold italic'>Diller</h1>
            <div className='flex w-full flex-row flex-wrap items-center justify-start gap-2 rounded-lg'>
                {author.programmingLanguages.map(({ name, color }) => (
                    <span
                        key={name}
                        style={{ backgroundColor: color.hex, color: textColorForBackground(color.hex) }}
                        className='rounded-sm px-2 py-0.5 text-xs text-black dark:text-white'
                    >
                        {name}
                    </span>
                ))}
            </div>
            {author.blogs.length > 0 ? (
                <h1 className='w-full text-start text-3xl font-bold italic'>Bloglar</h1>
            ) : (
                <h1 className='w-full text-start text-3xl font-bold italic'>Blog Bulunamadı!</h1>
            )}
            <div className='flex w-full flex-col items-center justify-start gap-4 md:flex-row md:justify-center'>
                {author.blogs.length === 0 ? (
                    <div className='flex w-full flex-col items-center justify-center gap-y-2'>
                        <Link
                            href='/blog'
                            className='text-md w-full bg-black bg-opacity-20 p-2 text-center font-bold text-white dark:bg-white dark:text-black'
                        >
                            Bloglara Göz At
                        </Link>
                    </div>
                ) : (
                    author.blogs.map((blog) => <AuthorContainer key={blog.title} blogs={blog} />)
                )}
            </div>
        </Container>
    )
}
