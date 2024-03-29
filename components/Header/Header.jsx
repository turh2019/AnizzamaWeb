import React, { useState, useEffect } from 'react';
import { FeaturedPosts} from '../../sections/index';
import Link from 'next/link';
import { getCategories } from '../../services/services';
import {Toolbar} from '../getComponents';

const points =[{name :"p1" ,size:5},{name :"p2",size:10},{name :"p2",size:10},{name :"p2",size:10},{name :"p2",size:10}]
const Header = (type) => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className=' mx-auto  mb-8 content-center  grid grid-flow-row  auto-rows-max justify-center  '>
{/*           
            <div className=" bg-no-repeat bg-bgt-top flex justify-center  object-center  h-[550px] w-[1000px] object-cover rounded-t-lg   py-10 bg-center  " >
                 
                    <div className=" col-span-2 container mx-auto  ">
                        <div className=' '>
                              <h1 className='transition duration-700 text-center text-white  mb-5 pb-5 text-3xl font-semibold  flex justify-center'>פוסטים מומלצים</h1> 
                              <FeaturedPosts className=" " /> 
                        </div>
                    </div>
            </div> */}
        </div>   
      );
};

export default Header;

