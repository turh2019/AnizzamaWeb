import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken =process.env.GRAPHCMS_TOKEN;

export default async function asynchandler(req, res) {
  

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })

  console.log(req.body);

  if(req.body.AlreadyClicked){
    if(!req.body.isPlus)
    {
        const query = gql`
            mutation updateComment( $CommentID: ID!,$authorID: ID!) {
                updateComment( where: {id: $CommentID} , data: {minus: {connect: {where: {id: $authorID}}}, plus: {disconnect: {id: $authorID}}} ){id}
              }
        `;
    
        try {
          const result = await graphQLClient.request(query, req.body);
          return res.status(200).send(result);
        } catch (error) {
        
          return res.status(500).send(error);
        }
      }
      else if(req.body.isPlus){
        const  query = gql`
        mutation updateComment( $CommentID: ID!,$authorID: ID!) {
          updateComment( where: {id: $CommentID} , data: {plus: {connect: {where: {id: $authorID}}}, minus: {disconnect: {id: $authorID}}} ){id}
          }
        `;
    
        try {
          const result = await graphQLClient.request(query, req.body);
          return res.status(200).send(result);
        } catch (error) {
        
          return res.status(500).send(error);
        }
      }

      return;
  }





  if(req.body.isMinus)
  {
      const query = gql`
          mutation updateComment( $CommentID: ID!,$authorID: ID!) {
            updateComment(data: {minus: {connect: {where: {id: $authorID}}}}, where: {id: $CommentID}){id}
            }
      `;
  
      try {
        const result = await graphQLClient.request(query, req.body);
        return res.status(200).send(result);
      } catch (error) {
      
        return res.status(500).send(error);
      }
    }
    else if(req.body.isPlus){
      const  query = gql`
      mutation updateComment( $CommentID: ID!,$authorID: ID!) {
        updateComment(data: {plus: {connect: {where: {id: $authorID}}}}, where: {id: $CommentID}){id}
        }
      `;
  
      try {
        const result = await graphQLClient.request(query, req.body);
        return res.status(200).send(result);
      } catch (error) {
      
        return res.status(500).send(error);
      }
    }else if(req.body.itsComment){
      const  query = gql`
      mutation updateComment( $CommentID: ID!, $commentedit: String!) {
        updateComment(data: {comment: $commentedit}, where: {id: $CommentID}){id}
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
