import React, { useState, useEffect } from 'react';
import { FeaturedPosts } from '../sections/index';
import Link from 'next/link';
import { getCategories } from '../services/services';


const points =[{name :"p1" ,size:5},{name :"p2",size:10},{name :"p2",size:10},{name :"p2",size:10},{name :"p2",size:10}]
const Header = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className='container mx-auto px-10 mb-8 content-center   '>
    
        <div className =" rounded-lg p-0 lg:p-8 pb-12 mb-8 border-b-4  border-[#5344C1]  ">
          <Link href="/">
              <div className='bg-contain bg-center bg-no-repeat bg-title px-10 pt-10 pb-24 relative top-8 cursor-pointer font-bold pt-5 mb-10'> 
              
              </div>
              </Link>
            
          <div className="relative overflow-hidden   mb-15 lg:col-span-8 col-span-1 mb-8 ">
            <div className=" bg-no-repeat bg-bgt-top  object-center  h-full w-full object-cover rounded-t-lg lg:rounded-lg  py-10 bg-center  " >
                  <div className='grid grid-cols-2 gap-20 lg:grid-cols-12  transform-gpu translate-x-24 '> 
                    <div className="lg:col-span-5 col-span-2 container mx-auto translate-x-24 ">
                        <div className='container mx-auto translate-x-24'>
                          <div className='translate-x-14 '>
                            <div className='translate-x-5'>
                              <h1 className='transition duration-700 text-center text-white mb-5 pb-5   cursor-pointer  text-3xl font-semibold  '>post</h1> 
                              <FeaturedPosts className  /> 
                            </div>
                          </div>
                        </div>
                      </div>        
                  </div>
            </div>
          </div>  
        </div>  
     </div>
     
  );
};

export default Header;

