import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const GET_POSTS = gql `
    query GetPosts {
      postsConnection (orderBy: publishedAt_DESC) {
        edges {
          node {
            slug
            createdAt
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            excerpt
            title
            image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }      
  `;

  const result = await request(graphqlAPI, GET_POSTS);
  return result.postsConnection.edges;
};


export const getCategories = async () => {
  const GET_CATEGORIES = gql `
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, GET_CATEGORIES);
  return result.categories;
};


export const getPostDetails = async (slug) => {
  const GET_POST_DETAILS = gql `
    query GetPostDetails ($slug : String!) {
      post(where: {slug: $slug}) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        excerpt
        title
        image {
          url
        }
        categories {
          name
          slug
        }
        createdAt
        slug
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, GET_POST_DETAILS, { slug });
  return result.post;
};


export const getRecentPosts = async () => {
  const GET_RECENT_POSTS = gql `
    query GetPostDetails () {
      posts (
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, GET_RECENT_POSTS);
  return result.posts;
};


export const getSimilarPosts = async (categories, slug) => {
  const GET_SIMILAR_POSTS = gql `
    query GetPostDetails ($slug: String!, $categories: [String!]) {
      posts (
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        image {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, GET_SIMILAR_POSTS, { slug, categories });
  return result.posts;
};


export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const getComments = async (slug) => {
  const GET_COMMENTS = gql `
    query GetComments ($slug:String!) {
      comments (where: { post: {slug: $slug} }, stage: DRAFT, orderBy: publishedAt_DESC) {
        id
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, GET_COMMENTS, { slug });
  return result.comments;
};


export const getFeaturedPosts = async () => {
  const GET_FEATURED_POSTS = gql `
    query GetFeaturedPosts () {
      posts (where: {featured: true}, orderBy: publishedAt_DESC) {
        author {
          name
          photo {
            url
          }
        }
        image {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, GET_FEATURED_POSTS);
  return result.posts;
};


export const getCategoryPost = async (slug) => {
  const GET_CATEGORY_POST = gql `
    query GetCategoryPost($slug: String!) {
      postsConnection (where: {categories_some: {slug: $slug}}, orderBy: publishedAt_DESC) {
        edges {
          node {
            slug
            createdAt
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            excerpt
            title
            image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, GET_CATEGORY_POST, { slug });
  return result.postsConnection.edges;
};