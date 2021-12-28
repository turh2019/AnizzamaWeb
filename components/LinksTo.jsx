import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import {getCategories} from '../services/services'
import { getPosts, getPostDetails } from '../services/services';

const linksto=[{name:"דיסקורד" , slug :"https://discord.gg/AbKTmSrW" , url :'/bg/discord.png'}];
function LinksTo() {
  
   
    return (
        <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 ">
                  <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center">
                     קישורים
                  </h3>
                  {linksto.map((li)=>(
                      <Link key={li.slug} href={li.slug}> 
                          <span className ="cursor-pointer block pb-3 mb-3 flex flex-row flex justify-center">   
                                 { li.name}
                                 <img src={li.url} alt="" width="30" height="30" className=' basis-1/8 '/> 
                          </span>
                      </Link>
                  ))}
        </div>
    )
}

export default LinksTo