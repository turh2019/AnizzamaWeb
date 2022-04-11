import React, { useState, useEffect } from 'react';
import { submitComment,submitCommentPage } from '../services/services';
import emailjs from '@emailjs/browser';




const CommentsForm = ({ slug ,type ,selected, Setselected }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false,isBelongs: false ,id:null,sendEmail:false});
  formData.isBelongs= false;
  formData.id= "";
  if(selected){
    formData.isBelongs = true;
    formData.id = selected.id;
    console.log(formData.id +"  " +selected.id)
  }else{
    formData.isBelongs = false;
    formData.id = "";
    console.log(formData.id +"  " +selected.id)
    
  }

  const SendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_eqnh3cv', 'template_yc5yf34', e.target, 'user_kX8vsxJEILud8Y1n1VHUs')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };




 
  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);


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

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment,isBelongs ,id,sendEmail, storeData} = formData;
    if (!name || !email || !comment ) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      isBelongs,
      slug,
      id,
      sendEmail,

    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }
    
  if(type=="")
  {
    submitComment(commentObj)
    .then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
         
        }
        if(selected){
  
        
          Setselected("")
        }
       
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  }else if (type=="page")
  {
    submitCommentPage(commentObj)
    .then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
          
        }
        if(selected){
     
          
          Setselected("")
        }
        
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  }

  }; 

  return (
    <form action="" onSubmit={SendEmail}>
    <div className="bg-[#261D78] text-white shadow-lg rounded-lg p-8 pb-12 mb-8" dir="rtl">
     
      <h3 className="text-xl mb-8 font-semibold border-b pb-4  flex justify-center" >הוסף תגובה</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
      {selected?
      <div className='bg-black bg-opacity-50 p-4 rounded-lg' >
        <p>
          <button className='float-left text-center  hover:bg-opacity-50 hover:bg-[#cc1100] w-8 h-8 rounded-lg' onClick={(e)=>(Setselected(""))}>x</button>
          </p>
        <p className="text-center mt-4">
          אתה מגיב ל: 
          <span className='whitespace-pre-line text-white  text-center ' name="to_name"> {selected.name} </span>
          <input type="text" name="to_name"  value={selected.name}  className='opacity-0 h-0 w-0'  />
          <input type="email" name="to_email"  value={selected.email}  className='opacity-0 h-0 w-0'  />
        
        
        </p>
        
        שהגיב:
        <p className='whitespace-pre-line text-white  '> {selected.comment}</p>
       
       </div>:""}
      
        <textarea onsdmi value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-white bg-[#4864F6] text-white caret-pink-500  " name="comment" placeholder="Comment" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.name} onChange={onInputChange} className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-[#4864F6] text-white caret-pink-500 " placeholder="Name" name="name" />
        <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-[#4864F6] text-white caret-pink-500" placeholder="Email" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="  ">
        <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" className="float-right mt-2" />
        <label className="text-gray-100 cursor-pointer px-3 py-1 float-right" htmlFor="storeData"> שמור את השם שלי ואת האיימל שלי </label>
        </div>

        <div className=''>
        <input checked={formData.sendEmail} onChange={onInputChange} type="checkbox" id="sendEmail" name="sendEmail" value="true" className="float-right mt-2" />
        <label className="text-gray-100 cursor-pointer px-3 py-1 float-right" htmlFor="sendEmail"> שלח לי הודעה בgmail </label>
        </div>

      </div>
      <div className="mt-8 flex justify-center">
      {error && <p className="text-xl text-red-500 font-semibold">צריך למלא את כל הפרטים </p>}
      {showSuccessMessage && <span className="text-xl  font-semibold pt-10 text-green-500">התגובה נשלחה</span>}
      </div>
      <div className="mt-8 flex justify-center">
        <button type="submit" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer ">פרסם תגובה</button>
        
      </div>
    
     
    </div>
    </form>
  );
};

export default CommentsForm;
