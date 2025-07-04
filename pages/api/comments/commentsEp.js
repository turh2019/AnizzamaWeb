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

  if (isBelongs) {
    // This connects to an existing comment (thread/reply)
    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $isBelongs: Boolean
        $id: ID!
        $Slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            slug: $Slug
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
    try {
      const result = await graphQLClient.request(query, {
        name,
        email,
        comment,
        isBelongs,
        id,
        Slug: slug
      })
      return res.status(200).send(result)
    } catch (error) {
      console.error('GraphQL Error:', error)
      return res.status(500).send({ error: error.message || 'Unknown error' })
    }
  } else {
    // This connects to an episode (or page)
    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $isBelongs: Boolean
        $slug: String!
        $Slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            slug: $Slug
            isBelongs: $isBelongs
            ep: { connect: { slug: $slug } }
          }
        ) {
          id
        }
        publishManyComments {
          count
        }
      }
    `
    try {
      const result = await graphQLClient.request(query, {
        name,
        email,
        comment,
        isBelongs,
        slug,
        Slug: slug
      })
      return res.status(200).send(result)
    } catch (error) {
      console.error('GraphQL Error:', error)
      return res.status(500).send({ error: error.message || 'Unknown error' })
    }
  }
}
