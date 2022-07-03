import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';

import { PageDetail,Categories, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo,Toolbar} from '../../components/getComponents';
import { getPageFormat, getpageDetails } from '../../services/services';


const OnaPage = ({post, ep,slugs,name}) => {
  var [selected, Setselected] = useState("")

  const router =useRouter();
  if(router.isFallback){
    return <Loader />
  }

 var link = null//  קישור לפרק
 var summary_ = null //  תקציר
 var description ="הסדרה "; // השם של הסדרה ואיזה מספר פרק
 var ogDescription =""; // תקציר של הפרק
 post.search.map((item)=> ( description != "הסדרה "? description = description +"/"+ item: description =  description + item));
 description  = description +" לצפייה והורדה ישירה עם כתוביות בעברית באיכות גבוהה!"
 var title_ = post.title;


 if( post.linkVideo.length >0)
    post.linkVideo.map((link_, index ) => index == ep -1 ? link = link_ :"" )
  if( post.summary.length >0)
    post.summary.map((sum, index ) => index == ep -1 ?  summary_ = sum:"" )

    if(ep)
    {
      title_ =post.title + " פרק " + ep;
      description = description + " פרק " + ep + "!";
      if(summary_)
      summary_.raw.children.map((typeObj, index) => {
        typeObj.children.map((item, itemindex) => 
        ogDescription = ogDescription + item.text
      )});
      else
      ogDescription = "לפרק זה אין תקציר זמין."
    }
    else{
      title_ = "Anizzama - " + post.title;
      if(post.summaryAnime ){
        post.summaryAnime.raw.children.map((typeObj, index) => {
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
          <link rel="canonical" href={"https://www.anizzama.com/ona/"+name}/>
          <meta property="og:title" content={title_}/>
          <meta property="og:description" content={ogDescription}/>
          <meta name="description" content={description}/>
          <meta property="og:url" content= {"https://www.anizzama.com/ona/"+slugs.slug}/>
          <meta property="og:image" content={post.featuredImage.url}/>
          <meta property="og:type" content="ona"/>
          <meta property="og:site_name" content="Anizzama"/>
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 ">
          <PageDetail post ={post} type={"sad"}  link = {link} ep ={ep} summary_ ={summary_}/>
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
export default OnaPage;



export async function getStaticProps({ params }) {

  var pieces = params.slug.split("-");

  
  var p_ ="";
  var ep_ = 0
  var isfound= false;
  pieces.map((p,index)=>{
 
    p != "episode"  && p !="link" && isfound == false  ? 
    p_!=""?
    p_ = p_ +"-" + p:
    p_ =  p
    :isfound =true
    index ==  pieces.length-1 && isfound == true?
    ep_ = p:""
  })
  
 
  console.log({ep_})
  const data = await getpageDetails(p_)
  return {
    props: {
      post: data,
      ep : ep_,
      slugs: params,
      name: p_
    },
  };
}



export async function getStaticPaths() {
  const posts = await getPageFormat('ona');

  const paths = posts.map((p,index)=>{
    
    const paths_ = p.node.linkVideo.map((link,index)=>{
    
      return {
        params:{slug: `${p.node.slug}-episode-${index + 1}`},
       
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
