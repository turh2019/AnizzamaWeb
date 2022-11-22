import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';
import { getPages, getPagesPage} from '../../services/services';
import { Loader,LinksTo,PostWidget ,CategoriesSearch,Team,Cooperation,TagsList,Login ,Signup, Shop ,FAQ,KaraokePage} from '../../components/getComponents';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {useStateContext} from  '../../context/StateContext'

const Pagespage = ({ Pages , params }) => {
  const router = useRouter();

  if (router.isFallback) {
   return <Loader />;
 }
 if(params.slug != 'anime' && params.slug != 'team' && params.slug != 'cooperation' && params.slug != 'tags' && params.slug != 'login' && params.slug != 'signup'&& params.slug != 'shop' && params.slug != 'frequently-asked-question' &&params.slug !=  'karaoke' ) return(<></>);

 

useEffect(() => {
  
  // scroller.scrollTo('body', {
  //   duration: 1500,
  //   delay: 100,
  //   smooth: true,
  //   offset: -100  , // Scrolls to element + 50 pixels down the page
    
  // })
}, [])


 var descriptionA;
 var descriptionB;
 var titleA;
 var dd;

       if(params.slug === 'anime') {
        descriptionA = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"
        descriptionB = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"
        titleA = "Anizzama - Anime List"
        dd = "anime"
       } else if(params.slug === 'team') {
        descriptionA = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"
        descriptionB = "עמוד הצוות; בעמוד זה תוכלו לראות את כל צוות האתר ולגשת אל עמוד הדרושים."
        titleA = "Anizzama - Staff"
        dd = "team"
       } else if(params.slug === 'cooperation') {
        descriptionA = "אניזאמה; כל המשתפי פעולה המדהימים שלנו!"
        descriptionB = "אניזאמה; כל המשתפי פעולה המדהימים שלנו!"
        titleA = "Anizzama - Cooperation"
        dd = "cooperation"
       }

      return (
        <div className="container mx-auto px-10 mb-8" >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8" id='body'>
        <Head>
        <title>{titleA}</title>
          <meta name="description" content={descriptionA}/>
          <meta property="og:url" content={"https://www.anizzama.com/pages/"+dd}/>
          <meta property="og:title" content={titleA}/>
          <meta property="og:description" content={descriptionB}/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property="og:image" content="https://media.graphassets.com/Ohod0HmDREytfDNipJCD"/> 
        </Head>
        {params.slug =="team"&& <div><Team/></div>}
        {params.slug =="anime"&&<div><CategoriesSearch posts={Pages} /></div>}
        {params.slug =="cooperation"&&<div><Cooperation/></div> }
        {params.slug =="FAQ"&&<div></div> }
        {params.slug =="tags"&&<div><TagsList></TagsList></div>}
        {params.slug =="login"&&<div><Login></Login></div>}
        {params.slug =="signup"&&<div><Signup></Signup></div>}
        {params.slug =="shop"&&<div><Shop ></Shop></div>}
        {params.slug =="frequently-asked-question"&&<div><FAQ ></FAQ></div>}
        {params.slug =="karaoke"&&<div><KaraokePage ></KaraokePage></div>}
      </div>
        <div className="col-span-1 lg:col-span-4 float-left" id="body">
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
