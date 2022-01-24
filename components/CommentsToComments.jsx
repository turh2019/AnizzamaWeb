import React ,{useState,useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComment,getCommentsPages} from'../services/services'
import { comment } from 'postcss'

function CommentsToComments({slug,id,from,selected,Setselected}) {
    
    const [cooment, setComments] = useState([])
    const [click, setclick] = useState(false)
    useEffect(() => {
        if(from ==""){
            getComment($id)
            .then((result) =>setComments(result))
        }else if(from =="pages"){
            
            getComment(id)
            .then((result) =>setComments(result))
        }
    
     
    }, [])
 
    console.log(cooment )
    return (
        <div className='bg-[#261D78] pl-5 ml-6'  dir="rtl" >
           
               { cooment.id==id?
                <div className='p-4'>
                              
                <div key={cooment.createdAt} className=' rounded-lg  text-gray-400 border-gray-400   '>
                     <div className='border-2 rounded-lg   border-gray-400  bg-[#4864F6] transform-x-5 p-4 '>
                    <p className='mb-4 '>
                        <span className='font-semibold text-white ml-2' >{cooment.name}</span>
                        {' '}
                        on
                        {' '}
                        {moment(cooment.createdAt).format('MMM DD, YYYY')}
                    </p>
                
                    <p className='whitespace-pre-line text-white  w-full'>{parse(cooment.comment)}</p>
                    <button className='hover:text-white   my-4' onClick={ (e)=>( Setselected(cooment) )}>replay</button>
                    {console.log(cooment.length)}
                   
                  
                    </div>
                    {cooment.comments.length !=0 ?  <button className='hover:text-white  ' onClick={ (e)=>( setclick(!click) )}>{click ? "see less": "see more"}</button>:"" }
                        <div className='my-4'>
                            {cooment.comments.map((C)=>(
                                    click ?
                                    <CommentsToComments key={C.id} slug={slug} id={C.id} from={from} selected ={selected} Setselected ={Setselected}/>:
                                    ""
                                    
                            ))}     
                      
                     </div>
                  
                </div>
                    
                </div>:""
           
        
        }</div>
    )
    
}
export default CommentsToComments