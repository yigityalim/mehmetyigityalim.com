import Container from 'components/Containers'
import { gql } from 'graphql-request'
import hygraph from '@/graphql'
import { SocialMediaSwitchContainer } from 'components/SocialMedia'
import type { Home } from 'lib/types/home'
import RequestPlan from 'components/RequestPlan'
import RequestJob from 'components/RequestJob'
import Mdx from 'components/MDX'
import { getTranslations } from 'next-intl/server'
import HeroSection from 'components/HeroSection'

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
export default async function Home() {
    const { homePages } = await hygraph.request<{ homePages: Home[] }>(HOME_PAGE_QUERY)
    const { title, picture, description, social } = homePages[0]
    const t = await getTranslations('page')

    return (
        <Container className='flex flex-col items-start justify-center gap-y-4 px-0 pt-0'>
            <HeroSection picture={picture} title={title} />
            <div className='flex w-full flex-col gap-y-8 px-8 pt-4 md:px-10'>
                <Mdx source={description} />
                <RequestJob />
                <RequestPlan />
                <SocialMediaSwitchContainer social={social} />
            </div>
        </Container>
    )
}
