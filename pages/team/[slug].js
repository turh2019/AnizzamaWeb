import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import  Head  from 'next/head';

import { PageDetail,Categories, PostWidget, Author, Comments, CommentsFrom,Loader ,LinksTo,Toolbar} from '../../components/getComponents';
import { getPage, getpageDetails } from '../../services/services';


const TeamPage = ({post, ep,slugs}) => {
  var [selected, Setselected] = useState("")

  const router =useRouter();
  if(router.isFallback){
    return <Loader />
  }

 var link = null
 var summary_ = null
 var description ="הסדרה :";
 post.search.map((item)=> ( description != "הסדרה :"? description = description +"/"+ item: description =  description + item));
 description  = description +" לצפייה והורדה ישירה עם כתוביות בעברית באיכות גבוהה!  "
 var title_ = post.title;




    if(ep)
    {
      title_ =post.title + " פרק " + ep;
      description =  description + title_;
      description = description + "\n";
      if(summary_)
      summary_.raw.children.map((typeObj, index) => {
        typeObj.children.map((item, itemindex) => 
        description = description + item.text
      )});
    }

    var descriptionA;
    var descriptionB;
    var titleA;
    var dd;
           if(slugs.slug === 'jobs') {
             descriptionA = "עמוד הדרושים; בעמוד זה תוכלו להבחן ולראות את מגוון התפקידים בפאנסאב."
             descriptionB = "עמוד הדרושים; בעמוד זה תוכלו להבחן ולראות את מגוון התפקידים בפאנסאב."
             titleA = "Anizzama - Jobs"
             dd = "jobs"
            } else if(slugs.slug === 'about') {
             descriptionA = "אניזאמה; בעמוד זה תוכלו לקרוא את כל מה שאתם צריכים לדעת עלינו!"
             descriptionB = "אניזאמה; בעמוד זה תוכלו לקרוא את כל מה שאתם צריכים לדעת עלינו!"
             titleA = "Anizzama - About Us"
             dd = "about"
            }
           //  <meta property="og:description" content="עמוד הדרושים; בעמוד זה תוכלו להבחן ולראות את מגוון התפקידים בפאנסאב."/>
  return (
    <>
      <div className="container mx-auto px-10 mb-8"  id="body">
      <Head>
            <title>{titleA}</title>
             <meta name="description" content={descriptionA}/>
             <meta property="og:url" content={"https://www.anizzama.com/team/"+dd}/>
             <meta property="og:title" content={titleA}/>
             <meta property="og:description" content={descriptionB}/>
             <meta property="og:site_name" content="Anizzama"/>
             <meta property="og:image" content={post.featuredImage.url}/>
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" >
          <div className="col-span-1 lg:col-span-8 ">
          <PageDetail post ={post} type={"sad"}  ep ={ep} />
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
export default TeamPage;



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
  

  const data = await getpageDetails(p_)
  return {
    props: {
      post: data,
      ep : ep_,
      slugs: params
    },
  };
}



export async function getStaticPaths() {
  const posts = await getPage();

  const paths = posts.map((p,index)=>{
    
    return {
      params:{slug: `${p.node.slug}`},
     
    };
  })

  return{
    paths,
    fallback: true,
  }

}