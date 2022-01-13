import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';

import { getPages, getPagesPage} from '../../services/services';
import { PageCard, Categories, Loader,LinksTo,PostWidget ,Toolbar,Team,HelpUs} from '../../components/getComponents';

const Pagespage = ({ Pages , params }) => {
  const router = useRouter();

  if (router.isFallback) {
   return <Loader />;
 }

 

 
  return (
    <>

    <div className="container mx-auto px-10 mb-8" >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
         
     {params.slug =="team"? 
        <div>
           <HelpUs />
            <Team />
            <div className='grid grid-cols-1 lg:grid-cols-1 gap-12  '>
            {Pages.map((post, index) => (
              <span className='flex items-stretch'>
                  <PageCard key={index} post={post.node} />
              </span>   
            ))}
          </div>
         </div> :
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12  '>
            {Pages.map((post, index) => (
              <span className='flex items-stretch'>
                  <PageCard key={index} post={post.node} />
              </span>   
            ))}
          </div>
      }
       
         
        </div>
        <div className="col-span-1 lg:col-span-4 float-left">
          <div className="relative lg:sticky top-8 ">
         
            <PostWidget />
            
            <LinksTo />
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
export default Pagespage;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const Pages = await getPagesPage(params.slug);

  return {
    props: { Pages, params },
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
