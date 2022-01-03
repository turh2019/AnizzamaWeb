import React,{useState,useEffect} from 'react';
import { SearchBar } from './getComponents';
import {getPages} from '../services/services'
import Link from 'next/link'
const Toolbar = () => {
    const [pages, setPages] = useState([])
 
    useEffect(() =>{
        getPages()
        .then((newPage)=>setPages(newPage))
    },[])
   
    return (
        <>
        <div className=' bg-contain bg-center bg-no-repeat  pb-3 bg-clip-padding  p-6 grid grid-cols-1 gap-4  place-items-center '>
            <div className='place-self-end flex flex-wrap'>      
                <div className='place-self-canter  px-3 pb-3 my-2'>
                    {pages.map((page)=>(
                        <Link key={page.name} href={`/pages/${page.slug}`}>
                            <span className='transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-8  cursor-pointer  mx-2 '>
                                    {page.name}
                            </span>
                        </Link>
                       
                       
                        ))}
                </div>
                <SearchBar/> 
            </div>  
        </div>
                
        </>
    )
}

export default Toolbar
