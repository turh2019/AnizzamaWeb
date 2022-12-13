import React,{useEffect} from 'react';
import { useRouter } from 'next/router';

import { getTags, getTagsPost } from '../../services/services';
import { Loader,LinksTo,PostWidget ,CategoriesSearch,Team,Cooperation, PostCard} from '../../components/getComponents';


import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const tagPost = ({ posts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }





  // useEffect(() => {

  //   scroller.scrollTo('body', {
  //     duration: 1500,
  //     delay: 100,
  //     smooth: true,
  //     offset: 150, // Scrolls to element + 50 pixels down the page
      
  //   })
    
  //  }, [])
   


  return (
    <div className="container mx-auto px-10 mb-8" >

      
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div className="col-span-1 lg:col-span-8">
        <div className="lg:col-span-8 col-span-1" id="body">
        {posts.map((post, index) => (
                <span className='flex items-stretch'>
                    <PostCard key={index} post={post.node}  />
                </span>   
            ))}  
        
        </div>
  </div>
    <div className="col-span-1 lg:col-span-4 float-left">
      <div className="relative top-8 ">
    
        <PostWidget />
        
        <LinksTo />
      </div>
    </div>
  </div>
</div>
);
};
export default tagPost;
// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getTagsPost(params.slug);
  return {
    props: { posts },
  };
}
// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const tags = await getTags();
  return {
    paths: tags.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}