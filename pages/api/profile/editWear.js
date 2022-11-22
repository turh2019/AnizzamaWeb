import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken =process.env.GRAPHCMS_TOKEN;

export default async function asynchandler(req, res) {
  
  
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })


  console.log(req.body)
  if(req.body.iHave)
  {
    const query = gql`
    mutation updateAuthor($id: ID!,$idItem: ID!,$wearIdItem: ID! ) {
      updateAuthor(where: {id: $id}, data: {wear: {disconnect: {id: $wearIdItem}, connect: {where: {id: $idItem}}}})
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



  const query = gql`
    mutation updateAuthor($id: ID!,$idItem: ID! ) {
      updateAuthor(data: {wear: {connect: {where: {id: $idItem}}}} , where: {id: $id})
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
