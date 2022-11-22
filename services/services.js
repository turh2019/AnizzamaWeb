import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  
  const query = gql`
  query MyQuery {
    postsConnection( orderBy: createdAt_DESC) {
      
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          tags {
            label
            slug
          }

          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            label
            
          }
        }
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query);
  
  return result.postsConnection.edges;
};


export const getPage = async () => {
  
  const query = gql`
  query MyQuery {
    page_Connection(orderBy: createdAt_DESC) {
      edges {
        node {
          search
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          wallpaper {
            url
          }
          createdAt
          slug
          format
          title
          excerpt
         
          featuredImage {
            url
          }
          smallFeaturedImage {
            url
          }
       
          pages_ {
            name
            slug
          }
          
        }
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query);
  
  return result.page_Connection.edges;
};

export const getPageFormat = async () => {
  
  const query = gql`
  query MyQuery() {
    page_Connection(orderBy: createdAt_DESC) {
      edges {
        node {
          search
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          wallpaper {
            url
          }
          createdAt
          slug
          format
          title
          excerpt
         
          featuredImage {
            url
          }
          smallFeaturedImage {
            url
          }
          category {
            label
          
          }
          pages_ {
            name
            slug
          }
          

          seasons_ {
              nameSeason
              seasonSlug
              eps{
                nameEp
                    epNum
                    epSlug
                      linkVideo {
                        link
                        nameFormat
                        
                    }
              }
            }
        }
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query);
  
  return result.page_Connection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories(orderBy: label_ASC) {
          value
          label
        }
    }
  `;



  const result = await request(graphqlAPI, query);

  return result.categories;
};



export const getTags = async () => {
  const query = gql`
    query GetTags {
        tags(orderBy: label_ASC) {
          label
          value
          slug
          posts {
            title
            slug
          }
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.tags;
};

export const getAllCooperation = async () => {
  const query = gql`
    query MyQuery {
      cooperation_ {
        title
        photo {
          url
        }
        link
        bio
      }
    }
  `;

const result = await request(graphqlAPI, query);

return result.cooperation_;
};


export const getPages = async () => {
  const query = gql`
  query MyQuery {
    pages_ {
      slug
      name
    }
  }
  `;

  const result = await request(graphqlAPI, query);
  
  return result.pages_;

};

export const GetRandomSeries = async () => {
    const query = gql`
    query MyQuery() {
      page_(
        orderBy: createdAt_DESC
      ) {
        title
        slug
      }
    }
  `;
const result = await request(graphqlAPI, query);

return result.page_;
};

export const GetRandomPost = async () => {
  const query = gql`
  query MyQuery() {
    posts(
      orderBy: createdAt_DESC
    ) {
      title
      slug
    }
  }
`;
const result = await request(graphqlAPI, query);

return result.posts;
};


export const getLinksto = async () => {
  const query = gql`
  query MyQuery {
    linksTos {
      link
      title
      featuredImage {
        url
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query);

  return result.linksTos;
};



export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        linkVideo
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }

        categories {
          label
         
        }
        
        tags {
          label
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

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getpageDetails = async (slug) => {
  const query = gql`
    query GetpageDetails($slug : String!) {
      page(where: {slug: $slug}) {
        title
        excerpt

        format
        projectStatus
        summaryAnime{
          raw
        }

      
        wallpaper{
          url
        }
        search
        author{
          name
          bio
          photo {
            url
          }
        }
        featuredImage{
          url
        }
        seasons_ {
          nameSeason
          seasonShowName
          
          seasonSlug
          eps{
            nameEp
                epNum
                epSlug
                  id
                  linkVideo {
                    link
                    nameFormat
                }
          }
        }
        
        createdAt
        time
        slug
        
        content {
          raw
        }
        pages_ {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.page;
};

export const getEpDetails = async (id) => {
  const query = gql`
    query GetpageDetails($id: ID!) {
      ep(where: {id: $id}) {
          epNum
          
          nameEp
          epSlug
          summaryEp {
           raw
          }

          linkVideo {
              link
              nameFormat
          }
          seasons {
            seasonSlug
          }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { id });

  return result.ep;
};


export const getSimilarPosts = async (tag,  slug) => {

  const query = gql`
    query GetSimilarPosts($slug: String!, $tag: [String!],) {
      posts(
        where: {slug_not: $slug, AND: {tags_some: {slug_in: $tag}}}
        orderBy: createdAt_ASC
        
      ) {
        title
        featuredImage {
          url
        }
        featuredSmallImage{
          url
        }
        
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, {tag, slug});
  return result.posts;
};

  

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String! ) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};






export const getTagsPost = async (slug) => {
  const query = gql`
    query getTagsPost($slug: String!) {
      postsConnection(where: {tags_some: {slug: $slug}} , orderBy: createdAt_DESC) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
             
            excerpt
            featuredImage {
              url
            }


            tags {
              label
              slug
            }

          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getPagesPage = async (slug) => {
  const query = gql`
    query GetPagesPage($slug: String!) {
      page_Connection(where: {pages__some: {slug: $slug}}, orderBy: slug_ASC) {
        edges {
          cursor
          
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            smallFeaturedImage{
              url
            }

            wallpaper{
              url
            }
            itsShow
            createdAt
            time
            slug
            title
            season_
            excerpt
            
            featuredImage {
              url
            }
            pages_ {
              name
              slug
              formts
            }
            category {
              label
              
            }
          
            projectStatus
            format
            fansub
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.page_Connection.edges;
};

export const getAllItems = async () => {
  const query = gql`
  query MyQuery {
    items {
      bodyPart
      cost
      id
      name
      image
      {
        url
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query);

  return result.items;
};


export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const submitComment = async (obj) => {
 
  const result = await fetch('/api/comments/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const UpdateComment = async (obj) => {
 
  const result = await fetch('/api/comments/Updatecomments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const deleteComment = async (obj) => {
 
  const result = await fetch('/api/comments/deleteComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};



export const publishComment = async (obj) => {
 
  const result = await fetch('/api/comments/publishComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const UpdateNotifications = async (obj) => {
 
  const result = await fetch('/api/profile/UpdateNotifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const createAuthor = async (obj) => {
 
  const result = await fetch('/api/profile/createAuthor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const publishAuthor = async (obj) => {
 
  const result = await fetch('/api/profile/publishAuthor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const buyItem = async (obj) => {
 
  const result = await fetch('/api/profile/buyItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const updateAuthor = async (obj) => {
 
  const result = await fetch('/api/profile/updateAuthor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const editWear = async (obj) => {
 
  const result = await fetch('/api/profile/editWear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};


export const submitCommentPage = async (obj) => {
 
  const result = await fetch('/api/comments/commentsPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const submitCommentEp = async (obj) => {
 
  const result = await fetch('/api/comments/commentsEp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};
export const getCommentsPages = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {page: {slug:$slug}} , orderBy: createdAt_DESC){
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
        author {
          name
          bio
          photoUrl
          id

          wear{
            name
            id
            image{
              url
            } 
            bodyPart
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;

};

export const getCommentsEps = async (epSlug) => {
  const query = gql`
    query GetComments($epSlug:String!) {
      comments(where: {ep: {epSlug:$epSlug}} , orderBy: createdAt_DESC){
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
        
        author {
          name
          bio
          photoUrl
          id
          wear{
            name
            id
            image{
              url
            } 
            bodyPart
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { epSlug });

  return result.comments;
};



export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}, orderBy: createdAt_DESC){
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
        author {
          name
          bio
          photoUrl
          id

          wear{
            name
            id
            image{
              url
            } 
            bodyPart
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getComment = async (id) => {
  const query = gql`
    query GetComments($id:ID!) {
      comment(where: {id: $id}){
        name
        id
        sendEmail
        createdAt
        isBelongs
        email
        comment
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
        
        author {
          name
          bio
          photoUrl
          id
          wear{
            name
            id
            image{
              url
            } 
            bodyPart
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { id });

  return result.comment;
};

export const getAllComments = async (id) => {
  const query = gql`
    query GetComments($id:String!) {
      comments(where: {post: {id:$id}}, orderBy: createdAt_DESC){
        name
        sendEmail
        createdAt
        isBelongs
        email
        comment
        comments {
          id
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { id });

  return result.comments;
};



export const GetRecommendedPost = async () => {
  const query = gql`
    query MyQuery() {
      posts(
        where: {featuredPost: true}
        orderBy: createdAt_DESC
       
      ) {
        title
        featuredImage {
          url
        }
        featuredSmallImage{
          url
        }

        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};


export const getRecentPosts = async () => {
  const query = gql`
    query etPostDetails() {
      posts(
        orderBy: createdAt_DESC
        first: 3
      ) {
        title
        featuredImage {
          url
        }
        featuredSmallImage{
          url
        }

        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};



export const getJobs = async () => {
  const query = gql`
  query MyQuery {
    
      authors {
        bio
        name
        photo {
          url
        }
        profileStatus
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.authors;
};


export const getAllProfiles = async () => {
  const query = gql`
  query MyQuery {
    
      authors {
        bio
        name
        password
        email
        publishedAt
        photo {
          url
        }
        profileStatus
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.authors;
};


export const GetmyProfileSlug = async (name) => {
  const query = gql`
    query GetmyProfile($name : String!) {
      authors(where: {name: $name}) {
        bio
        name
        password
        mycoins
        photoUrl
        photo {
          url
        }

        inventory {
          name
          id
          image{
            url
          }
          bodyPart
        }
        numOfNotifications
        notifications(orderBy: id_DESC){
          
            id
            isHeRead
            body
            createdAt
            link
           author{
            name
            photoUrl
            wear{
              name
              id
              
              image{
                url
              } 
              bodyPart
            }
          }

        }

        wear{
          name
          id
          image{
            url
          } 
          bodyPart
        }

        profileStatus
        id
      }
    }
  `;

  const result = await request(graphqlAPI, query, { name });

  return result.authors;
};


export const GetmyProfile = async (name,password) => {
  const query = gql`
    query GetmyProfile($name : String!, $password: String!) {
      authors(where: {name: $name,password:$password}) {
        bio
        name
        password
        photo {
          url
        }
        profileStatus
      }
    }
  `;

  const result = await request(graphqlAPI, query, { name,password });

  return result.authors;
};

export const GetPageCatgory = async (slug) => {
  
  const slugs = "Comedy Drama";
  const query = gql`
    query GetPagesPage($slug: String!) {
      page_Connection( orderBy: slug_ASC) {
        edges {
          cursor
          
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            time
            slug
            title
             
            excerpt
            featuredImage {
              url
            }
            pages_ {
              name
              slug
            }
            category {
              label
             
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, {slug});
  
  return result.page_Connection.edges;
};