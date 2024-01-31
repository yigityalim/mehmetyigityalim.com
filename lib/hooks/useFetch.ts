'use client'
import hygraph, { gql } from '@/graphql'
import useSwr from 'swr'

const fetcher = <T>(query: ReturnType<typeof gql>) => hygraph.request(query) as T

export const useFetch = <TData = unknown>(): {
    data: TData | undefined
    error: Error | undefined
    isLoading: boolean
} => {
    const { data, error, isLoading } = useSwr<TData>(
        gql`
            query {
                about(where: { id: "clq0i6dsk0ubi0cusd36gk8u2" }) {
                    id
                    name
                    cover {
                        url
                        width
                        height
                    }
                }
            }
        `,
        fetcher
    )

    return {
        data,
        error,
        isLoading,
    }
}
