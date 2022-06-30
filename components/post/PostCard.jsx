import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';




const PostCard = ({ post }) => (
  <div className="bg-[#261D78] text-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 border-2  border-[#18154E] rtl:mr-3 " dir="rtl">
   

    <div className="relative overflow-hidden shadow-md mb-6  lg:scale-100 scale-75">
      <img src={post.featuredImage.url} alt="תמונה מהפרק." className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg border-l-2 border-b-2  border-[#706AD9] " />
    </div>
  
    <div className="block lg:flex text-center items-center  mb-8 w-full text-white ">
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
    </div>
          <h1 className="transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6] text-3xl font-semibold  ">
            <Link  target="_blank" href={`/post/${post.slug}`} key ={post.slug}>{post.title}</Link>
          </h1>

          <p className="text-center text-lg text-white-700 font-normal px-4 lg:px-20 mb-8 rtl:mr-3">
             {post.excerpt}
          </p>
    <div className="text-center">
      <a target="_blank" href={`/post/${post.slug}`}>
      <Link target="_blank" href={`/post/${post.slug}`}  to={`/post/${post.slug}`} >
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-[#3E2E88] text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">להמשיך לקרוא</span>
      </Link>
      </a>
    </div>
  </div>
);

export default PostCard;

