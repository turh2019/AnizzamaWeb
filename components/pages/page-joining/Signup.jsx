import React,{useState,useEffect} from 'react'
import { getAllProfiles  } from '../../../services/services';
import {createAuthor ,publishAuthor} from '../../../services/services'
import emailjs from '@emailjs/browser';
function Signup() {
    const [profiles, SetProfiles] = useState([])
    const [details,setdetails] = useState({name:"",password:"",password_2:"",email:""});
    const [error,setError] = useState("");
    const [code,SetCode] = useState("");
    const [enterCode,SetEnterCode] = useState("");
    const [panelCode,SetPanelCode] = useState(false);
    const [OneClick,SetOneClick] = useState(false);
    useEffect(() =>{
        getAllProfiles()
        .then((newProfiles)=>SetProfiles(newProfiles))
    },[])
 
    const SendEmail = (e) => {
        
        SetCode(e.code)
        emailjs.send("service_eqnh3cv","template_dtrltz7" ,{
            to_name: e.to_name,
            code: e.code,
            to_email: e.to_email,
            gmail: e.to_email
            }, 'user_kX8vsxJEILud8Y1n1VHUs')
          .then((result) => {
             
              SetPanelCode(true);
              setError("תבדוק את תבית הדואר שלך או את הסמפ נשלח קוד לאישור")
          }, (error) => {
            setError("יש בעיה באיימל שלך תנסה שוב ")
             
          });
      };

    const sudmitHandler = async e =>{
        if(details.name == "")
        {
            setError("שם המשתמש חסר")
            return;
        }

        if(details.name.length < 3)
        {
            setError("שם המשתמש קצר מידי")
            return;
        }

        if(details.name.split(" ").find((item) => item === "") === "")
        {
            setError(" יש תווים לא חוקיים בשם משתמש: כמו רווח"   )
            return;
        }

        if(details.email.split("@").length <= 1||details.email.split(" ").length > 1||details.email.split(".").length <= 1)
        {
            setError(" האימייל לא חוקי"   )
            return;
        }
        
        if(details.password == ""){
            setError("סיסמא חסרה")
            return;
        }

        if(details.password.length < 5){
            setError("סיסמא קצרה מידי")
            return;
        }

        if(details.password.split("").find((item) => item === ""|| item === "") === " " ||details.password.split(" ").length > 1)
        {
            setError(" יש תווים לא חוקיים בסיסמא: כמו רווח"   )
            return;
        }


        if(details.password != details.password_2 )
        {
            setError(" הסיסמאות לא זהות"   )
            return;
        }
    SetProfiles([])
    await getAllProfiles()
        .then((newProfiles)=>SetProfiles(newProfiles))
  
      var foundProfile = profiles.find((item) => item.name === details.name )
        
        if(foundProfile)
        {
            setError("שם משתמש תפוס")
            return;
        }


        
      var foundProfile = profiles.find((item) => item.email === details.email )
        
      if(foundProfile)
      {
        setError("האימייל תפוס")
        return;
      }
      const { name, email, password} = details;
     
      const ea = ({to_name:name,to_email:email,code:Math.floor(Math.random() * 9  ) + "" + Math.floor(Math.random() * 10  ) + "" + Math.floor(Math.random() * 10  ) + "" + Math.floor(Math.random() * 10  ) + "" + Math.floor(Math.random() * 10  )});
      
      SendEmail(ea)

    }


    const sudmitCodeHandler = async e =>
    {

        if(OneClick == true) return;
       
        if(code != enterCode){
            setError("הקוד שהכנסת שגוי נסה שנית ")
            return;
        }

        SetOneClick(true);
        setError("...יוצר משתמש")
        const { name, email, password} = details;
        const commentObj = {
            name,
            email,
            password
        };
         
         var someting = await createAuthor(commentObj)
        
        if(someting.createAuthor.id == null){
        
            setError("יש בעיה תבדוק שוב את השם שלך או אם משהו חסר");
            SetOneClick(false);
            return;
        }
      
        var someting = await  publishAuthor(someting.createAuthor)
        
        if(someting?.updateAuthor?.id != "" ){
        
            setError("נרשמת בהצלחה !");
            window.location.assign('/pages/login')
            return;
        }

        setError("יש בעיה");
        SetOneClick(false);
        return;

    }

    return (
        <div className ="bg-cover_bg_color  shadow-lg rounded-lg p-8 mb-8 pb-12  " id="tags">
           
            <h1 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center text-white">
                הרשמה
            </h1> 

            <div className='m-2 flex justify-center p-1 text-white'>
                {error}
            </div>
        { !panelCode&&
            <div className=' flex justify-center  grid grid-rows-5 grid-flow-col gap-4' dir="rtl">
                <div className='m-2'>
                    <p className='flex justify-center p-1 text-white'>:שם</p>
                    <input type="text" name="to_name" id='name' onChange={e => setdetails({...details,name:e.target.value})} value={details.name} placeholder="שם משתמש"   className="border  invalid:border-pink-500 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 ltr"  required/>
                </div>

                <div className='m-2'>
                    <p className='flex justify-center p-1 text-white'>:אימייל</p>
                    <input type="email" name='to_email' id='email' onChange={e => setdetails({...details,email:e.target.value})} value={details.email} placeholder="אימייל"   className="border  invalid:border-pink-500 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 " required/>
                </div>

                <div className='m-2 '>
                    <p className='flex justify-center p-1 text-white'>:סיסמא</p>
                    <input type="password" name='password' id='password' onChange={e => setdetails({...details,password:e.target.value})} value={details.password} placeholder="סיסמא"   className="border  invalid:border-pink-500 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 " required/>
                </div>

                <div className='m-2 '>
                    <p className='flex justify-center p-1 text-white'>:אישור סיסמא</p>
                    <input type="password" name='password' id='password_2' onChange={e => setdetails({...details,password_2:e.target.value})} value={details.password_2} placeholder="אישור סיסמא"   className="border  invalid:border-pink-500 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 " required/>
                </div>

                <div className='m-2 py-3 flex justify-center'>
                    <button onClick={sudmitHandler} className='className="transition duration-500 ease hover:bg-[#382C8B] inline-block bg-cover_color text-lg font-medium rounded-full text-white px-7  cursor-pointer "'>להירשם</button>
                </div>
            </div>}
    
            {panelCode &&  <div className=' flex justify-center  grid grid-rows-5 grid-flow-col gap-4' dir="rtl">
                <div className='m-2'>
                    <p className='flex justify-center p-1 text-white'>:קוד</p>
                    <input type="text" name="EnterCode" id='EnterCode' onChange={e => SetEnterCode(e.target.value)} value={enterCode} placeholder="שם משתמש"   className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 ltr"  required/>
                </div>
                    
                <div className='m-2 py-3 flex justify-center'>
                    <button onClick={sudmitCodeHandler}  className='className="transition duration-500 ease hover:bg-[#382C8B] inline-block bg-cover_color text-lg font-medium rounded-full text-white px-7  cursor-pointer "'>להירשם</button>
                </div>
            </div>}
        </div>
    )
}

export default Signup