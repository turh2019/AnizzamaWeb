import React from 'react';
import { useRouter } from 'next/router';

import { getPages, getPagesPage } from '../../services/services';
import { PageCard, Categories, Loader,LinksTo,PostWidget ,Toolbar} from '../../components/getComponents';

const pagePage = ({ posts }) => {
 // const router = useRouter();

 // if (router.isFallback) {
 //   return <Loader />;
 // }

  return (
    <div className="container mx-auto px-10 mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8 ">
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            {posts.map((post, index) => (
                 <div className=''>
                   {console.log(post.node.slug)}
                <PageCard key={index} post={post.node}  />
                </div>
            ))}
            </div>
        </div>
    
        <div className="col-span-1 lg:col-span-4 ">
          <div className="relative lg:sticky top-8  ">
         
            <PostWidget />
            <Categories />
            <LinksTo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default pagePage;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getPagesPage(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getPages();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}