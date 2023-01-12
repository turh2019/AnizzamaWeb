import React from 'react';
import Image from 'next/image';
import {Inventory,ShowCharacter} from '../getComponents';


const ProfileStatus=[
  {
      label:"LinguisticEditor",
      value:"עורך/ת לשוני/ת"
  },
  {
    label:"Manager",
    value:"מנהל/ת"
  },
  {
      label:"Retired",
      value:"פרש/ה"
  },
  {
      label:"Staff",
      value:"בצוות"
  },
  {
      label:"Translator",
      value:"מתרגם/ת"
  }
]

const ShowProfile = ({Profile}) =>{
  



 return (

  <div className="text-center">
    <div className=' px-1 relative grid grid-cols-1 mb-5  place-items-center place-content-center flex flex-wrap text-white ' >
      <div className='grid grid-cols-1  place-items-center inline-block text-lg font-medium rounded-full text-white p-5   '   >
      {/* <ShowCharacter wear={Profile.wear} big={true}/> */}
          { <img src={Profile?.photoUrl}  className ='rounded-full h-40  w-40'/> }
      </div>
      <div className='mt-10 flex justify-center  items-center mt-10 flex flex-wrap ' > 
        {Profile.profileStatus.map((Status,index) => (
             ProfileStatus.map((s) => (
              Status == s.label&& <span to className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[10px] p-1 px-2 out hadow-lg shadow-[#3E2E88] transition duration-500 ease transform hover:scale-110  rounded-lg  mb-4 mx-2   bg-cover_color'>
            {s.value} 
          </span>
        ))))}
      </div>
    </div>
   
    
    <h3 className= "text-white mt-4 mb-4 text-xl font-bold">{Profile?.name} </h3>
    
    <p className="text-white text-ls breake  break-all">{Profile?.bio?.split("\n").map((item) =>(<div  className='pb-2'>{item}</div>))}</p>
    


  


  </div>
);}

export default ShowProfile;