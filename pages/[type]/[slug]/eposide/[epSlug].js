import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';

import { PageDetail, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo,Toolbar} from '../../../../components/getComponents';
import { getPageFormat, getpageDetails,getEpDetails } from '../../../../services/services';

import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const SeriesPage = ({page, ep,slugs}) => {
  var [selected, Setselected] = useState("")
 
  const router =useRouter();
  if(router.isFallback){
    return <Loader />
  }




 var description ="הסדרה "; // השם של הסדרה ואיזה מספר פרק
 var ogDescription =""; // תקציר של הפרק
 page.search.map((item)=> ( description != "הסדרה "? description = description +"/"+ item: description =  description + item));
 description  = description +" לצפייה והורדה ישירה עם כתוביות בעברית באיכות גבוהה!"
 var title_ = page.title;

    if(ep)
    {
      title_ =page.title + " פרק " + ep.name;
      description = description + " פרק " + ep + "!";

      if(ep?.summaryEp?.raw.children != "")
      ep?.summaryEp?.raw?.children.map((typeObj, index) => {
        typeObj.children.map((item, itemindex) => 
        ogDescription = ogDescription + item.text
      )});
      else
      ogDescription = "לפרק זה אין תקציר זמין."
    }
    else{
      title_ = "Anizzama - " + page.title;
      if(page.summaryAnime ){
        page.summaryAnime.raw.children.map((typeObj, index) => {
          typeObj.children.map((item, itemindex) => 
          ogDescription = ogDescription + item.text
        )});
      } 

      if(ogDescription =="" || ogDescription =="content")
      ogDescription ="לסדרה זו אין תקציר זמין."

    };
    



  return (
    <>
    
      <div className="container mx-auto px-10 mb-8" >
      <Head>
      <title>{title_}</title>
          <link rel="canonical" href={"https://www.anizzama.com/series/"+ page.title}/>
          <meta property="og:title" content={title_}/>
          <meta property="og:description" content={ogDescription}/>
          <meta property="description" content={description}/>
          <meta property="og:url" content= {"https://www.anizzama.com/series/"+slugs.slug}/>
          <meta property="og:image" content={page.featuredImage.url}/>
          <meta property="og:site_name" content="Anizzama"/>
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 " >
            <PageDetail post ={page} type={"sad"} ep ={ep} slugs={slugs} />
             <Author  author={page.author} />

            <CommentsFrom Slug={`/${page.format}/${page.slug}/${page.epSlug}`} slug={ep.epSlug} type={"ep" }selected={selected}  Setselected={Setselected}/>
            <Comments slug={ep.epSlug} from={"ep" } selected={selected}  Setselected={Setselected} Author ={ep.author} />
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
export default SeriesPage;



export async function getStaticProps({ params }) {



  var ep = null;

  var page =null ;



    
    page =  await getpageDetails(params.slug)

    var id = page.seasons_.filter((item) =>(item.seasonSlug ==params.slug))[0].eps.filter((ep)=> (ep.epSlug == params.epSlug))[0].id
  
    ep = await getEpDetails(id)

    
 

  return {
    props: {
      page: page,
      ep : ep,
      slugs: params,
    },
  };
 

}

export async function getStaticPaths() {

  console.log("sad");
  const posts = await getPageFormat();
  var paths = null ;
  posts.map((p)=>{
    p.node.seasons_.map((season,index)=>{
       paths = season.eps.map((ep,index)=>{
        return {
          params:{slug: `${season.seasonSlug}`,epSlug: `${ep.epSlug}`,type: `${p.node.format}`},
        };
      })

    })

  })
  console.log({paths})
  return{
    paths,
    fallback: true,
  }

}