import React, { useRef,useState,useEffect} from 'react';
import moment from 'moment';

import Link from 'next/link'
const PostDetail = ({ post }) => {
 
  const vidRef = useRef(null);
  const [watching,setWatching] = useState(false);
  const [linkto,setlink] = useState();

  const handlePlayVideo = () => {
    vidRef.current.play();
  }

  //
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
        return <p key={index} className="mb-2 mx-2">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;

      case 'heading-four'://h4
        return <h4 key={index} className="text-md font-semibold mb-4 mx-2">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;

        case 'link'://h4
        return  <a target="_blank" href={obj.href} className ="transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6]  font-semibold "><Link  target="_blank" key={index} href={obj.href} ><span >{obj.title}</span></Link></a>;

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
    
      <div className="bg-[#261D78] text-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8" dir="rtl">
        <div className="relative overflow-hidden shadow-md mb-6  lg:scale-100 scale-75">
          <img src={post.featuredImage.url} alt="תמונה מהפרק." className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg border-l-2 border-b-2  border-[#706AD9] " />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center ">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-200 mr-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mx-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle ml-4">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-10 text-3xl font-semibold text-center">{post.title}</h1>
          <div className='text-right '> 
              {post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                  return getContentFragment(index, children, typeObj, typeObj.type);
              })}
          </div>
          <div className='grid grid-flow-row auto-rows-max  py-5 place-content-center ' >
              <div className=''> 
                  {post.linkVideo.map((linkEp,index)=>(
                     
                    
                      <span className ="cursor-pointer " onClick={(e)=>{setWatching(true); setlink(linkEp)}}>
                         <button type="button"  className="focus:bg-[#382C8B] transition duration-500 ease hover:bg-[#382C8B]  bg-[#4864F6] text-lg font-medium rounded-full text-white  px-5 py-3 cursor-pointer ml-3 mt-3">   קישור מספר  {index+1}  </button>
                      </span>  
                    
     
                           
                  ))}
            </div>
          </div>
           
        </div>
      </div>
      {watching== true?
        <div className='bg-[#4864F6] box-decoration-slice box-content p-4    rounded-lg border-x-[#4864F6]-500 drop-shadow-xl'>
            <iframe src={linkto} allowfullscreen="true"  allow="autoplay" className='w-full h-full aspect-video bg-red  border-4  border-opacity-25 border-black rounded-lg'  playIcon={<button>Play</button>}></iframe>               
        </div>:""}
    </>
  );
};

export default PostDetail;
