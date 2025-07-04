import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';



const handleClick = () => {
  window.open("http://twitter.com/saigowthamr");
};
const PostCard = ({ post ,type }) => (
  
  <div className="bg-cover_bg_color text-white shadow-lg rounded-lg p-8 pb-12 mb-8 border-2  border-[#18154E] rtl:mr-3  grid grid-cols-1  " dir="rtl">

 
    <div className="relative overflow-hidden shadow-md mb-6  lg:scale-100 scale-75">
      <img src={post.featuredImage.url} alt="תמונה מהפרק." className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg border-l-2 border-b-2  border-[#706AD9] " />

 
    </div>
    {type == "team" ?   <div className="block lg:flex text-center items-center  mb-8 w-full text-white ">
      <div className="flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center text-white justify-center">
        <Image
          unoptimized
         
          alt={post.author.name}
          height="30px"
          width="30px"
          className="align-middle rounded-full "
          src={post.author.photo.url}
        />
        
        <p className="inline align-middle text-white-700 mx-2 font-medium text-lg">{post.author.name}</p>
      </div>
      
      <div className="font-medium text-white-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mx-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
      </div>
    </div>:""}

          <h1 className="transition duration-700 text-center color-white  mb-2 cursor-pointer hover:text-cover_color text-xl lg:text-2xl font-semibold  ">
            <Link target="_blank" to={`/${type}/${post.slug}`} href={`/${type}/${post.slug}`}  >
              <span className="" >{post.title}</span>
            </Link>
          </h1>

          <p className="text-center text-base text-lg  text-gray-200  text-textColor font-normal">
             {post.excerpt}
          </p>
          <div className="text-center items-center my-2  w-full text-white  ">
    </div>
    

    <div className="text-center sticky " target="_blank"  dir="rtl" >
      <a href={`/${type}/${post.slug}`} target="_blank" className=' cursor-pointer' >
        <Link target="_blank" to={`/${type}/${post.slug}`} href={`/${type}/${post.slug}`}  >
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-[#3E2E88] text-lg font-medium rounded-full text-white px-3 py-1 lg:px-8 lg:py-3 cursor-pointer" >לדף הסדרה</span>
        </Link>
      </a>
    </div>

  </div>
);

export default PostCard;