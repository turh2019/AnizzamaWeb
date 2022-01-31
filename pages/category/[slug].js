import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getPages,GetPageCatgory } from '../../services/services';
import { PostCard,PageCard, Categories, Loader,LinksTo,PostWidget ,Toolbar} from '../../components/getComponents';

const CategoryPost = ({ posts ,type}) => {
  const router = useRouter();
  
  if (router.isFallback) {
   return <Loader />;
 }

  return (
    <div className="container mx-auto px-10 mb-8" >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 '>
            {posts.map((post, index) => (
              <PageCard key={index} post={post.node} />
              ))}
            </div>
        </div>
        <div className="col-span-1 lg:col-span-4 float-left">
          <div className="relative lg:sticky top-8 ">
         
            <PostWidget />
            <LinksTo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  
  const posts = await GetPageCatgory(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  const pages = await  getPages();
 
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}