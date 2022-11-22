import React, { useState, useEffect } from 'react';



const BoxMessage = ({Message ,isOpen,setIsOpen ,setonClickYes}) => {
 
  return (

      <div className='fixed place-content-center box-border border-[1px] rounded-lg top-[%50] bottom-[50%] z-40 bg-main_bg_color  flex  justify-center items-center  text-center  transition duration-700 delay-[50ms] ease open:scale-100 scale-0 grid grid-cols-1  md:translate-x-[0%]' open = {isOpen} >
          <button onClick={ (e) =>(setIsOpen(false),setonClickYes && setonClickYes(false))} className='justify-self-start px-1 m-1  hover:bg-rose-900 rounded-lg text-sky-100 transition duration-700 ease'>X</button>
          {Message?.split('\n').map((message) =>(
            <span className=' p-2 text-sky-100'>{message}</span>
          ))}
          
          <span onClick={(e) =>(setIsOpen(false),setonClickYes &&  setonClickYes(true))} className='cursor-pointer px-1 m-1 justify-self-center bg-cover_color rounded-lg text-sky-100 scale-100 hover:scale-110 transition duration-700 ease'>אישור</span>
      </div>  

  );
};

export default BoxMessage;

