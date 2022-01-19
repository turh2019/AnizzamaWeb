import React,{useState,useEffect} from 'react';
import { SearchBar ,Categories } from './getComponents';
import {getPages} from '../services/services'
import Link from 'next/link'
const Toolbar = (type) => {
    const [pages, setPages] = useState([])
 
    const [selected,Setselected] = useState([""])

    useEffect(() =>{
        getPages()
        .then((newPage)=>setPages(newPage))
    },[])
   
   
    return (
        <>
        <div className=' bg-contain bg-center bg-no-repeat  pb-3 bg-clip-padding  p-6 grid grid-cols-1 gap-4  place-items-center '>
            <div className='place-self-end flex flex-wrap'>      
                <div className='place-self-canter  px-3 my-2 gap-5 mb-8 '>
                    {pages.map((page)=>(
                        <a  target="_blank" key={page.name} href={`/pages/${page.slug}`}>
                        <Link target="_blank" key={page.name} href={`/pages/${page.slug}`}>
                            <span className='pb-6 p-1  mb-8 lg:border-b-4  lg:border-[#5344C1]  '>
                                 <span className='transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-8  cursor-pointer  mx-2  lg:mb-0 mb-4' onClick={e=>Setselected("")}>
                                    {page.name}
                                 </span>
                            </span>
                           
                        </Link>
                        </a>
                       
                        ))}
                        <a target="_blank" key="home" href={`/`} className=' '>
                         <Link target="_blank" key="home" href={`/`}>
                            <span className='pb-6 p-1  mb-8 lg:border-b-4  lg:border-[#5344C1]'>
                                <span className='transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-8  cursor-pointer  mt-2 mx-2 ' onClick={e=>Setselected("")}>
                                    בית
                                </span>
                            </span>
                        </Link>
                        </a>
                        
                </div>
                <SearchBar /> 
                
            </div>  
        </div>
                
        </>
    )
}

export default Toolbar
