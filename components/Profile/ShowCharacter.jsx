import React from 'react';
import Image from 'next/image';
import {Inventory} from '../getComponents';

const bodyPart=[
    {
        label:"Head",
        value:"ראש"
    },
    {
        label:"body",
        value:"גוף"
    },
    {
        label:"Legs",
        value:"רגליים"
    }
  ]

const stayles =[
    {
        classNameSpan_1 :'flex justify-center items-center translate-y-[20%]  open:translate-y-[2%]  ' ,
    },
    {
        classNameSpan_1 :' ',
    },
    {
        classNameSpan_1 : '',
    }
]


const ShowCharacter = ({wear,big}) =>{
  


 return (

  <div className="text-center ">
    <div className=' grid grid-cols-1 flex place-items-center inline-block text-lg font-medium rounded-full text-white  bg-cover_bg_color   ' open={big}>
       
        <div className ='rounded-full open:h-40 h-20 open:w-40  w-20 rounded-full  flex justify-center p-4' open={big}>
            <img src="/bg/profile.png" className=' h-10    open:h-[110px]  ' open={big} />
            <div className='absolute inset-0 ' >
                {bodyPart.map((part,index)=> (
                    wear?.map((item) =>(
                        item.bodyPart == part.label &&
                            <div className={stayles[index].classNameSpan_1} open={big}>
                                <img src={item.image.url} className=' h-7 open:h-20 ' open={big}/>
                            </div>
                    ))
                ))}
                            
            </div>
        </div>
    </div> 
  </div>
);}

export default ShowCharacter;