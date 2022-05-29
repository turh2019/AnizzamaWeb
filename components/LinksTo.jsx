import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {getCategories} from '../services/services'
import { getLinksto, getPostDetails } from '../services/services';


function LinksTo() {
  
    const [linksTo, setlinksTo] = useState([])
 
    useEffect(() =>{
        getLinksto()
        .then((newLink)=>setlinksTo(newLink))
    },[])
  
   
    return (
        <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 ">
                  <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center">
                     קישורים
                  </h3>
                  {linksTo.map((li)=>(
                     <div key={li.link} className='flex items-right w-full mb-2 text-white '>
                            <div className="flex-grow ml-10">
                                <a href={li.link} target="_blank" className='font-xs flex justify-center my-3 cursor-pointer'>
                                    <Link   to={li.link}  href={li.link} className="text-md flex justify-center " key={li.link}>
                                        <span  target="_blank" className='transition duration-700 text-center color-white  mb-8  hover:text-[#4864F6]  font-semibold  mx-2'>
                                        { li.title}
                                        </span>
                                    </Link>
                                    
                                </a>
                            </div>                    
                            <div className='w-16 flex-none'>
                                
                                    <Link  target="_blank"  to={li.link}  key={li.link} href={li.link} className="text-md flex justify-center cursor-pointer "> 
                                            <img src={li.featuredImage.url}
                                                alt="תמונה מהפרק."    
                                                height="60px"
                                                width="60px"
                                                className='align-middle rounded-full cursor-pointer '
                                            /> 
                                  </Link>
                            </div>
                      </div>
                      
                  ))}
        </div>
    )
}

export default LinksTo