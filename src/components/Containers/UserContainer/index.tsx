import { CardContent, Card } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Author } from 'lib/types/Author'
import { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from 'components/ui/badge'
import SocialMedia from '@/utils/socialMedia'
import crypto from 'crypto'
import { CodeIcon } from 'lucide-react'

type AuthorProps = Readonly<{
    author: Author
}>

export default function UserContainer({ author }: AuthorProps): JSX.Element {
    return (
        <Card
            key={author.id}
            className='mx-auto min-w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl'
        >
            <Image
                alt='Profile picture'
                className='w-full object-cover'
                height='320'
                src={author.picture.url}
                style={{
                    aspectRatio: '320/320',
                    objectFit: 'cover',
                }}
                width='320'
                priority
            />
            <CardContent className='flex h-full w-full flex-col items-center justify-center gap-y-4 p-4'>
                <div className='flex w-full items-center justify-between'>
                    <h2 className='w-full text-2xl font-bold transition-all duration-200 hover:text-gray-700'>
                        {author.name} {author.surname}
                    </h2>
                    <Badge className='gap-x-2'>
                        <CodeIcon size={12} />
                        {author.programmingLanguages.length}
                    </Badge>
                </div>
                <h3 className='w-full text-gray-500 transition-all duration-200 hover:text-gray-600'>{author.email}</h3>
                <div className='w-full'>
                    {author.about.raw.children.map(({ type, children }) => (
                        <p
                            key={type + crypto.randomBytes(4).toString('hex')}
                            className='mt-1 text-gray-600 transition-all duration-200 hover:text-gray-700'
                        >
                            {children.map(({ text }) => text).join('')}
                        </p>
                    ))}
                </div>
                {author.social.length > 0 && (
                    <div className='grid w-full grid-cols-2 gap-2'>
                        {author.social.map((s) => (
                            <SocialMedia key={s.id} {...s} text iterator={author.social.length} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
