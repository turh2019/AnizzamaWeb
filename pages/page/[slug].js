import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';

import { PageDetail,Categories, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo,Toolbar} from '../../components/getComponents';
import { getPage, getpageDetails } from '../../services/services';


const PostDetails = ({post}) => {
  var [selected, Setselected] = useState("")

 const router =useRouter();
 if(router.isFallback){
  return <Loader />
 }
 
  return (
    <>
      <div className="container mx-auto px-10 mb-8" >
      <Head>
          <title>{post.title}</title>
          <meta property="og:title" content="אניזאמה - Anizzama.com"/>
          <meta property="og:description" content={post.excerpt}/>
          <meta property="og:url" content= {"https://anizzama.vercel.app/"+post.slug}/>
          <meta property="og:image" content={post.featuredImage.url}/>
          <meta property="og:site_name" content="Anizzama"/>
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 ">
             <PageDetail post ={post} type={"sad"} />
             <Author  author={post.author} />

            <CommentsFrom slug={post.slug} type="page" selected={selected}  Setselected={Setselected}/>
            <Comments slug={post.slug} from="pages" selected={selected}  Setselected={Setselected}  />
          </div>
          <div className="col-span-1 lg:col-span-4 float-left" >
            <div className="relative lg:sticky top-8">
           
            <PostWidget  />
           
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
  const data = await getpageDetails(params.slug);
  
  return {
    props: {
      post: data,
    },
  };
}


export async function getStaticPaths() {
  const posts = await getPage();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
