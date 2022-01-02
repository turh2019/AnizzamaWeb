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
                <div className='place-self-canter  px-3 pb-3'>
          
                </div>
                <SearchBar/> 
            </div>  
        </div>
                
        </>
    )
}

export default Toolbar
