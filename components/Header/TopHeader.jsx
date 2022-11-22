import React, { useState, useEffect } from 'react';
import { FeaturedPosts} from '../../sections/index';
import Link from 'next/link';
import { getCategories, publishAuthor, UpdateNotifications } from '../../services/services';
import {Toolbar} from '../getComponents';
import  {useStateContext} from '../../context/StateContext';
import {Notifications} from '../../components/getComponents'


const TopHeader = () => {

    const [openNav,SetOpenNav] =useState(false)
    const [bg,setBg]= useState("bg-rose-100")
    const [openNotifications,SetOpenNotifications] = useState(false)
    const {isLogin,profile,HandleLogout} = useStateContext();
   
    useEffect(() => {
      
      

    }, [])


  const updateindex =() =>{
    console.log("asd")
   if(profile?.notifications.filter((i) => (i.isHeRead == false  )).length> 0){
    profile.numOfNotifications = 0; 
    profile.notifications.map((item)=>(item.isHeRead == true))

        const commentObj = {
          id:profile.id,
          IsHeRead:true
      };

      UpdateNotifications(commentObj);
      UpdateNotifications({IsPublis:true})
   }
  }

  return (
    <div className= "sticky top-0 z-30 h-full w-full relative"  >
    <div className={`absolute transition transform duration-700 ease-in-out open:w-screen h-screen   bg-black w-0  z-20 open:opacity-50 opacity-0 `} open = {openNav}   onClick={ (e) => SetOpenNav(false)} > </div>
    <div class="  static absolute flex justify-center text-center right-[1px] h-screen translate-x-[250px] open:delay-[0ms] delay-[550ms] open:translate-x-[0] open:scale-100 scale-0   drop-shadow-2xl border-2 border-opacity-10  z-30 transition  duration-700 ease rounded-lg " open ={openNav}>
   
          <div className='bg-cover_bg_color z-30 ease ' >
            
            <Toolbar isOpen = {openNav} SetOpenNav ={SetOpenNav}/>
          </div>
     
        </div>
      
        <div className={isLogin? 'flex items-center bg-cover_bg_color opacity-90 rounded-lg drop-shadow-2xl  grid grid-cols-3 border-2 border-opacity-10 z-40': 'z-40 flex items-center bg-cover_bg_color opacity-90 rounded-lg drop-shadow-2xl  grid grid-cols-3 border-2 border-opacity-10'}>
        {!isLogin &&
            <div className=' grid grid-cols-2  place-items-start place-content-start  content-start justify-self-start ' >
                <a target="_blank"  href={`/pages/login`} onClick={ (e) => SetOpenNav(false)} >
                    <Link target="_blank" href={`/pages/login`}>
                        <span className='  flex  place-items-end md:scale-100 scale-50'>
                            <span className='-mx-6 md:mx-3 scale-100  hover:delay-[0ms] translate-x-[0] text-white hover:text-cover_color transition  duration-700 delay-[150ms] ease transform hover:scale-110  flex justify-center border-4 border-indigo-200  border-y-indigo-500  hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg font-medium rounded-full px-5  cursor-pointer  ' >
                                התחברות
                            </span>
                        </span>
                    </Link>
                </a>
                
                <a target="_blank"  href={`/pages/signup`} onClick={ (e) => SetOpenNav(false)}>
                        <Link target="_blank"  href={`/pages/signup`}>
                            <span className='  flex  place-items-end md:scale-100 scale-50 '>
                                <span className='-mx-6 md:mx-3 scale-100  hover:delay-[0ms] translate-x-[0] font-bold  text-white hover:text-cover_color transition  duration-700 delay-[150ms] ease transform hover:scale-110  flex justify-center border-4 border-indigo-200  border-y-indigo-500  hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg  rounded-full px-5  cursor-pointer '  >
                                    הרשמה
                                </span>
                            </span>
                        </Link>
                </a>
         </div> } 
     
            {isLogin && <div className="bg-coin bg-auto bg-no-repeat h-[70px] w-[70px] bg-center flex justify-center flex items-center px-4   text-[#404040] font-bold  md:scale-100 scale-75 "> <p className='flex justify-left color text-ellipsis overflow-hidden '>{profile.mycoins >= 1000 &&profile.mycoins < 1000000 ?  profile.mycoins / 1000 + "K" : profile.mycoins >= 1000000 ?  profile.mycoins / 1000000 + "M": profile.mycoins}</p></div>}
        

            <div className={isLogin? ' flex justify-center items-center md:scale-100 scale-0 md:translate-x-[0%]':'md:translate-x-[25%]  translate-x-[20%] flex items-center'}>
               <img src="/bg/title.webp " width={250} onClick={(e)=>{  window.location.assign('/')}} className='cursor-pointer ' />
            </div>
    
            <div className='flex justify-end flex items-center px-4'>
            {profile?.notifications&&    <div> 
                  <span class=" open:scale-100 scale-0  relative " open={profile?.notifications.filter((i) => (i.isHeRead == false  )).length > 0}>
                 
                  <div class="open:scale-100 scale-0 bg-indigo-500 shadow-lg  absolute -right-3 -top-8  shadow-indigo-500/50 rounded-full px-2 text-white " open={profile?.notifications.filter((i) => (i.isHeRead == false  )).length > 0}>{ profile?.notifications.filter((i) => (i.isHeRead == false  )).length} </div>
                     <span class=" open:scale-100 scale-0 open:text-lg  text-[0px]  bg-indigo-500 shadow-lg  animate-ping absolute -right-3 -top-8  shadow-indigo-500/50 rounded-full px-2 text-white"  open={profile?.notifications.filter((i) => (i.isHeRead == false  )).length > 0} >{profile?.notifications.filter((i) => (i.isHeRead == false  )).length}</span>
                  </span>
                  <button className=' text-white hover:scale-110 ' onClick={(e)=>(SetOpenNotifications(!openNotifications), updateindex())}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 fill-[#fde047] stroke-[#1e293b]"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" /></svg></button>
              </div>}
               <button onClick={(e) => (SetOpenNav(!openNav))}  className='  translate-x-[0] open:translate-x-[135px] scale-100 open:scale-0  transition duration-500 ease  inline-block text-lg font-medium rounded-full text-white pl-1  h-10  cursor-pointer  -z-5' open ={openNav}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></button>   
            </div>

            
        </div> 
       {profile?.notifications&& <Notifications notifications={profile?.notifications} open ={openNotifications} />}
    </div>
     
  );
};

export default TopHeader;
