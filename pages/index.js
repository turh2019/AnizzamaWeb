
import  Head  from 'next/head';
import { PostCard, Categories, PostWidget,LinksTo,Toolbar } from '../components/getComponents';
import { getPosts } from '../services/services';

import { hydrate, render } from "react-dom";
 

export default function Home({ posts }) {




  return (
   
    <div className="container mx-auto px-10 mb-8" >
      
        <Head>
          <meta name="google-site-verification" content="BsaRssdN_eUFiWb0vDifoQ23ikfPZfCsPth93wPGlXg" />
          <title>anizzama</title>
        </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
           
          ))}
        
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8 ">
          
            <PostWidget />
           
            <LinksTo />
           
          </div>
        </div>
      
      </div>
      
    </div>
    
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
} 