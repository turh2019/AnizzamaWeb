import React,{useState} from 'react'
import Link from 'next/link';



const Dropdown = ({options , defaultOption ,classNameSpan_1 ,classNameSpan_2,SetOnClick ,open,SetOpen}) => {
    var [isOpen,setIsOpem] = useState(false)
   
   
  return (
    <>
    <div className='bg-black bg-opacity-20  text-white  flex justify-center '  onReset={e=>setIsOpem(false)} onMouseLeave ={e=>setIsOpem(false)} onMouseEnter ={e=>setIsOpem(true)} onclick={e=>setIsOpem(true)}> 

    
        <span className=' drop-shadow-2xl border-2 bg-cover_bg_color p-1 fixed right-[135px] absolute  open:scale-100 scale-0 transition delay-150 duration-500 ease-in-out grid grid-flow-row-dense gap-2 place-items-center justify-self-start   border-opacity-10 rounded-lg drop-shadow-2xl  rounded-lg    ' open ={isOpen}>
        {options.map((option,index) =>(
          <>
          
          <span key={index} className ="flex justify-center items-center bg-black bg-opacity-20 h-10 w-[150px]  duration-800 ease transform hover:text-xl   text-base  cursor-pointer  "  onClick ={e=>{setIsOpem(!isOpen),SetOpen&&SetOpen(false)}}>
          <a href={`${option?.href}`}  target={option?.target} smooth ={true} onClick={e=>(SetOnClick? SetOnClick(option?.onclick):"")} className ="duration-500 ease transform  " > 
                {option.OptionName}    
          </a>
        </span>   
        </>
        ))}


        </span  > 
    
    <span className=' text-white   gap-5  flex justify-center   relative' >
   
      <span className= {classNameSpan_1}>
          <span className= {classNameSpan_2}  open={open}>
                  {defaultOption}
          </span>
        </span>

    </span>
    
    </div>
    </>
  )
}

export default Dropdown