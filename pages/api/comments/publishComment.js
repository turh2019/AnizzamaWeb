import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken =process.env.GRAPHCMS_TOKEN;

export default async function asynchandler(req, res) {
  
   console.log(req.body)
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })

    const query = gql`
    mutation publishComment( $CommentID: ID!) {
        publishComment(where: {id: $CommentID}){
            name
            createdAt
            comment
            id
            sendEmail
            email
            isBelongs
            comments {
                id
                isBelongs
            }
            plus{
                name
            }

            minus{
                name
            }
        }

    }
  `;
    try {
      const result = await graphQLClient.request(query, req.body);
      return res.status(200).send(result);

    } catch (error) {
    
      return res.status(500).send(error);
    }
}
