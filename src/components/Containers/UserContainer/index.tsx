import { CardContent, Card } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { Author } from 'lib/types'
import { JSX } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from 'components/ui/badge'
import SocialMedia from '@/utils/socialMedia'
import crypto from 'crypto'
import { CodeIcon } from 'lucide-react'

export default function UserContainer({ author }: { author: Author }): JSX.Element {
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
            <CardContent className='p-4'>
                <div className='flex w-full items-center justify-between'>
                    <h2 className='text-2xl font-bold transition-all duration-200 hover:text-gray-700'>
                        {author.name} {author.surname}
                    </h2>
                    <Badge className='gap-x-2'>
                        <CodeIcon size={12} />
                        {author.programmingLanguages.length}
                    </Badge>
                </div>
                <h3 className='text-gray-500 transition-all duration-200 hover:text-gray-600'>{author.email}</h3>
                <div>
                    {author.about.raw.children.map((child, index) => (
                        <p
                            key={child.type + crypto.randomBytes(4).toString('hex')}
                            className='mt-1 text-gray-600 transition-all duration-200 hover:text-gray-700'
                        >
                            {child.children.map(({ text }) => text).join('')}
                        </p>
                    ))}
                </div>
                <div className='mt-4 flex space-x-2'>
                    <SocialMedia title='github' authorId={author.id} />
                    <Button
                        className='w-full transition-all duration-200 hover:border-gray-700 hover:text-gray-700'
                        size='sm'
                        variant='outline'
                    >
                        <Link className='flex h-full w-full items-center justify-center' href={`user/${author.slug}`}>
                            Profile Git
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
