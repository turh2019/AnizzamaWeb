import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlToken =process.env.GRAPHCMS_TOKEN;

export default async function asynchandler(req, res) {
  
  
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  })

    const query = gql`
    mutation createAuthor($name: String!, $email: String!, $password: String!) {
        createAuthor(data: {name: $name, email: $email, password: $password,mycoins:50}) { id }
    }
  `;
    try {
      const result = await graphQLClient.request(query, req.body);
     
    


      return res.status(200).send(result);
    } catch (error) {
    
      return res.status(500).send(error);
    }
}
