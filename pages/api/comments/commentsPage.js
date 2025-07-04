import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphqlToken = process.env.GRAPHCMS_TOKEN

export default async function asynchandler(req, res) {
  console.log(req.body)

  const { name, email, comment, isBelongs, slug, id } = req.body

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })

  let query
  let variables

  if (isBelongs) {
    // replying to another comment
    query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $isBelongs: Boolean
        $id: ID!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            isBelongs: $isBelongs
            comments_: { connect: { id: $id } }
          }
        ) {
          id
        }
        publishManyComments {
          count
        }
      }
    `
    variables = { name, email, comment, isBelongs, id }
  } else {
    // normal comment on a page
    query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $isBelongs: Boolean
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            isBelongs: $isBelongs
            page: { connect: { slug: $slug } }
          }
        ) {
          id
        }
        publishManyComments {
          count
        }
      }
    `
    variables = { name, email, comment, isBelongs, slug }
  }

  try {
    const result = await graphQLClient.request(query, variables)
    return res.status(200).json(result)
  } catch (error) {
    console.error('GraphQL Error:', error)
    return res.status(500).json({ error: error.message || 'Unknown error' })
  }
}
