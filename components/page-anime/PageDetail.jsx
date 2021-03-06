import React, { useRef,useState,useEffect} from 'react';
import moment from 'moment';
import Dropdown from '../navigation-bar/Dropdown';
import Link from 'next/link'

const handleClick = (string) => {
  window.open(string);
};




const stayles ={
  classNameSpan_1 : 'flex justify-center',
  classNameSpan_2 : '',
}

const PageDetail = ({ post , ep }) => {
  const OptionsMore =  ep?.linkVideo?.map((link,index)=>(
   {OptionName:link.nameFormat , href:null , to:``,onclick:link.link}
  ))
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
        return <h3 key={index} className="text-xl font-semibold mb-4 canter mx-2">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;

      case 'paragraph'://" "
        return <p key={index} className="mb-5 mx-2">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;

      case 'heading-four'://h4
        return <h4 key={index} className="text-md font-semibold mb-4 mx-2">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;

        case 'link'://h4
        return  <a target="_blank" key={index} href={obj.href}><Link target="_blank" key={index} href={obj.href} ><span className ="transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6]  font-semibold  ">{obj.title}</span></Link></a>;

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
      <div className="bg-[#261D78] text-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 rtl:mr-3 "dir="rtl">
        <div className="relative  shadow-md mb-6  lg:scale-100 scale-75">
          <img src={post.wallpaper.url} alt="?????? ?????? ???? ??????????." 
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
            {post.format !="team" ?  <button onClick={ (e)=>(SetOpen(!open))} >  <h1 className="focus:bg-[#382C8B]  my-5 mx-1 transition duration-500 ease hover:bg-[#4864F6] inline-block bg-[#382C8B] text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3">{open? "???????? ??????????" : "?????? ??????????"}</h1></button> :""}
           
          </div>
          <div className='flex justify-center'>
          
            
          {post.pages_.slug == "anime" ?  <button className='content-center focus:bg-[#382C8B]  my-5 mx-1 transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-20 py-3 cursor-pointer ml-3 text-2xl   my-5' onClick={(e)=>{setopen(!open)}}>{open ?"close":"open"}</button>:""}
          </div>
        </div>
     
        <div className="px-4 lg:px-0 ">
          <div className="flex items-center mb-8 w-full ">
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
         
          <div className='text-right rtl:mr-3 '> 
              {post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                  return getContentFragment(index, children, typeObj, typeObj.type);
              })}
          </div>
          
     
          
          <div className='grid grid-flow-row auto-rows-max  py-5 flex justify-canter  mt-3 ' >
              <div className='flex  flex-wrap basis-1/2 place-content-center   px-2 py-2'> 
              
                  {post.eps.map((ep,index)=>(
                     
                        <span className ="cursor-pointer">
                           <Link  target="_blank" href={`/${post.format}/${ep.slug}`} key ={ep.slug} className="transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6] text-3xl font-semibold  " >
                                <h1 className="focus:bg-[#382C8B]  my-5 mx-1 transition duration-500 ease hover:bg-[#4864F6] inline-block bg-[#382C8B] text-lg font-medium rounded-full text-white px-5 py-3 cursor-pointer ml-3 mt-3">{ep.epNum} </h1>
                           </Link>
                      </span>       
                            
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
                    <a className=' text-center shadow-size-[26px] rounded-lg mx-2   text-[17px]  out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg    hover:bg-[#4864F6]  bg-[#3E2E88] ' onClick={ (on)=>( SetOnClick(e.link) )}>
                                  {e.nameFormat} 
                    </a>))}  
                 </div>
      
             
             
            </div>
             
            <div className='bg-[#382C8B] box-decoration-slice box-content p-4 mt-4   rounded-lg border-x-[#4864F6]-500 drop-shadow-xl'>
              <div className='text-right rtl:mr-3 text-white '> 
                 { ep.summaryEp.raw.children.map((typeObj, index) => {
                        const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                          return getContentFragment(index, children, typeObj, typeObj.type);
                      }) }
                </div>              
              </div>
          </div>
      :""}

    </>
  );
};

export default PageDetail;
