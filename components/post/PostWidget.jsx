import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';



import { getSimilarPosts, getRecentPosts } from '../../services/services';

const PostWidget = ({ tags, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
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
    <div className="bg-[#261D78] shadow-lg rounded-lg p-8 pb-12 mb-9">
      <h3 className="text-xl mb-8 text-white font-semibold border-b pb-4 flex justify-center">{slug ? 'פוסטים קשורים' : 'פוסטים אחרונים'}</h3>
      {relatedPosts.map((post, index) => (
      <>
        {randomNum_1 == -1 ? handleRandom(relatedPosts.length):""}
          {slug != null && (index != randomNum_1 && index != randomNum_2 &&index != randomNum_3) ? "":
          <div key={index} className="flex items-right w-full mb-6 text-white " >
            
            <div className="flex-grow ml-10">
              <p className="text-gray-400 font-xs flex justify-center">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <div className='flex justify-center text-center transition duration-700 text-center color-white  mb-8  hover:text-[#4864F6]  font-semibold  mx-3' dir="rtl">
                 <Link target="_blank" href={`/post/${post.slug}#body`} className="text-md flex justify-center " key={index} dir="rtl">
                   {post.title}
                   </Link>
              </div>
            </div>
            <div className=" flex-none  ">
              <Link target="_blank" href={`/post/${post.slug}#body`} className="text-md flex justify-center cursor-pointer" key={index}>
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
          </>
      ))}
    </div>
  );
};

export default PostWidget;
