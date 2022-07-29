import React,{useState} from 'react'
import Link from 'next/link';



const Dropdown = ({options , defaultOption ,classNameSpan_1 ,classNameSpan_2,SetOnClick}) => {
    var [isOpen,setIsOpem] = useState(false)
  
   
  return (
    <>
   
    <span className=' text-white mt-5 lg:p-0' onReset={e=>setIsOpem(false)} onPointerLeave ={e=>setIsOpem(false)} onPointerEnter ={e=>setIsOpem(true)} >
      <span className= {classNameSpan_1}>
          <span className= {classNameSpan_2}  >
                  {defaultOption}
          </span>
        </span>
        {isOpen ?
        <span className='transition delay-150 duration-300 ease-in-out grid grid-flow-row-dense gap-2 place-items-center flex   bg-[#261D78] shadow-lg rounded-lg mt-5 '>
        {options.map((option,index) =>(
          <>
          {console.log(option)}
          <span key={index} className ="transition duration-500 ease transform hover:-translate-x-1 px-1 text-sm hover:bg-[#382C8B] cursor-pointer text-l rounded-full"  onClick ={e=>setIsOpem(!isOpen)}>
          <a href={`${option?.href}#`}  target="_blank" smooth onClick={e=>(SetOnClick? SetOnClick(option?.onclick):"")} > 
                {option.OptionName}    
          </a>
        </span>   
        </>
        ))}


        </span  > :""}
    </span>
    </>
  )
}

export default Dropdown