import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {getCategories} from '../services/services'
import { getPosts, getPostDetails } from '../services/services';

function Categories() {
   const [categories, setcategories] = useState([])
 
   useEffect(() =>{
    getCategories()
       .then((newCategories)=>setcategories(newCategories))
   },[])
   
    return (
        <div className ="bg-[#261D78] shadow-lg rounded-lg p-8 mb-8 pb-12 text-white">
                  <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center">
                     קטגוריות      
                  </h3>
                  <div className='flex flex-wrap'>
                        {categories.map((category, index)=>(
                            <Link key={category.slug}  href={`/category/${category.slug}`}>
                                <span className ="cursor-pointer block pb-3 mb-4 flex justify-center transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6]  font-semibold  mx-2 block">
                                    {category.name}
                                </span>
                            </Link>
                        ))}

                  </div>
             
        </div>
    )
}

export default Categories
