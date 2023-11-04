import { gql, GraphQLClient } from 'graphql-request'

const hygraph: GraphQLClient = new GraphQLClient(process.env.GRAPHCMS_URL_ENDPOINT as string)

const hygraphMutation: GraphQLClient = new GraphQLClient(process.env.GRAPHCMS_URL_ENDPOINT as string, {
    headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
})

export default hygraph
export { hygraphMutation, gql }
