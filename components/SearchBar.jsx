import React,{useState,useEffect} from 'react'
import { Header } from './getComponents';
import { getPosts ,getPage} from '../services/services';
import Link from 'next/link'
import Image from 'next/image';

const SearchBar = () => {
    const [posts, postsTo] = useState([])
    const [SearcTerm,SetSearcTerm] =useState('')
    const itsfound = ""

    useEffect(() =>{
        getPage()
        .then((newpost)=>postsTo(newpost))
   
    },[])
    return (
       <div className='pb-5 bg-blend-multiply text-white inline-block lg:sticky relative'>
           
           <div className='flex justify-center inline-block lg:sticky relative'>
           <div className=" rounded-lg text-white text-right   inline-block block ">
               
                <div className="relative translate-y-3 absolute pointer-events-none focus:pointer-events-auto py-1 px-1 bg-red ">
                    <svg className="absolute inset-y-0 right-1 w-16 text-white h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div >
                <input type="text" placeholder='חיפוש ' onChange={event =>{SetSearcTerm(event.target.value)}} className='px-7 resize rounded-md pt-1 focus:ring-2 focus:ring-white bg-[#4864F6] text-white caret-pink-500  outline-none w-full  '/>
            </div>
           </div>
           <div className='text-white '>
          
          {SearcTerm ? 
             <div className='bg-[#261D78] shadow-lg rounded-lg border-4 border-indigo-200  border-y-indigo-500 mt-4 '>
                   {posts.filter((val) =>  {
                        if(SearcTerm ==""){  
                            itsfound ="";
                        return null
                        }else if(val.node.search.toString().toLowerCase().includes(SearcTerm.toLowerCase())){
                             
                            itsfound ="true";
                            return val
                        }
                       
                    }).map((val,key)=>
                    {
                        itsfound ="true";
                            return <div className=" mt-5 transition duration-700 text-center color-white  mb-8 cursor-pointer hover:text-[#4864F6]  font-semibold  mx-2 "> 
                             <a target="_blank" href={`/page/${val.node.slug}`}>
                            <div className='flex items-right w-full mb-2 text-white  mb-4 text-white p-4'>
                               
                                     <Link target="_blank" key={key} href={`/page/${val.node.slug}`} ><p className='p-4 flex-grow ml-10' >{val.node.title}</p></Link>
                                     <Link target="_blank" href={`/page/${val.node.slug}`} className="text-md  cursor-pointer" key={val.node.title}>
                                        <Image
                                            alt={val.node.title}
                                            height="60px"
                                            width="60px"
                                            unoptimized
                                            className="align-left rounded-full cursor-pointer "
                                            src={val.node.featuredImage.url}
                                        />
                                    </Link>
                                
                            </div>
                            </a>
                        </div>
                    })}
                    {itsfound ? " ":<div><p className='text-center py-2 font-semibold text-red-200'>לא נמצאו תוצאות</p></div>}
                    
             </div>  :
             <div className=''>
                      
              </div>}
             
            </div>
       </div>
    )
}

export default SearchBar
