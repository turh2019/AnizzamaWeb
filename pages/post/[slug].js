import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import  Head  from 'next/head';
import { PostDetail, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo} from '../../components/getComponents';
import { getPosts, getPostDetails } from '../../services/services';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const PostDetails = ({post}) => {
  var [selected, Setselected] = useState("")

  
 const router =useRouter();
 if(router.isFallback){
  return <Loader />
 }





//  useEffect(() => {

//   // scroller.scrollTo('bodyText', {
//   //   duration: 1500,
//   //   delay: 100,
//   //   smooth: true,
//   //   offset: -105, // Scrolls to element + 50 pixels down the page
    
//   // })
  
//  }, [])
 




 var AAAa;
if(post.title.toLowerCase().includes("anizzama") || post.title.includes("אניזאמה")) AAAa = post.title;
else AAAa = "Anizzama - " + post.title;


  return (
    <>
  
     
      <div className="container mx-auto px-10 mb-8" >
      <Head>
      <title>{post.title}</title>
          <meta property="description" content={post.excerpt}/>
          <meta property="og:title" content={post.title}/>
          <meta property="og:description" content={post.excerpt}/>
          <meta property="og:url" content= {"https://www.anizzama.com/post/"+post.slug}/>
          <meta property="og:image" content={post.featuredImage.url}/>
          <meta property="og:site_name" content="Anizzama"/>
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8" >
          <div id='body'>
               <PostDetail post={post}  />
          </div>
            
            <Author  author={post.author} />
            <CommentsFrom Slug ={`/post/${post.slug}`} slug={post.slug} type="post" selected={selected}  Setselected={Setselected}/>
            <Comments slug={post.slug} from="post" selected={selected}  Setselected={Setselected} Author ={post.author}  />
          </div>
          <div className="col-span-1 lg:col-span-4 float-left" >
            <div className="relative lg:sticky top-8">
           
            <PostWidget slug={post.slug} tags={post.tags.map((tag) => tag.slug)} />
           
            <LinksTo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;


export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  
  return {
    props: {
      post: data,
    },
  };
}


export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
