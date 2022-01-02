import React ,{useState,useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComments,getCommentsPages} from'../services/services'
import { comment } from 'postcss'

function Comments({slug,from}) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        if(from ==""){
            getComments($slug)
            .then((result) =>setComments(result))
        }else if(from =="pages"){
            
            getCommentsPages(slug)
            .then((result) =>setComments(result))
        }
    
     
    }, [])
    return (
        <div className='bg-[#261D78]'>
            {comments.length>0 && (
                <div className=' shadow-lg rounded-lg p-8 pb-12 mb-8'>
                     <h3 className=' text-xl mb-8 font-semibold border-b pb-4 text-white  '>
                         <div className='flex justify-center'>
                             
                            תגובות 
                            {' : '} 
                            {comments.length}
                         </div>
                      </h3>   
                      {comments.map((cooment) =>(
                          <div key={cooment.createdAt} className='border-b-2 border-l-2 text-gray-400 border-gray-400 mb-4 pb-4 bg-[#4864F6] px-3 py-3 rounded-lg'>
                            <p className='mb-4 '>
                                <span className='font-semibold text-white'>{cooment.name}</span>
                                {' '}
                                on
                                {' '}
                                {moment(cooment.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <p className='whitespace-pre-line text-white  w-full'>{parse(cooment.comment)}</p>
                          </div>
                      ))}
                </div>
            )}
        </div>
    )
}

export default Comments
