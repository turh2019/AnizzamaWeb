
import  Head  from 'next/head';
import { PostCard, Categories, PostWidget,LinksTo,Toolbar } from '../components/getComponents';
import { getPosts } from '../services/services';

import { hydrate, render } from "react-dom";
 

export default function Home({ posts }) {




  return (
   
    <div className="container mx-auto px-10 mb-8" >

      <Head>
          <title>Anizzama - Homepage</title>
          <meta name="description" content="אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"/>
          <meta property="og:url" content="https://www.anizzama.com/"/>
          <meta property="og:title" content="אניזאמה - Anizzama.com"/>
          <meta property="og:description" content="עמוד הבית; בעמוד זה תוכלו לראות את כל הפוסטים האחרונים שהוצאנו."/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property="og:image" content="https://media.graphassets.com/Ohod0HmDREytfDNipJCD"/> 
          <link rel="canonical" href="https://www.anizzama.com/" />

        </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node}  />
           
          ))}
        
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="relative top-8 ">
          
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
