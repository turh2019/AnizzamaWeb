import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken =process.env.GRAPHCMS_TOKEN;

export default async function asynchandler(req, res) {
  

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })
  if(req.body.id){
    const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $isBelongs: String!,$id: ID!) {
      createComment(data: {name: $name, email: $email, comment: $comment, isBelongs: $isBelongs, comments_: {connect: {id: $id}} }) { id }
    }
  `;
  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error) {
  
    return res.status(500).send(error);
  }

  }else{
    const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $isBelongs: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, isBelongs: $isBelongs, post: {connect: {slug: $slug}} }) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error) {
  
    return res.status(500).send(error);
  }


  }
 
  
}
