import React from 'react';
import { useRouter } from 'next/router';


import { PageDetail,Categories, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo,Toolbar} from '../../components/getComponents';
import { getPage, getpageDetails } from '../../services/services';


const PostDetails = ({post}) => {
  
 const router =useRouter();
 if(router.isFallback){
  return <Loader />
 }

  return (
    <>
     <Head>
          <title>anizzama</title>
          <link target="_blank" rel="icon" href='/bg/icon.png'/>
          <meta name="google-site-verification" content="FojcSmKWD0kChqW_8sPC0fvRO6ppd-Svm9y534ps61Y" />

        </Head>
      <div className="container mx-auto px-10 mb-8" >
         
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 ">
             <PageDetail post ={post}  />
            <Author author={post.author} />
            
            <CommentsFrom slug={post.slug} type="page"/>
            <Comments slug={post.slug} from="pages" />
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
