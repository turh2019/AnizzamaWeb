import React ,{useState,useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComments,getCommentsPages} from'../../services/services'
import { comment } from 'postcss'

import { CommentsToComments } from '../getComponents';







function Comments({slug,from,selected,Setselected }) {
    const [comments, setComments] = useState([]);
    const [click, setclick] = useState(Boolean[comments.length])
    
    useEffect(() => {
        if(from =="post"){
            getComments(slug)
            .then((result) =>setComments(result))
            
        }else if(from =="pages"){
            
            getCommentsPages(slug)
            .then((result) =>setComments(result))
        }

     
    }, [])
    return (
        <div className='bg-[#261D78] ' dir="rtl" >
            {comments.length>0 && (
               
                <div className=' shadow-lg rounded-lg p-8 pb-12 mb-8'>
                     <h3 className=' text-xl mb-8 font-semibold border-b pb-4 text-white  '>
                         <div className='flex justify-center'>
                             
                            תגובות 
                            {' : '} 
                            {comments.length}
                         </div>
                      </h3>   
                      {comments.map((cooment,index1) =>(
                          !cooment.isBelongs  ? 
                          <div key={cooment.id}>
                               
                          <div div key={cooment.id} className='text-gray-400 border-gray-400 mb-4 pb-4  px-3  rounded-lg'>
                            <div className='bg-[#4864F6] border-2 text-gray-400 border-gray-400    px-3  rounded-lg'>
                            <p className='mb-4 '>
                                <span className='font-semibold text-white ml-2' >{cooment.name}</span>
                                {' '}
                                on
                                {' '}
                                {moment(cooment.createdAt).format('MMM DD, YYYY')}
                            </p>
                        
                            <p className='whitespace-pre-line text-white  w-full'>{parse(cooment.comment)}</p>
                            <button className='hover:text-white my-4'  onClick={ (e)=>( Setselected(cooment) )} >replay</button>
                          
                          
                          </div>
                         
                          {cooment.comments.length !=0 ?  <button className='hover:text-white ' key={index1} onClick={ (e)=>( setclick(!click) )}>{click ? "see less": "see more"} </button>:"" }
                          <div className='ml-6  '>
                                    {cooment.comments.map((C,index)=>(
                                            
                                            click ?
                                            <CommentsToComments  key={index}  slug={slug} id={C.id} from={from} selected={selected} Setselected={Setselected} />:
                                            ""
                                            
                                            
                                    ))}     
                                </div>
                               
                            </div>
                            
                          </div>
                          
                      : ""))}
                      
                </div>
            )}
        </div>
    )
    
}

export default Comments
