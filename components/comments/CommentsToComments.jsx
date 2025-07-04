import React ,{useState,useEffect} from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import {getComment,UpdateComment,deleteComment,publishComment} from'../../services/services'
import { comment } from 'postcss'
import {BoxMessage,ShowCharacter } from '../getComponents';
import {useStateContext} from  '../../context/StateContext'
import { Link } from 'react-scroll'
function CommentsToComments({slug,id,from,selected,Setselected ,setComments ,comments ,preantId,Author}) {
    
    const [cooment, setComment] = useState([])
    const [click, setclick] = useState(false)

    const [clickEdit,SetClickEdit] = useState(false)
    const [editComments, setEditComments] = useState("")


    const [Open, setIsOpen] = useState(false)
    const [onClickYes, setonClickYes] = useState(false)

    const {isLogin,profile,HandleLogout} = useStateContext();
    useEffect(() => {
       
        getComment(id)
        .then((result) =>setComment(result))

    }, [])
 
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
    const CliCkPlusHandel = async (isPlus,isMinus, itsComment,CommentID,AlreadyClicked, ischecnge,commentedit)  =>{
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
            cooment.comment = commentedit
            setComment( cooment);
        }

        const id =  await UpdateComment(commentObj)

        if(id == null ||id == undefined){
            return;
        }

        const comment = await publishComment(commentObj);



        setComment(comment.publishComment)  
    }


    const CliCkDeleteCommenteHandel = async (CommentID) =>{
        console.log("somtingg");
        const commentObj = {
            CommentID  
        };
        console.log(comments)
       
        var  foundComment = comments.find((item) => (item.id == preantId))
        console.log(foundComment);
        var  foundCommentto = foundComment.comments.find((item) => item.id === cooment.id )
        foundComment.comments = foundComment.comments.filter((item) => (item !== foundCommentto))
        const newCommentstems = comments.map((item) => (item == foundComment ? item = foundComment: item= item ))
        console.log(newCommentstems);
        setComments(newCommentstems) 

        const id = await deleteComment(commentObj);

        if(comment.publishComment == null || comment.publishComment ==  undefined)
        {
            return;
        }
       
       
    }


    return (
        <div className='bg-cover_bg_color scale-0 open:scale-100'  dir="rtl" open={cooment !="d"}>
           
               { cooment?.id==id&&
                <div className='relative 'key={ cooment.id}>                         
                            <div  className="">
                                <div div key={cooment.id} className='text-gray-400  relative border-gray-400 mb-4 pb-4  px-3  rounded-lg relative  right-3'>
                                    <div className='bg-cover_color border-2 text-gray-400 border-gray-400    px-3  rounded-lg'>
                                        <p className='mt-2 mb-4  md:grid-cols-4 pb-2'>
                                            {moment(cooment.createdAt).format('MMM DD, YYYY')}
                                            {' '}
                                            on
                                            {' '}
                                            {console.log(Author?.name +" " + cooment?.Name)}
                                                <div className='text-gray-300'> הכותב/ת :{cooment.name}</div>
                                        </p>
                                    
                                        <BoxMessage Message = {`  את/ה בטוח/ה שאת/ה רוצה למחוק את התגובה: \n ${cooment.comment}`}  isOpen = {Open}  setIsOpen ={setIsOpen} setonClickYes = {setonClickYes} onClickYes ={  onClickYes == true &&  CliCkDeleteCommenteHandel(cooment.id)}/> 
                                        {!clickEdit? <p className='whitespace-pre-line text-white  w-full'>{parse(cooment.comment)}</p>  :  <textarea  onChange={ (e) =>setEditComments(e.target.value) } className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-white bg-cover_color text-white caret-pink-500  " name="comment" placeholder={parse(cooment.comment)} />}
                                        {!clickEdit &&<Link to="replay" spy={true} smooth={true} offset={-100} duration={500}><button className='text-white my-4 hover:scale-125'  onClick={ (e)=>( Setselected(cooment) )} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" /></svg></button> </Link>}
                                        {clickEdit && <button className='hover:text-white my-4'   onClick={ (e)=>( CliCkPlusHandel(false,false,true,cooment.id,false,false,editComments) ,SetClickEdit(false),setEditComments(""))} >פרסם תגובה</button>}                                                                                                       
                                        {clickEdit && <button className='hover:text-white my-4 m-2'   onClick={ (e)=>( SetClickEdit(false),setEditComments(""))} >בטל</button>}      
                                        {isLogin &&!clickEdit && cooment.author.name === profile.name &&<button className={' my-4  mr-4 text-white hover:scale-125  select-none'}  onClick = {(e) =>(SetClickEdit(true),setEditComments(""))}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg></button>}
                                    </div>
                                    
                                    {cooment.comments.length !=0 ?  <button className='hover:text-white my-2'  onClick={ (e)=>( ClicktHandel(displayvalue,cooment.id) )}> {displayvalue.filter((p)=> { if(p.value == cooment.id) return p.value; else return null}).map((p)=>(  p.value))  != cooment.id? "see more":"see less"  }</button>:"" }
                                    <div className='  '>
                                            {cooment.comments.map((C,index)=>(
                                                displayvalue.filter((p)=> { if(p.value == cooment.id) return p.value; else return null}).map((p)=>(  p.value)) ==  cooment.id?<CommentsToComments  key={index}  slug={slug} id={C.id} from={from} selected={selected} Setselected={Setselected} />:""
                                            ))}     
                                    </div>   
                                </div>
                            </div>
                        </div>}
        </div>
    )
    
}
export default CommentsToComments