import Container from 'components/Containers'
import { JSX } from 'react'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'
import Image from 'next/image'
import { SocialMediaSwitchContainer } from 'components/SocialMedia'
import type { Home } from 'lib/types/home'
import RequestPackage from 'src/components/RequestPackage'
import RequestJob from 'components/RequestJob'
import Mdx from 'components/MDX'

const HOME_PAGE_QUERY: string = gql`
    query HomePage {
        homePages {
            title
            picture {
                url
                width
                height
            }
            description
            social {
                id
                title
                url
                color {
                    hex
                }
                username
                social
            }
        }
    }
`
/*

// TODO - Ceren ceylan komi clone.
// https://swedishhousemafia.komi.io/ bunu referans alarak temayı cerenin değiştirebileceği şekilde yap.
// backend olarak hygraph kullanma ama sadece GET işlemi olsun. veya mutation yapabilirsen ceren de kendisi ekleyebilir bir hale gelsin. ondaki auth işlemlerini de clerk veya firebase auth ile sağla. private route olsun.


örnek kod:
/*
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.HYGRAPH_PROJECT_API;

// export a default function for API route to work
export default async function comments(req, res) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
        authorization: `Bearer ${process.env.HYGRAPH_DEV_AUTH_TOKEN}`,
        },
    });
    const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
    const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
    });
    return res.status(200).send(result);
    }

örnek mutation kodu:
const a = gql`
    mutation CreateSocialMedia($input: createSocialMediaInput!) {
        createSocialMedia(input: $input) {
            socialMedia {
                id
                title
                url
                color {
                    hex
                }
                username
                social
            }
        }
    }
`


Ceren was born in 2002, she has been interested in music since she was a child and she is improving herself every day. She is usually more interested in afro, melodic house and organic sounds. She has been actively working in the event industry for about 4 years. In his daily life, she plays the ukulele and guitar as instruments, as well as performing live vocals. In the 1st year of her DJ career. She has a positive, friendly, patient personality.
#c50000 kullanılabilir. renk seçimini cerene bırak.

soundcloud widget için GET isteği:
$ curl -X GET "https://api.soundcloud.com/tracks/TRACK_ID" \
       -H  "accept: application/json; charset=utf-8" \
       -H "Authorization: OAuth ACCESS_TOKEN"
 */

export default async function Home(): Promise<JSX.Element> {
    const { homePages } = await hygraph.request<{ homePages: Home[] }>(HOME_PAGE_QUERY)
    const { title, picture, description, social } = homePages[0]

    return (
        <Container className='flex flex-col items-start justify-center gap-y-4 px-0 pt-0'>
            <Image
                src={picture.url}
                alt='Picture of the author'
                quality={100}
                priority
                width={picture.width}
                height={picture.height}
            />
            <div className='flex flex-col gap-y-8 px-8 md:px-10 lg:px-12 xl:px-16'>
                <h1 className='scroll-m-20 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
                    {title}
                </h1>
                <div>
                    <Mdx source={description} />
                </div>
                <RequestJob />
                <RequestPackage />
                <SocialMediaSwitchContainer social={social} />
            </div>
        </Container>
    )
}
