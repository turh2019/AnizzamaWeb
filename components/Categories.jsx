import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {getCategories} from '../services/services'


function Categories({selected,Setselected,type}) {
   const [categories, setcategories] = useState("")
  
   useEffect(() =>{
       
    getCategories()
       .then((newCategories)=>setcategories(newCategories))
   },[])
   const [isActive,setisActive] =useState(false)

   
    return (
        <div className ="p-1 lg:mt-3">
            <div className=' mb-8 lg:border-b-4  lg:border-[#5344C1]'>
            <div className='rounded-full  bg-[#4864F6] text-white mx-5 drop-shadow-xl  ' onClick={(e)=>(setisActive(!isActive))} >
                        
                        <h3 className="text-lg font-semibold text-right  p-1 px-2  caret-pink-500 cursor-pointer mb-3">
                          
                            {selected!=""?
                                <div>
                                    {selected}
                                    <select className='bg-[#4864F6]  rounded-full'>
                                    </select> 
                                </div>
                                 :    
                                 <div>
                                    <select options="null" className='bg-[#4864F6] mr-1 bg-opacity-[0] '>
                                    </select> 
                                    { "קטגוריות"}
                             </div>
                                   
                            }       
                        </h3>
                    </div>
            </div>
                    {isActive&&(
                        <div className='bg-[#4864F6] text-white p-6 mb-10 rounded-lg drop-shadow-xl'>
                            {categories.map((category, index)=>(
                                
                                <a href={`/category/${category.slug}`} target="_blank" className=' cursor-pointer'>
                                    <Link target="_blank"  key={category.slug} type ={type} href={`/category/${category.slug}`}>
                                        <span className ="cursor-pointer block pb-3 mb-4 flex justify-center transition ease-in-out duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6]  font-semibold  mx-2 block hover:bg-white hover:bg-opacity-[0.6] text-center pt-3 drop-shadow-xl rounded-full" onClick={(e)=>{Setselected(category.name); setisActive(false)}}>
                                            {category.name}
                                        </span>
                                    </Link>
                                </a>
                           
                            ))}
         
                        </div>   
                    )}
          
             
        </div>
    )
}

export default Categories
