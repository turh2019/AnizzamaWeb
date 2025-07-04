import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import {getCategories} from '../../../services/services'
import { getJobs, getPostDetails,getAllCooperation } from '../../../services/services';
import Image from 'next/image';
import { TagsList } from '../../getComponents';

function Cooperation() {
    const [cooperations, setCooperations] = useState([])
 
    useEffect(() =>{
        getAllCooperation()
        .then((newCooperation)=>setCooperations(newCooperation))
    },[])
 
  
    return (
        <>
        <div className ="bg-cover_bg_color text-white shadow-lg rounded-lg p-8 mb-8 pb-12 ">
                  <h1 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     שת"פ
                  </h1> 
            <div>
                <div className=' grid grid-cols-1 gap-4 flex justify-end'>
                    {cooperations.map((cooperation, index) => (
                    <div
                        key={index}
                        className="flex items-center mt-20 p-4 rounded-lg bg-black bg-opacity-20"
                    >
                        <div className="flex-1">
                        <h1 className="text-white cursor-pointer mb-2 text-xl font-bold text-center">
                            <a target="_blank" href={cooperation.link}>{cooperation.title}</a>
                        </h1>
                            <p className="text-white text-sm text-right mr-5">{cooperation.bio}</p>
                        </div>

                        <a target="_blank" href={cooperation.link}>
                            <Image
                                unoptimized
                                alt={cooperation.title}
                                height="100"
                                width="100"
                                className="rounded-lg cursor-pointer mr-4"
                                src={cooperation.photo.url}
                            />
                        </a>
                    </div>
                    ))}

                </div>
            </div>
        </div>
        </>
    )
}

export default Cooperation