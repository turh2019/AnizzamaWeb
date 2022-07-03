import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';
import { getPages, getPagesPage,getCategories} from '../../services/services';
import { Loader,LinksTo,PostWidget ,CategoriesSearch,Team,Cooperation} from '../../components/getComponents';

const Pagespage = ({ Pages , params }) => {
  const router = useRouter();

  if (router.isFallback) {
   return <Loader />;
 }
 
 if(params.slug != 'anime' && params.slug != 'team' && params.slug != 'cooperation') return(<></>);

 var descriptionA;
 var descriptionB;
 var titleA;
 var dd;
 var typpe;

       if(params.slug === 'anime') {
        descriptionA = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!\nבעמוד זה - דף האנימות; תוכלו לראות את כל האנימות שיש באתר!\nכמו כן, תוכלו להשתמש בפיצ'רים שלנו על מנת לצמצם את האפשרויות!"
        descriptionB = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!\nבעמוד זה - דף האנימות; תוכלו לראות את כל האנימות שיש באתר!\nכמו כן, תוכלו להשתמש בפיצ'רים שלנו על מנת לצמצם את האפשרויות!"
        titleA = "Anizzama - Anime List"
        dd = "anime"
        typpe = "Anime List Page"

       } else if(params.slug === 'team') {
        descriptionA = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!\nעמוד הצוות; בעמוד זה תוכלו לראות את כל צוות האתר, כולל מי שפרש.\nכמו כן, את התפקידים ותאריך ההצטרפות של כל אחד ואחד מהצוות!"
        descriptionB = "אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!\nעמוד הצוות; בעמוד זה תוכלו לראות את כל צוות האתר, כולל מי שפרש.\nכמו כן, את התפקידים ותאריך ההצטרפות של כל אחד ואחד מהצוות!"
        titleA = "Anizzama - Staff"
        dd = "team"
        typpe = "Team Page"

       } else if(params.slug === 'cooperation') {
        descriptionA = "אניזאמה; כל המשתפי פעולה המדהימים שלנו!"
        descriptionB = "אניזאמה; כל המשתפי פעולה המדהימים שלנו!"
        titleA = "Anizzama - Cooperation"
        dd = "cooperation"
        typpe = "Cooperation Page"

       }

      return (
        <div className="container mx-auto px-10 mb-8" >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
        <Head>
        <title>{titleA}</title>
          <meta name="description" content={descriptionA}/>
          <meta property="og:url" content={"https://www.anizzama.com/pages/"+dd}/>
          <meta property="og:title" content={titleA}/>
          <meta property="og:description" content={descriptionB}/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property="og:type" content={typpe}/>
          <meta property="og:image" content="https://media.graphassets.com/Ohod0HmDREytfDNipJCD"/> 
        </Head>
        {params.slug =="team"? <div><Team/></div> :""}
        {params.slug =="anime"?<div><CategoriesSearch posts={Pages} /></div>:"" }
        {params.slug =="cooperation"?<div><Cooperation/></div>:"" }
        {params.slug =="FAQ"?<div></div>:"" }
         
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
