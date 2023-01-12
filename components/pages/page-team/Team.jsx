import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import { getJobs, getPostDetails } from '../../../services/services';
import Image from 'next/image';

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

function Team() {
    const [authors, setAuthors] = useState([])
 
   

    useEffect(() =>{
        getJobs()
        .then((newAuthor)=>setAuthors(newAuthor))
    },[])
 
  
    return (
        <>
        <div className ="bg-cover_bg_color text-white shadow-lg rounded-lg p-8 mb-8 pb-12 ">
                  <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     צוות האתר
                  </h3>
            <div>
                <div className=' grid md:grid-cols-4 grid-cols-1 gap-4 flex justify-end '>
                    {authors.filter((author)=>(author.profileStatus.filter((status) => status === "Staff").length > 0)).map((author)=>(
                        <div className='text-center mt-20 mb-8 p-4 relative rounded-lg bg-black bg-opacity-20'>
                             {console.log( author.profileStatus)}
                            <div className="absolute left-0 right-0 -top-14 ">
                                <Image
                                unoptimized             
                                alt={author.name}
                                height="100px"
                                width="100px"
                                className="align-middle rounded-full"
                                src={author.photo.url}
                            />
                            </div>

                          
                           <a href={`/profile/${author?.name}`}><h3 className="mt-10 text-white text-center mb-4 text-xl font-bold p-1 break-all">{author.name}</h3></a> 
                           <p className="text-white text-ls break-all">{author.bio?.split("\n").map((item) =>(<div className='pb-2'>{item}</div>))}</p>
                       
                            <div className='mt-10 flex justify-center  items-center mt-10 flex flex-wrap ' > 
                                {author.profileStatus.map((Status,index) => (
                                   ProfileStatus.map((s) => (
                                    Status == s.label&& <span to className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[10px] p-1 px-2 out hadow-lg shadow-[#3E2E88] transition duration-500 ease transform hover:scale-110  rounded-lg  mb-4 mx-2   bg-cover_color '>
                                        {s.value} 
                                    </span>
                               ))))}
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        </div> 

                    <div className ="bg-cover_bg_color text-white shadow-lg rounded-lg p-8 mb-8 pb-12 "> 
                    <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     צוות שפרש
                    </h3>
                    <div>
                        <div className=' grid  md:grid-cols-4 grid-cols-1 gap-4 flex justify-end '>
                            {authors.filter((author)=>(author.profileStatus.filter((status) => status == "Retired").length > 0)).map((author)=>(
                                  
                                <div className='text-center mt-20 mb-8 p-4 relative rounded-lg bg-black bg-opacity-20'>
                                    <div className="absolute left-0 right-0 -top-14 ">
                                        <Image
                                        unoptimized             
                                        alt={author.name}
                                        height="100px"
                                        width="100px"
                                        className="align-middle rounded-full"
                                        src={author.photo.url}
                                        />
                                    </div>
                                    <h3 className="text-white text-center mt-10 mb-4 text-xl font-bold  text-center break-all">{author.name}</h3>
                                    <p className="text-white text-ls break-all">{author.bio?.split("\n").map((item) =>(<div className='pb-2'>{item}</div>))}</p>
                                    <div className='mt-10 flex justify-center  items-center mt-10 flex flex-wrap  ' > 
                                    {author.profileStatus.map((Status,index) => (
                                        ProfileStatus.map((s) => (
                                                Status == s.label&& <span to className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[10px] p-1 px-2 out hadow-lg shadow-[#3E2E88]  transition duration-500 ease transform hover:scale-110  rounded-lg  mb-4 mx-2   bg-cover_color '>
                                                {s.value} 
                                            </span>
                                        ))))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                   
        </>
    )
}

export default Team