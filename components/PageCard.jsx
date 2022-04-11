import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';



const handleClick = () => {
  window.open("http://twitter.com/saigowthamr");
};
const PostCard = ({ post }) => (
  
  <div className="bg-[#261D78] text-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 border-2  border-[#18154E] rtl:mr-3  grid grid-cols-1  " dir="rtl">

 
    <div className="relative overflow-hidden shadow-md mb-6  lg:scale-100 scale-75">
      <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg border-l-2 border-b-2  border-[#706AD9] " />


    </div>
          <h1 className="transition duration-700 text-center color-white  mb-2 cursor-pointer hover:text-[#4864F6] text-xl lg:text-2xl font-semibold  ">
            <Link target="_blank" to={`/page/${post.slug}`} href={`/page/${post.slug}`}  >
              <span className="" >{post.title}</span>
            </Link>
          </h1>

          <p className="text-center text-base text-white-700 font-normal">
             {post.excerpt}
          </p>
          <div className="text-center items-center my-2  w-full text-white  ">
    </div>
    

    <div className="text-center sticky " target="_blank"  dir="rtl" >
      <a href={`/page/${post.slug}`} target="_blank" className=' cursor-pointer' >
        <Link target="_blank" to={`/page/${post.slug}`} href={`/page/${post.slug}`}  >
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-[#3E2E88] text-lg font-medium rounded-full text-white px-3 py-1 lg:px-8 lg:py-3 cursor-pointer" >לדף הסדרה</span>
        </Link>
      </a>
    </div>

  </div>
);

export default PostCard;