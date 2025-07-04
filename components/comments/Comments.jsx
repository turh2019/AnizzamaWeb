import React ,{useState,useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComments,getCommentsPages ,getCommentsEps,UpdateComment ,deleteComment ,publishComment} from'../../services/services'
import { comment } from 'postcss'
import { Link } from 'react-scroll'
import { CommentsToComments , BoxMessage,ShowCharacter } from '../getComponents';
import Image from 'next/image';
import {useStateContext} from  '../../context/StateContext'



//

function Comments({slug,from,selected,Setselected ,Author}) {
    const [comments, setComments] = useState([]);
    const [Slug, setSlug] = useState([]);
    const [click, setclick] = useState(Boolean[comments.length])
    const [clickEdit,SetClickEdit] = useState(-1)
    const [editComments, setEditComments] = useState("")
    const [Open, setIsOpen] = useState(false)
    const [onClickYes, setonClickYes] = useState(false)
    const [commentId, setcommentId] = useState("")
    const {isLogin,profile,HandleLogout} = useStateContext();
  
    useEffect(() => {
        
        GetComments();

     
    }, [])


    const GetComments = () =>{
        setSlug(slug);
        setComments([])
        if(from =="post"){
            getComments(slug)
            .then((result) =>setComments(result))
            
        }
        else if(from =="pages"){
            
            getCommentsPages(slug)
            .then((result) =>setComments(result))
        }
        else if(from =="ep"){
            console.log(slug)
            getCommentsEps(slug)
            .then((result) =>setComments(result))
        }
    }

    const [displayvalue,getvalue] =useState([]);

    const addItem = (y) =>{
        getvalue([...displayvalue,{
            id:y,
            value:y
        }])
    }
    var ClicktHandel = (e,y) =>{
        
        var check= false;
       e.map(x => {
        if(x.value == y)
        {
             check = true
             
        }
        })
        if(check == false)
        addItem(y);
        else
        ClicktHandel_(e,y)
    }

    var ClicktHandel_ = (e,y) =>{
        
        getvalue(e.filter(x => (x.value!= y? x:null)));
      
    }

    const CliCkEditCommenteHandel = async (isPlus,isMinus, itsComment,CommentID,AlreadyClicked, ischecnge,commentedit) =>{
        if(!isLogin || ischecnge) return;
        const authorID = profile.id;
    
        const commentObj = {
            isPlus,
            isMinus,
            itsComment,
            CommentID,
            authorID,
            AlreadyClicked,
            commentedit
            
        };

        if(itsComment)
        {
            comments.find((item) => item.id === CommentID? item.comment =commentedit:item =item);
            setComments(comments)
        }
    

        const id =  await UpdateComment(commentObj)

        if(id == null ||id == undefined){
            return;
        }

        const comment = await publishComment(commentObj);

        if(comment.publishComment == null || comment.publishComment ==  undefined){
           return;
        }

        setComments(comments.map((item) => item.id === comment.publishComment.id? item = comment.publishComment: item = item) )  
    }


    const CliCkDeleteCommenteHandel = async (CommentID) =>{
        setonClickYes(false);
        console.log("somtingg");
        const commentObj = {
            CommentID  
        };

        var  foundComment = comments.find((item) => item.id === CommentID )
        const newCommentstems = comments.filter((item) => item !== foundComment )
        setComments(newCommentstems) 

        const id = await deleteComment(commentObj);
           
   

    }

    return (
        <div className='bg-cover_bg_color' dir="rtl" >
            {slug != Slug &&GetComments()}
      
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
                          !cooment.isBelongs  &&
                            <div className='relative 'key={index1 + cooment.id}>                         
                                <div  className="">
                                    <div div key={cooment.id} className='text-gray-400  relative border-gray-400 mb-4 pb-4  px-3  rounded-lg relative  right-8'>
                                        <div className='bg-cover_color border-2 text-gray-400 border-gray-400    px-3  rounded-lg'>
                                            <p className='mt-2 mb-4  md:grid-cols-4 pb-2'>
                                                {moment(cooment.createdAt).format('MMM DD, YYYY')}
                                                {' '}
                                                on
                                                {' '}
                                                {console.log(Author?.name +" " + cooment?.Name)}
                                                 <div className='text-gray-300'> הכותב/ת :{cooment.name}</div>
                                            </p>
                                        
                                            
                                            <div className='flex justify-center '>  <BoxMessage Message = {`  את/ה בטוח/ה שאת/ה רוצה למחוק את התגובה: \n ${cooment.comment}`} isOpen = {Open && cooment.id == commentId}  setIsOpen ={setIsOpen} setonClickYes = {setonClickYes} onClickYes ={  onClickYes == true &&  CliCkDeleteCommenteHandel(commentId)}/> </div>
                                            {clickEdit != index1  ? <p className='whitespace-pre-line text-white  w-full'>{parse(cooment.comment)}</p>  :  <textarea  onChange={ (e) =>setEditComments(e.target.value) } value ={editComments} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-white bg-cover_color text-white caret-pink-500  " name="comment" placeholder={parse(cooment.comment)} />}
                                            {clickEdit != index1  && <Link to="replay" spy={true} smooth={true} offset={-100} duration={500}><button className='text-white my-4 hover:scale-125'  onClick={ (e)=>( Setselected(cooment) )} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" /></svg></button></Link>}
                                        </div>
                                        
                                        {cooment.comments.length !=0 ?  <button className='hover:text-white my-2' key={index1} onClick={ (e)=>( ClicktHandel(displayvalue,cooment.id) )}> {displayvalue.filter((p)=> { if(p.value == cooment.id) return p.value; else return null}).map((p)=>(  p.value))  != cooment.id? "see more":"see less"  }</button>:"" }
                                        <div className=' '>
                                                {cooment.comments.map((C,index)=>(
                                                    displayvalue.filter((p)=> { if(p.value == cooment.id) return p.value; else return null}).map((p)=>(  p.value)) ==  cooment.id?<CommentsToComments preantId = {cooment.id}  key={index} comments = {comments} setComments = {setComments} slug={slug} id={C.id} from={from} selected={selected} Setselected={Setselected} Author = {Author}/>:""
                                                ))}     
                                        </div>   
                                    </div>
                                </div>
                            </div>
                          ))}
                      
                </div>
            )}

            
        </div>
    )
    
}

export default Comments
