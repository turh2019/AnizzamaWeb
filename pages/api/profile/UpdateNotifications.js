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


  if(req.body.IsHeRead){
    const query = gql`
    mutation updateAuthor($id: ID!, $authorID: ID!) {
      updateManyNotifications(data: {isHeRead: true} where: {author: {id: $id}}){count}
    
   
      publishManyNotifications { count}

      publishAuthor(where: {id:$authorID}) { id }
    }
  `;
  try {
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error) {

    return res.status(500).send(error);
  }
  
  }




  console.log("asd_2")


    const query = gql`
        mutation updateAuthor( $toAuthorID: ID!, $authorID: ID!, $Link: String!, $body: String!) {
          updateAuthor(
            where: {id: $toAuthorID}
            data: {notifications: {create: {body: $body,isHeRead:false ,link: $Link, author: {connect: {id: $authorID}}}}}
          )
          {
            id
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
