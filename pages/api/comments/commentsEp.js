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

  if(req.body.isBelongs){
    const query = gql`
    mutation CreateComment($comment: String!, $isBelongs: Boolean, $id: ID!,$authorID: ID!,$Slug: String!) {
      createComment(data: { comment: $comment,slug: $Slug, isBelongs: $isBelongs, comments_: {connect: {id: $id}},author: {connect: {id: $authorID}}}) { id }
      publishManyComments(where: {author: {id: $authorID}}) {
        count
      }
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
    mutation CreateComment( $comment: String!, $isBelongs:Boolean, $slug: String!,$authorID: ID!,$Slug: String!) {
      createComment(data: { comment: $comment,slug: $Slug, isBelongs: $isBelongs, ep: {connect: {slug: $slug}},author: {connect: {id: $authorID}}}) { id }
      publishManyComments(where: {author: {id: $authorID}}) {
        count
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
  
}
