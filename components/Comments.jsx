import React ,{useState,useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComments} from'../services/services'
import { comment } from 'postcss'

function Comments({slug}) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getComments(slug)
        .then((result) =>setComments(result))
     
    }, [])
    return (
        <>
            {comments.length>0 && (
                <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                     <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                        {comments.length} 
                        {' '}  
                        Commemts
                      </h3>   
                      {comments.map((cooment) =>(
                          <div key={cooment.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
                            <p className='mb-4 '>
                                <span className='font-semibold'>{cooment.name}</span>
                                {' '}
                                on
                                {' '}
                                {moment(cooment.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <p className='whitespace-pre-line text-gray-600 w-full'>{parse(cooment.comment)}</p>
                          </div>
                      ))}
                </div>
            )}
        </>
    )
}

export default Comments
