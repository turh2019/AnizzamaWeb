import React, { useState, useEffect } from 'react';
import { submitComment,submitCommentPage ,submitCommentEp,publishComment,UpdateNotifications, publishAuthor} from '../../services/services';
import emailjs from '@emailjs/browser';
import {useStateContext} from '../../context/StateContext'



const CommentsForm = ({ Slug,slug ,type ,selected, Setselected }) => {
  const [error, setError] = useState(false);
  const {isLogin , profile} =useStateContext()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [onetime, SetOnetime] = useState(false);
 console.log(Slug
  )
  const [formData, setFormData] = useState({ comment: null,isBelongs: false ,id:null,authorID:""});

  formData.isBelongs= false;
  formData.id= "";

  if(selected){
    formData.isBelongs = true;
    formData.id = selected.id;
  }
  else
  {
    formData.isBelongs = false;
    formData.id = "";
  }

  const SendEmail = (e) => {
    e.preventDefault();
    
    emailjs.sendForm('service_eqnh3cv', 'template_yc5yf34', e.target, 'user_kX8vsxJEILud8Y1n1VHUs')
      .then((result) => {
         
      }, (error) => {
         
      });
  };



  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = async () => {
    if(showSuccessMessage == true || onetime == true) return;

    SetOnetime(true)
    setError(false);
    const { comment,isBelongs ,id,sendEmail} = formData;
    if (!comment) {
      setError(true);
      return;
    }
    
    const commentObj = {
      
      comment,
      isBelongs,
      slug,
      id,
      sendEmail,
      authorID,
      ReaplyID:selected?.author?.id,
      Slug
    };


      
 



    
  if(type=="post")
  {
    
   submitComment(commentObj)
    .then((res) => {
      if (res.createComment) {
     
      //  publishComment({CommentID:res.createComment.id})
        // updateNof(commentObj,res.createComment,selected)
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        Setselected("")
        formData.comment = '';
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 7000);
       
      }
    });

  
  }else if (type=="page")
  {
    
   submitCommentPage(commentObj)
    .then((res) => {
      if (res.createComment) {
     
      //  publishComment({CommentID:res.createComment.id})
        // updateNof(commentObj,res.createComment,selected)
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        Setselected("")
        formData.comment = '';
      }
    }, 7000);
    
  
  }else if (type=="ep")
  {
   
    const somting = await submitCommentEp(commentObj)
    .then((res) => {
      if (res.createComment) {
       
        
     //   publishComment({CommentID:res.createComment.id})
        // updateNof(commentObj,res.createComment,selected)
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        Setselected("")
        formData.comment = '';
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 7000);
      }
    });

  }


  }; 

  const updateNof = async (commentObj,createComment,selected) => {
   
    if(commentObj.isBelongs)
    {
   
      const commentObj_ = {
      
        body:commentObj.comment,
        authorID:commentObj.authorID,
        Link:Slug,
        toAuthorID:commentObj.ReaplyID,

        
      };

     // await UpdateNotifications(commentObj_)
     
    // await publishAuthor({id:commentObj.authorID})

    }
  }


  return (
    <form action="" id="replay">
    <div className="bg-cover_bg_color text-white shadow-lg rounded-lg p-8 pb-12 mb-8" dir="rtl" >
    
      <h3 className="text-xl mb-8 font-semibold border-b pb-4  flex justify-center" >הוסף תגובה</h3>
      <>
      <div className="grid grid-cols-1 gap-4 mb-4" >
      {selected? 
      <div className='bg-black bg-opacity-50 p-4 rounded-lg' >
        <p>
          <button className='float-left text-center  hover:bg-opacity-50 hover:bg-[#cc1100] w-8 h-8 rounded-lg' onClick={(e)=>(Setselected(""))}>x</button>
          </p>
        <p className="text-center mt-4">
          אתה מגיב ל: 
          <span className='whitespace-pre-line text-white  text-center ' name="to_name"> {selected?.author?.name} </span>
          <input type="text" name="to_name"  value={selected?.author?.name}  className='opacity-0 h-0 w-0'  />

        </p>
        
        שהגיב:
        <p className='whitespace-pre-line text-white  '> {selected.comment}</p>
       
       </div>:""}
      
        <textarea onsdmi value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-white bg-cover_color text-white caret-pink-500  " name="comment" placeholder="Comment" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">

      </div>
      <div className="mt-8 flex justify-center">
      {error && <p className="text-xl text-red-500 font-semibold">צריך למלא את כל הפרטים </p>}
      {showSuccessMessage && <span className="text-xl  font-semibold pt-10 text-green-500">התגובה נשלחה</span>}
      </div>
      <div className="mt-8 flex justify-center">
        <button type="submit" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer ">פרסם תגובה</button>
        
      </div></>
   
     
    </div>
  </form>
  );
};

export default CommentsForm;
