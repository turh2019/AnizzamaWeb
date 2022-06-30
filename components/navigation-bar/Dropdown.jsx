import React,{useState} from 'react'
import Link from 'next/link';



const Dropdown = ({options , defaultOption}) => {
    var [isOpen,setIsOpem] = useState(false)
    
  return (
    
    <span className=' text-white mt-5   lg:p-0'    onClick ={e=>setIsOpem(!isOpen)}>
      <span className='pb-4  lg:border-b-4  lg:border-[#5344C1]'>
          <span className='mx-3  border-4 border-indigo-200  border-y-indigo-500 transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-5  cursor-pointer   '  >
                  {defaultOption}
          </span>
        </span>
        {isOpen ?
        <span className='grid grid-flow-row-dense gap-2 place-items-center flex flex-wrap  bg-[#261D78] shadow-lg rounded-lg mt-5 '>
        {options.map((option,index) =>(
             <span key={index} className =" text-sm hover:bg-[#382C8B] cursor-pointer text-l rounded-full"  onClick ={e=>setIsOpem(!isOpen)}>
                <Link  href={option.href} target="_blank"  > 
                   
                      {option.OptionName}
                          
                </Link>
            </span>     
        ))}


        </span> :""}
    </span>
  )
}

export default Dropdown