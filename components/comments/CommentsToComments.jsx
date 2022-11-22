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
                            <div className='  '>                         
                                <div className="border-gray-400 border-[2px] rounded-full shadow-lg absolute inline-block  bottom-10 top-10 md:-right-[10%] -right-[30%] h-20 w-20 ">
                                    <a className='scale-50'  href={`/profile/${cooment?.author?.name}`}>
                                        { <img className="object-fill h-full w-24 object-cover md:h-full md:w-24 shadow-lg rounded-full" src={cooment?.author?.photoUrl} alt={cooment?.author?.name}/> }
                                        {/* <ShowCharacter wear={cooment?.author?.wear}/> */}
                                    </a>
                                </div>
                                </div>
                            <div  className="">
                                <div div key={cooment.id} className='text-gray-400  relative border-gray-400 mb-4 pb-4  px-3  rounded-lg relative  right-3'>
                                    <div className='bg-cover_color border-2 text-gray-400 border-gray-400    px-3  rounded-lg'>
                                    <p className='mt-2 mb-4  md:grid-cols-4 pb-2'>
                                        {moment(cooment.createdAt).format('MMM DD, YYYY')}
                                        {' '}
                                        on
                                        {' '}
                                         <a className=' cursor-pointer ' href={`/profile/${cooment?.author?.name}`}> <span className='font-semibold text-white hover:text-sky-400 ' >{cooment?.author?.name}</span>   </a>
                                         {Author?.name == cooment?.author?.name&&<div>הכותב/ת</div>}
                                    </p>
                                    
                                        <BoxMessage Message = {`  את/ה בטוח/ה שאת/ה רוצה למחוק את התגובה: \n ${cooment.comment}`}  isOpen = {Open}  setIsOpen ={setIsOpen} setonClickYes = {setonClickYes} onClickYes ={  onClickYes == true &&  CliCkDeleteCommenteHandel(cooment.id)}/> 
                                        {!clickEdit? <p className='whitespace-pre-line text-white  w-full'>{parse(cooment.comment)}</p>  :  <textarea  onChange={ (e) =>setEditComments(e.target.value) } className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-white bg-cover_color text-white caret-pink-500  " name="comment" placeholder={parse(cooment.comment)} />}
                                        {!clickEdit &&<Link to="replay" spy={true} smooth={true} offset={-100} duration={500}><button className='text-white my-4 hover:scale-125'  onClick={ (e)=>( Setselected(cooment) )} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" /></svg></button> </Link>}
                                        {clickEdit && <button className='hover:text-white my-4'   onClick={ (e)=>( CliCkPlusHandel(false,false,true,cooment.id,false,false,editComments) ,SetClickEdit(false),setEditComments(""))} >פרסם תגובה</button>}                                                                                                       
                                        {clickEdit && <button className='hover:text-white my-4 m-2'   onClick={ (e)=>( SetClickEdit(false),setEditComments(""))} >בטל</button>}      
                                        {isLogin &&!clickEdit && cooment.author.name === profile.name &&<button className={' my-4  mr-4 text-white hover:scale-125  select-none'}  onClick = {(e) =>(SetClickEdit(true),setEditComments(""))}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" /><path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" /></svg></button>}
                                        {!clickEdit && cooment.author.name === profile.name&& <button onClick={(e) => (setIsOpen(true))} className='text-white m-2 mr-4 hover:scale-125  hover:text-rose-600 ' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" /></svg></button>      } 

                                        <button className={isLogin && cooment.plus.filter((e) => e.name == profile.name).length > 0 ? 'md:scale-125 scale-100 my-4 float-left md:mr-2  text-emerald-400 hover:scale-150  hover:scale-120 hover:text-white ':'md:scale-125 scale-75 md:hover:scale-150 my-4 float-left md:mr-2 text-white hover:scale-150 hover:text-emerald-400 select-none'}  onClick={ (e)=>(CliCkPlusHandel(true,false,false,cooment.id,cooment.plus.filter((e) => e.name == profile.name).length > 0 || cooment.minus.filter((e) => e.name == profile.name).length > 0, cooment.plus.filter((e) => e.name == profile.name).length > 0))} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" /></svg></button>
                                        <span className=' my-4 float-left text-white  font-bold m-1' >{cooment.plus.length -  cooment.minus.length}</span>
                                        <button className={isLogin && cooment.minus.filter((e) => e.name == profile.name).length > 0 ? 'md:scale-125 scale-100  my-4 float-left md:ml-2 text-rose-600 md:hover:scale-150   hover:scale-120  hover:text-white':'md:scale-125 scale-75 md:hover:scale-150 my-4 float-left ml-2 text-white hover:scale-120 hover:text-rose-600 select-none'}  onClick={ (e)=>(CliCkPlusHandel(false,true,false,cooment.id ,cooment.plus.filter((e) => e.name == profile.name).length > 0 || cooment.minus.filter((e) => e.name == profile.name).length > 0, cooment.minus.filter((e) => e.name == profile.name).length > 0 ))} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" /></svg></button>
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