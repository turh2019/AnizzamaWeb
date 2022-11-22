import React, { useState, useEffect } from 'react';
import { FeaturedPosts} from '../../sections/index';
import Link from 'next/link';
import { getCategories } from '../../services/services';
import {Toolbar,ScrollView} from '../getComponents';
import  {useStateContext} from '../../context/StateContext';
import moment from 'moment'
const Notifications = ({notifications,open}) => {

    console.log(notifications)


    const ClickToSeeMore = (nof) =>
    {
        console.log(nof?.slug)
        window.location.assign(nof?.slug)
    }


  return (
    <div className=" rounded-lg open:p-5 transform duration-700 ease absolute h-[0px]  md:w-[500px] w-[380px] md:open:h-[700px]  open:h-[400px] mt-2  right-0 md:inset-x-[30%] inset-y-[100%]   text-white bg-cover_Inventory-button " dir="rtl" open ={open}> 
   
          <p className='m-2 -translate-y-3.5	 text-center font-bold open:scale-100 scale-0 transform duration-700 ease' open ={open}>התראות</p>
          <div className=' -translate-y-4 	 w-[100%] open:h-[95%] h-0 text-white overflow-scroll overflow-scale-0 overflow-x-hidden overflow-clip	 transform duration-700 ease' open={open}>
            
            {notifications.length == 0 &&<p>אין התראות חדשות</p>}
              {notifications?.map((item,index) => (
              
                <div key ={item.id} className='border-2 rounded-lg p-2 m-4 w-[95%]  bg-cover_color   sacle-100 hover:scale-110 transform duration-700 ease  items-center'>
                   <a href={`${item.link}`} className="text-[15px]">
                    <div className=' gap-2 items-center truncate'>
                      <div className= ' md:scale-100 scale-75    '>
                        קיבלת הודעה חדשה מ{item.author.name}:
                      </div>

                     
                      <div className='flex md:scale-100 scale-75 w-[400px]  h-6    items-center'>
                       "<p className='truncate'>{item.body}</p>..."
                     
                     
                      </div>
                  
                     <div className='justify-items-end  scale-100  text-sm flex items-end  ' dir="ltr">
                        {moment(item.createdAt).format('DD.MM.YYYY ')}
                     </div>

                    </div>
                    </a>
                </div>  
                
              ))}
            
          </div>
    </div>
     
  );
};

export default Notifications;