import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import {getCategories} from '../../services/services'
import { getJobs, getPostDetails } from '../../services/services';
import Image from 'next/image';

function Team() {
    const [authors, setAuthors] = useState([])
 
   

    useEffect(() =>{
        getJobs()
        .then((newAuthor)=>setAuthors(newAuthor))
    },[])
 
  
    return (
        <>
        <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 ">
                  <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     צוות האתר
                  </h3>
            <div>
                <div className=' grid grid-cols-4 gap-4 flex justify-end '>
                    {authors.map((author)=>(
                        author.isHeLeave == false?
                        <div className='text-center mt-20 mb-8 p-4 relative rounded-lg bg-black bg-opacity-20'>
                            <div className="absolute left-0 right-0 -top-14 ">
                                <Image
                                unoptimized             
                                alt={author.name}
                                height="100px"
                                width="100px"
                                className="align-middle rounded-full"
                                src={author.photo.url}
                            />
                            </div>
                            <h3 className="text-white text-center mt-10 mb-4 text-xl font-bold p-1">{author.name}</h3>
                            <p className="text-white text-ls ">{author.bio}</p>
                        </div>:""
                        ))}
                </div>
            </div>
        </div> 

                    <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 "> 
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     צוות שפרש
                    </h3>
                    <div>
                        <div className=' grid grid-cols-4 gap-4 flex justify-end '>
                            {authors.map((author)=>(
                                    author.isHeLeave == true?
                                <div className='text-center mt-20 mb-8 p-4 relative rounded-lg bg-black bg-opacity-20'>
                                    <div className="absolute left-0 right-0 -top-14 ">
                                        <Image
                                        unoptimized             
                                        alt={author.name}
                                        height="100px"
                                        width="100px"
                                        className="align-middle rounded-full"
                                        src={author.photo.url}
                                        />
                                    </div>
                                    <h3 className="text-white text-center mt-10 mb-4 text-xl font-bold  text-center">{author.name}</h3>
                                    <p className="text-white text-ls ">{author.bio}</p>
                                </div>: ""
                            ))}
                                    </div>
                        </div>
                    </div>
                   
        </>
    )
}

export default Team