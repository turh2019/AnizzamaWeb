import React, { useRef,useState,useEffect} from 'react';
import moment from 'moment';

import Link from 'next/link'


import {  Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const handleClick = (string) => {
  window.open(string);
};




const stayles ={
  classNameSpan_1 : 'flex justify-center',
  classNameSpan_2 : '',
}

const PageDetail = ({ post , ep ,page ,slugs}) => {

  var slug = "";
  const OptionsMore =  ep?.linkVideo?.map((link,index)=>(
   {OptionName:link.nameFormat , href:null , to:``,onclick:link.link}
  ))




  
  useEffect(() => {
    if(ep == null) return;
    Update();
  }, [])
  


   const Update = () =>{

   slug = ep.epSlug;
      const name = "watching" 
    
      scroller.scrollTo(name, {
        duration: 1500,
        delay: 100,
        smooth: true,
        offset: -350, // Scrolls to element + 50 pixels down the page
        
      })
   }

  
  const [watching,setWatching] = useState(false);
  const [open,SetOpen] = useState(false);
  var [OnClick,SetOnClick] = useState("")
  if(OnClick == "" &&ep)
   ep?.linkVideo.map((l,index) => (index == 0 ? SetOnClick(l.link):"" ));

  const vidRef = useRef(null);
   
  const handlePlayVideo = () => {
    vidRef.current.play();
  }
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
   
    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    
    }

    switch (obj.type) {
      case 'heading-three'://h3
        return <h3 key={index} className="text-xl font-semibold mb-4 canter mx-2  text-white">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;

      case 'paragraph'://" "
        return <p key={index} className="mb-5 mx-2 text-lg text-textColor text-gray-200 text-white ">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;

      case 'heading-four'://h4
        return <h4 key={index} className="text-md font-semibold mb-4 mx-2  text-white">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;

        case 'link'://h4
        return  <a target="_blank" key={index} href={obj.href}><Link target="_blank" key={index} href={obj.href} ><span className ="transition duration-700   text-blue-300  text-center text-linksColor  mb-8 cursor-pointer hover:text-cover_color   ">{obj.title}</span></Link></a>;

      case 'image': //img
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
    
  };

 
   
  return (
    <>
 
    <div >

      <div className="bg-cover_bg_color text-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 rtl:mr-3 "dir="rtl" id="body" >
        <div className="relative  shadow-md mb-6  lg:scale-100 scale-75">
          <img src={post.wallpaper.url} alt="פאן ארט של הסדרה." 
          className="object-top h-50 w-50 object-cover shadow-lg rounded-t-lg lg:rounded-lg border-l-2 border-b-2  border-[#706AD9] content-center  " />
         
         
          {open == true ? 
            <div className='mt-4'>
              {post.summaryAnime.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                 return getContentFragment(index, children, typeObj, typeObj.type);
              })}
       
            </div> :
          ""}
           <div className='flex justify-center'>
            {post.format !="team" ?  <button onClick={ (e)=>(SetOpen(!open))} >  <h1 className="focus:bg-cover_bg_color_2  my-5 mx-1 transition duration-500 ease hover:bg-cover_color inline-block bg-cover_bg_color_2 text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3">{open? "סגור תקציר" : "פתח תקציר"}</h1></button> :""}
           
          </div>
          <div className='flex justify-center'>
          
            
          {post.pages_.slug == "anime" ?  <button className='content-center focus:bg-cover_bg_color_2  my-5 mx-1 transition duration-500 ease hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg font-medium rounded-full text-white px-20 py-3 cursor-pointer ml-3 text-2xl   my-5' onClick={(e)=>{setopen(!open)}}>{open ?"close":"open"}</button>:""}
          </div>
        </div>
     
        <div className="px-4 lg:px-0 " >
          <div className="flex items-center mb-8 w-full " >
            <div className=" md:flex items-center justify-center mb-0 w-auto  items-center  rounded-lg  ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mx-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.pages_.map((p) =>(p.slug))=="anime" ?<span className="align-middle">Produced at {moment(post.time).format('MMM DD, YYYY')}</span> :<span className="align-middle">  {moment(post.time).format('MMM DD, YYYY')}</span>}
              {post.pages_.map((p) =>(p.slug)) !="anime" ?<div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center ">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-200 mr-2 font-medium text-lg">{post.author.name}</p>
            </div>:""}
             
            </div>


          </div>


          <h1 className="my-10 text-3xl font-semibold text-center rtl:mr-3  ">{post.title}</h1>
         
          <div className='text-right rtl:mr-3 ' id = "bodyText"> 
              {post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                  return getContentFragment(index, children, typeObj, typeObj.type);
              })}
          </div>
          {post.seasons_.length > 1?
          <div className='grid grid-flow-row auto-rows-max  flex justify-left pb-5 border-b-2 place-content-start  '  >
              <div className='flex  flex-wrap basis-1/2 place-content-center px-2 flex justify-left '> 
             
              {post.seasons_.map((season,index)=>(
                        <span className ="cursor-pointer flex justify-left" key ={index + season.nameSeason}>
                          <a href={`/${post.format}/${season.seasonSlug}`}>
                            <Link  target="_blank" href={`/${post.format}/${season.seasonSlug}`}  className="transition duration-700 text-center color-white  cursor-pointer hover:text-cover_color text-3xl font-semibold  " >
                                  {season.seasonSlug == post.slug?   <h1 className="  mx-1 transition duration-500 ease hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3 transition duration-500 ease transform hover:-translate-y-1">{season.seasonShowName} </h1>:  <h1 className=" transition duration-500 ease transform hover:-translate-y-1  mx-1 transition duration-500 ease hover:bg-cover_color inline-block bg-cover_bg_color_2 text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3">{season.nameSeason} </h1>}
                            </Link>
                          </a>
                        </span>         
                  ))} 
            </div>
          </div>:""}
          
          <div className='grid grid-flow-row auto-rows-max  py-3 flex justify-canter  ' >
              <div className='flex  flex-wrap basis-1/2 place-content-center   px-2 py-2'> 
              
                  {post.seasons_.map((season,index)=>(
                     season.seasonSlug == post.slug? 
                        season.eps.map((ep_,index)=>(
                            <span className ="cursor-pointer">
                                <Link to="watching"   target="_blank"   href={{ pathname:`/[type]/[slug]/eposide/[epSlug]`, query: { slug: `${post.slug}`, epSlug:`${ep_.epSlug}`, type:`${post.format}`},}} key ={index + ep_.epNum} className="transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-cover_color text-3xl font-semibold  " >
                                      {ep?.slug == ep_?.slug ? <h1 className=" my-5 mx-1 transition duration-500 ease hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3">{ep_.epNum} </h1>:<h1 className="  my-5 mx-1 transition duration-500 ease hover:bg-cover_color inline-block bg-cover_bg_color_2 text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3">{ep_.epNum} </h1>} 
                                  </Link>
                       
                              </span>   
                        )):""
                  ))}
            </div>
            
          </div>
                              
        </div>


      </div>
        
        {ep ?
          <div>
            <div className='' id="watching">
                <h1 className='transition duration-700 text-center text-white  mb-4 text-3xl font-semibold  flex justify-center'>{ep.nameEp}</h1>
                
                <span className='flex justify-center'>   
               
                  <iframe src={OnClick} allowfullscreen="true" Optio  allow="autoplay" className='  w-full h-full aspect-video bg-red     rounded-lg'  playIcon={<button>Play</button>}></iframe>           
                 

                </span>
                <div className='mt-4 mb-5  border-2 rounded-lg p-2  bg-gradient-to-r from-[#101140] to-[1C1652] grid grid-flow-col auto-cols-auto text-white' >  
                  {ep.linkVideo.map((e,index)=> (
                    <a className=' text-center shadow-size-[26px] rounded-lg mx-2   text-[17px]  out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg    hover:cover_color  bg-[#3E2E88] ' onClick={ (on)=>( SetOnClick(e.link) )}>
                          {e.nameFormat} 
                    </a>))}  
                 </div>
      
             
             
            </div>
             
            <div className='bg-cover_bg_color_2 box-decoration-slice box-content p-4 mt-4   rounded-lg border-x-cover_color-500 drop-shadow-xl'>
              <div className='text-right rtl:mr-3 text-white '> 
                 { ep?.summaryEp?.raw?.children.map((typeObj, index) => {
                        const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                          return getContentFragment(index, children, typeObj, typeObj.type);
                      }) }
                </div>              
              </div>
          </div>
      :""}
  </div>
    </>
  );
};

export default PageDetail;
