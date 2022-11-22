import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';



import { getSimilarPosts, getRecentPosts ,GetRecommendedPost} from '../../services/services';

const PostWidget = ({ tags, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [recommendedPost, setRecommendedPost] = useState([]);
  const [isRecommendedPost, setIsRecommendedPost] = useState(slug? true:   Math.floor(Math.random() * 2)  != 1 ? false : true);
  var  randomNum_1  = -1;
  var  randomNum_2 = 0;
  var  randomNum_3 = 0;
 
  useEffect(() => {
    if (slug) {
     
      getSimilarPosts(tags , slug).then((result) => {
        setRelatedPosts(result);  
      });
     
      
    } else {
     
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }

    GetRecommendedPost().then((result) => {
      setRecommendedPost(result); });

  }, [slug]);

  

  const handleRandom =( length) =>{
  
      handleRandom_1(length);
      if(length > 1)
      handleRandom_2(length);
      if(length > 2)
      handleRandom_3(length);
  }

  const handleRandom_1 =(length) =>{
    randomNum_1 = Math.floor(Math.random() * length )
  }

  const handleRandom_2 =(length) =>{
    randomNum_2 = Math.floor(Math.random() * length )
    if(randomNum_2 == randomNum_1 )
    {     
      handleRandom_2(length);
    }
  }

  const handleRandom_3 =(length) =>{
    randomNum_3 = Math.floor(Math.random() * length )
    if(  randomNum_3 == randomNum_2 ||randomNum_3 == randomNum_1)
    {
      handleRandom_3(length);
    }
  }
  

    

  return (
    <div className="bg-cover_bg_color shadow-lg rounded-lg p-8 pb-12 mb-9">
      {randomNum_1 == -1 ? handleRandom(slug? relatedPosts.length:recommendedPost.length) && setIsRecommendedPost(slug? true:  Math.floor(Math.random()) * 2 != 1 ? false : true):""}
     <div className=' text-xl mb-8 text-white font-semibold border-b pb-4 flex justify-center'>

     <h3 className="">{isRecommendedPost || slug ? slug ? 'פוסטים קשורים' : 'פוסטים אחרונים' : "פוסטים מומלצים"}</h3>
     { !slug && <button onClick={(e)=>(setIsRecommendedPost(!isRecommendedPost))} className=' translate-x-[300%] hover:scale-110 '><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg></button>}
     </div>
      
      <div className='transition duration-700 ease-in-out open:w-full w-0' open ={isRecommendedPost}>
      { isRecommendedPost  && relatedPosts.filter((item,index)=>(  !slug || index ==  randomNum_1 || index == randomNum_2 || index == randomNum_3)).map((post, index) => (
      <span key={index} className='transition duration-700 ease-in-out  open:scale-100 sacle-0' open ={!isRecommendedPost}>
          <div  className="flex items-right w-full mb-6 text-white " >
            
            <div className="flex-grow ml-10">
              <p className="text-gray-400 font-xs flex justify-center">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <div className='flex justify-center text-center transition duration-700 text-center color-white  mb-8  hover:text-cover_color  font-semibold  mx-3' dir="rtl">
                 <Link target="_blank" href={`/post/${post.slug}`} className="text-md flex justify-center " key={index} dir="rtl">
                   {post.title}
                   </Link>
              </div>
            </div>
            <div className=" flex-none  ">
              <Link target="_blank" href={`/post/${post.slug}`} className="text-md flex justify-center cursor-pointer" key={index}>
                <Image
                  alt={post.title}
                  height="60px"
                  width="60px"
                  unoptimized
                  className="align-middle rounded-full cursor-pointer "
                  src={post.featuredSmallImage.url}
                />
              </Link>
            </div>
          </div>
          </span>
      ))}
   </div>
<div className='transition duration-700 ease-in-out   ' open ={!isRecommendedPost}>
  { !isRecommendedPost && recommendedPost.filter((post, index) =>(  index ==  randomNum_1 ||  index == randomNum_2 ||index ==  randomNum_3 )).map((post, index) => (
        <span key={index} className='transition duration-700 ease-in-out  open:scale-100 sacle-0' open ={!isRecommendedPost}>
         
            {slug != null && (index != randomNum_1 && index != randomNum_2 &&index != randomNum_3) ? "":
            <div  className="flex items-right w-full mb-6 text-white " >
              
              <div className="flex-grow ml-10">
                <p className="text-gray-400 font-xs flex justify-center">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <div className='flex justify-center text-center transition duration-700 text-center color-white  mb-8  hover:text-cover_color  font-semibold  mx-3' dir="rtl">
                  <Link target="_blank" href={`/post/${post.slug}`} className="text-md flex justify-center " key={index} dir="rtl">
                    {post.title}
                    </Link>
                </div>
              </div>
              <div className=" flex-none  ">
                <Link target="_blank" href={`/post/${post.slug}`} className="text-md flex justify-center cursor-pointer" key={index}>
                  <Image
                    alt={post.title}
                    height="60px"
                    width="60px"
                    unoptimized
                    className="align-middle rounded-full cursor-pointer "
                    src={post.featuredSmallImage.url}
                  />
                </Link>
              </div>
            </div>}
            </span>
        ))}
</div>




    </div>
  );
};

export default PostWidget;
