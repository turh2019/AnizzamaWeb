import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import {getCategories} from '../../services/services'
import { getJobs, getPostDetails,getAllCooperation } from '../../services/services';
import Image from 'next/image';
import { TagsList } from '../getComponents';

function Cooperation() {
    const [cooperations, setCooperations] = useState([])
 
    useEffect(() =>{
        getAllCooperation()
        .then((newCooperation)=>setCooperations(newCooperation))
    },[])
 
  
    return (
        <>
        <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 ">
                  <h1 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     שת"פ
                  </h1> 
            <div>
                <div className=' grid grid-cols-1 gap-4 flex justify-end'>
                    {cooperations.map((cooperation,index)=>(
                        <div key={index}  className='text-center mt-20  p-4 relative rounded-lg bg-black bg-opacity-20'>
                           <h1 className="text-white text-center cursor-pointer mb-4 text-xl font-bold p-1"><a  target="_blank" href={cooperation.link} >{cooperation.title}</a></h1>
                            <h2 className="text-white text-ls">{cooperation.bio}</h2>
                            <div className="absolute float-left right-1 top-1  ">
                                <a  target="_blank" href={cooperation.link} >
                                    <Image
                                    unoptimized             
                                    alt={"author.name"}
                                    height="100px"
                                    width="100px"
                                    className="align-left rounded-lg cursor-pointer"
                                    src={cooperation.photo.url}
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Cooperation