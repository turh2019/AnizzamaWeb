import React,{useState,useEffect} from 'react'
import { getAllProfiles  } from '../../../services/services';
import {useStateContext} from  '../../../context/StateContext'
import { Link } from 'react-scroll';

function Login() {
    const [profiles, SetProfiles] = useState()
    const [error,setError] = useState("");
    const [details,setdetails] = useState({name:"",password:""});
    const [goTO,setGoTO] = useState(null);
    const {profile,HandleLogin,isLogin} = useStateContext();

    const sudmitHandler = async e =>{
    
        const somting  =await HandleLogin(details.name, details.password)
        if(somting)
        {
            window.location.assign('/')
        }
        else
        {
            setError("שם משתמש או הסיסמא שגויים")
            return;
        }


    }
  
    return (
        <div className ="bg-cover_bg_color  shadow-lg rounded-lg p-8 mb-8 pb-12  " id="tags">
                  <h1 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center text-white">
                     התחברות
                  </h1> 

                  <div className='m-2 flex justify-center p-1 text-white'>
                    {error}
                </div>
            <div className=' flex justify-center  grid grid-rows-3 grid-flow-col gap-4' dir="rtl">
              
              

                <div className='m-2'>
                    <p className='flex justify-center p-1 text-white'>:שם</p>
                    <input type="text" name='name' id='name' onChange={e => setdetails({...details,name:e.target.value})} value={details.userName} placeholder="שם משתמש"   className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 " />
                </div>

                <div className='m-2 '>
                    <p className='flex justify-center p-1 text-white'>:סיסמא</p>
                    <input type="password" name='password' id='password' onChange={e => setdetails({...details,password:e.target.value})} value={details.password}   className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 " />
                </div>
                <div className='m-2 py-3 flex justify-center'>
                    <button  onClick={sudmitHandler} className='className="transition duration-500 ease hover:bg-[#382C8B] inline-block bg-cover_color text-lg font-medium rounded-full text-white px-7  cursor-pointer "'>להתחבר</button>
                </div>
            </div>
        </div>
    )
}

export default Login