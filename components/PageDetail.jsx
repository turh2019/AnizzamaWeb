import React, { useRef} from 'react';
import moment from 'moment';

import Link from 'next/link'
const PageDetail = ({ post }) => {
    
 

  
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
        return  <Link key={index} href={obj.href} ><span className ="transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6]  font-semibold  ">{obj.title}</span></Link>;

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
      <div className="bg-[#261D78] text-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6  lg:scale-100 scale-75">
          <img src={post.featuredImage.url} alt="" 
          className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg border-l-2 border-b-2  border-[#706AD9] " />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center ">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full "
                
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-200 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-10 text-3xl font-semibold text-center">{post.title}</h1>
          <div className='text-right '> 
              {post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
                  return getContentFragment(index, children, typeObj, typeObj.type);
              })}
          </div>
          <div className='grid grid-flow-row auto-rows-max  py-5 flex justify-canter   ' >
              <div className='flex  flex-wrap basis-1/2 place-content-center   px-2 py-2'> 
              
                  {post.linkVideo.map((linkEp,index)=>(
                     <Link key={linkEp} href={linkEp}> 
                      <span  className ="cursor-pointer  ">
                        <button type="button"  className=" my-5 mx-1 transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer ml-3">
                            {post.pages_.map((page)=>(
                                page.name == "סדרות" ? "פרק  ":"קישור לסרט מספר "
                            ))}
                              {index+1} 
                        </button>
                      </span>       
                      </Link>          
                  ))}
            </div>
          </div>
       
        </div>
      </div>
       
    </>
  );
};

export default PageDetail;