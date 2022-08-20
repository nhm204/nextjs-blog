import { GraphQLClient, gql } from 'graphql-request';

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


// export a default function for API route to work
export default async function commentHandler (req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const CREATE_COMMENT_AND_PUBLISH_MUTATION = gql `
    mutation CreateComment ($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment (data: {name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { 
        id
      }
    }
  `;

  const result = await graphQLClient.request(CREATE_COMMENT_AND_PUBLISH_MUTATION, req.body);
  return res.status(200).send(result);
}
