import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';

import { PageDetail,Categories, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo,Toolbar} from '../../components/getComponents';
import { getPageFormat, getpageDetails } from '../../services/services';


const MoviePage = ({page,ep,slugs}) => {
  var [selected, Setselected] = useState("")

 const router =useRouter();
 if(router.isFallback){
  return <Loader />
 }
 

 var description ="הסרט "; // השם של הסרט ואיזה מספר לינק
 var ogDescription =""; // תקציר של הסרט
 page.search.map((item)=> ( description != "הסרט "? description = description +"/"+ item: description =  description + item));
 description  = description +" לצפייה והורדה ישירה עם כתוביות בעברית באיכות גבוהה!"
 var title_ ="Anizzama - " + page.title;



   
  if(ep)
  {
    if(ep.summaryEp)
    ep.summaryEp.raw.children.map((typeObj, index) => {
      typeObj.children.map((item, itemindex) => 
      ogDescription = ogDescription + item.text
    )});
    if(ogDescription =="" || ogDescription =="content")
    ogDescription ="לסרט זה אין תקציר זמין."

  }else{
    if(page.summaryAnime)
    page.summaryAnime.raw.children.map((typeObj, index) => {
      typeObj.children.map((item, itemindex) => 
      ogDescription = ogDescription + item.text
    )});
    if(ogDescription =="" || ogDescription =="content")
    ogDescription ="לסרט זה אין תקציר זמין."
 
  };
  

  return (
    <>
      <div className="container mx-auto px-10 mb-8"  id ="body" >
      <Head>
      <title>{title_}</title>
          <link rel="canonical" href={"https://www.anizzama.com/movie/"+page.title}/>
          <meta property="og:title" content={title_}/>
          <meta property="og:description" content={ogDescription}/>
          <meta property="description" content={description}/>
          <meta property="og:url" content= {"https://www.anizzama.com/movie/"+slugs.slug}/>
          <meta property="og:image" content={page.featuredImage.url}/>
          <meta property="og:site_name" content="Anizzama"/>
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 "  >

             <PageDetail post ={page} type={"sad"}  ep ={ep} />
             <Author  author={page.author} />

            <CommentsFrom slug={page.slug} type="page" selected={selected}  Setselected={Setselected}/>
            <Comments slug={page.slug} from="pages" selected={selected}  Setselected={Setselected}  />
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
export default MoviePage;


export async function getStaticProps({ params }) {

  var pieces = params.slug.split("-");
 
  var ep = null;
  var isit = false;
  var page =null ;
  pieces.filter((val) =>  {if(val == "watch"){ isit  = true} })


  if( isit == false)
  {
    page =  await getpageDetails(params.slug)
  }
  else{
    ep = await getEpDetails(params.slug)
    page =  await getpageDetails(ep.page.slug)
  }

  return {
    props: {
      page: page,
      ep : ep,
      slugs: params,
    },
  };
}


export async function getStaticPaths() {
  const posts = await getPageFormat('movie');

  const paths = posts.filter((p,index)=>{
    if(p.node.format == "movie"){
      return p;
    }
   
  }).map((p)=>{
    const paths_ = p.node.eps.map((ep,index)=>{
      return {
        params:{slug: `${ep.slug}`},
       
      };
    })
    return {
      params:{slug: `${p.node.slug}`},
     
    };
  })

  return{
    paths,
    fallback: true,
  }

}


