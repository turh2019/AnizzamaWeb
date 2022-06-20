import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';
import { getPages, getPagesPage,getCategories} from '../../services/services';
import { PageCard, Categories, Loader,LinksTo,PostWidget ,CategoriesSearch,Team,HelpUs} from '../../components/getComponents';
const Pagespage = ({ Pages , params }) => {
  const router = useRouter();

  if (router.isFallback) {
   return <Loader />;
 }

 var descriptionA;
 var descriptionB;
 var titleA;

       if(params.slug === 'anime') {
        descriptionA = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"
        descriptionB = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"
        titleA = "Anizzama - Anime List"
       } else if(params.slug === 'team') {
        descriptionA = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"
        descriptionB = "עמוד הצוות; בעמוד זה תוכלו לראות את כל צוות האתר ולגשת אל עמוד הדרושים."
        titleA = "Anizzama - Staff"
       }

  return (
    <div className="container mx-auto px-10 mb-8" >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
        <Head>
          <title>{titleA}</title>
          <meta name="description" content={descriptionA}/>
          <meta property="og:url" content={"https://anizzama.com/pages/"+params.slug}/>
          <meta property="og:title" content={titleA}/>
          <meta property="og:description" content={descriptionB}/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property="og:image" content="https://anizzama.com/favicon.ico"/> 
        </Head>
      
     {params.slug =="team"? 
        <div>
             <div className='grid grid-cols-1 lg:grid-cols-1 gap-12  '>
                  {Pages.map((post, index) => (
                    <span className=''>
                      
                        <PageCard key={index} post={post.node} type ={"team"} />
                    </span>   
                  ))}
          </div>
            <Team />
         </div> :
          <div >
            
          <CategoriesSearch posts={Pages} />
            
          </div>
      }
       
         
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
