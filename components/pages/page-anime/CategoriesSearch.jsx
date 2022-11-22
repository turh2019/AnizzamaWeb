import React,{useState,useEffect, FunctionComponent} from 'react'
import { PageCard} from '../../getComponents';
import { getCategories ,getPage} from '../../../services/services';
import Link from 'next/link'
import Image from 'next/image';

import makeAnimated from 'react-select/animated';

import Select  from 'react-select';
import moment from 'moment'


  const formts=[
      {
        label:"movie",
        value:"movie"
      },
      {
        label:"series",
        value:"series"
      },
      {
        label:"special",
        value:"special"
      },
      {
        label:"ova",
        value:"ova"
      },
      {
        label:"ona",
        value:"ona"
      }
    ]

    const  fansub=[
        {
          label:"Anizzama",
          value:"Anizzama"
        },
        {
            label:"FireSub",
            value:"FireSub"
        },
        {
            label:"unknown",
            value:"unknown"
        }
    ]

    const ProjectStatus=[
        {
          label:"finished",
          value:"גמור"
        },
        {
            label:"frozen",
            value:"קפוא"
        },
        {
            label:"planned",
            value:"מתוכנן"
        },
        {
            label:"abandoned",
            value:"נזרק"
        },
        {
            label:"active",
            value:"פעיל"
        }
    ]




    const TimeRelease=[
        {
          label:"2022",
          value:"2022"
        },
        {
            label:"2021",
            value:"2021"
        },
        {
            label:"2020",
            value:"2020"
        },
        {
            label:"2019",
            value:"2019"
        },
        {
            label:"2018",
            value:"2018"
        }
    ]



    const Seasons=[
        {
          label:"Winter",
          value:"Winter"
        },
        {
            label:"Spring",
            value:"Spring"
        },
        {
            label:"Summer",
            value:"Summer"
        },
        {
            label:"Fall",
            value:"Fall"
        }
    ]
      
    
const animatedComponents = makeAnimated();
const CategoriesSearch = ({posts}) => {
    var num1 =0;
    var num2 =0;
    const [Catgoryot, setCatgoryot] = useState()
  
  
    var  x = "";
  

    useEffect(() =>{
        getCategories()
        .then((newcat)=>setCatgoryot(newcat))
        
   
    },[])

    
    
 
    const [Myformt, setformt] = useState([])
    var [displayvalue,getvalue] =useState();
    var [Fansub,GetFansub] =useState();
    const [projectStatus, SetProjectStatus] = useState()
    const [timeRelease, SetTimeRelease] = useState()
     const [seasons, SetSeasons] = useState()
    var AddValueHandel = (e ,SetValue) =>{
        
        SetValue(Array.isArray(e)?e.map(x =>  x):[]);
      
    }

    var RemoavValuetHandel_ = (e,y ,SetValue) =>{
        
        SetValue(Array.isArray(e)?e.filter(x => x.label!= y? x:null):[]);
      
    }

   

    
     
    return (
       <div className='  lg:p-0 text-white   ' >
               
            <div className=' lg:grid lg:grid-cols-3 pl-5  gap-4' dir="rtl">
                <div className='  pb-7  text-withe-4'>
                    <center className="font-bold text-2xl text-center pl-12 pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"קטגוריות "}
                    </center>
                    <div className='cursor-pointer'>
                        <Select styles=" p-4 lg:p-2 " displayvalue = {false}  hideSelectedOptions    value={ displayvalue?.filter((p) => {return p})}   placeholder="בחר/י..."  autoFocus={true}   tabSelectsValue={true} isRtl={true} components={animatedComponents}  isMulti options={Catgoryot} onChange={(e)=>AddValueHandel(e,getvalue)} className =" px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>

                <div className='  pb-7  text-withe-4 pl-12 '>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"פאנסאבים"}
                    </center>
                    <div className='cursor-pointer'>
                        <Select hideSelectedOptions  = {true}  displayvalue ={false} value={ Fansub?.filter((p) => {return p})}    styles=" lg:p-0 text-white"  placeholder="בחר/י..."  autoFocus={true}   tabSelectsValue={true} isRtl={true}  isMulti options={fansub} onChange={(e)=>AddValueHandel(e,GetFansub)} className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>

                <div className='  pb-7  text-withe-4 pl-12 '>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"מצב פרויקט "}
                    </center>
                    <div className='cursor-pointer'>
                    <Select hideSelectedOptions  = {true}  displayvalue ={false} value={ projectStatus?.filter((p) => {return p})}    styles=" lg:p-0 text-white"  placeholder="בחר/י..."  autoFocus={true}   tabSelectsValue={true} isRtl={true}  isMulti options={ProjectStatus} onChange={(e)=>AddValueHandel(e,SetProjectStatus)} className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>


                <div className='  pb-7  text-withe pl-12 '>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"פורמט "}
                    </center>
                    <div className='cursor-pointer'>
                    <Select hideSelectedOptions   value={ Myformt?.filter((p) => {return p})}    styles=" lg:p-0 text-white"  placeholder="בחר/י..."    tabSelectsValue={false} isRtl={true}  isMulti options={formts} onChange={(e)=>AddValueHandel(e,setformt)} className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>


                <div className='  pb-7  text-withe pl-12 '>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"שנת יציאה"}
                    </center>
                    <div className='cursor-pointer'>
                    <Select hideSelectedOptions   value={ timeRelease?.filter((p) => {return p})}    styles=" lg:p-0 text-white"  placeholder="בחר/י..."    tabSelectsValue={false} isRtl={true}  isMulti options={TimeRelease} onChange={(e)=>AddValueHandel(e,SetTimeRelease)} className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>

                <div className='  pb-7  text-withe pl-12 '>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"עונות"}
                    </center>
                    <div className='cursor-pointer'>
                    <Select hideSelectedOptions   value={ seasons?.filter((p) => {return p})}    styles=" lg:p-0 text-white"  placeholder="בחר/י..."    tabSelectsValue={false} isRtl={true}  isMulti options={Seasons} onChange={(e)=>AddValueHandel(e,SetSeasons)} className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>
            
            </div>
            
            <div >
                 <div>
                     <div className='bg-bookmark bg-contain bg-left bg-no-repeat    '>
                     </div>
                       <div  className='grid grid-cols-3  lg:grid grid-cols-5 '>
                           {Myformt?
                                Myformt.map((f)=>(
                                    <span key={f.label} className='break-ward text-center   shadow-size-[15px] rounded-lg  font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1 px-1 rounded-lg  mb-4 ml-4  bg-[#3E2E88]'>
                                    {f.label}
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(RemoavValuetHandel_(Myformt,f.label,setformt))}>x</button>
                                </span>
                                ))
                          
                           :""}
                            {projectStatus ? 
                            projectStatus.map((p)=>(
                                <span key={p.label} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                    {p.label}
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(RemoavValuetHandel_(Fansub,p.label,SetProjectStatus))}>x</button>
                                </span>
                            ))
                            :""}

                           {displayvalue ? 
                            displayvalue.map((G)=>(
                                <span key={G.label} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1 px-1 rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                    {G.label}
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(RemoavValuetHandel_(displayvalue,G.label,getvalue))}>x</button>
                                </span>
                                
                                        
                            ))
                            :""}

                            {Fansub ? 
                            Fansub.map((G)=>(
                                <span key={G.label} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                    {G.label}
                                   
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(RemoavValuetHandel_(Fansub,G.value,GetFansub))}>x</button>
                                </span>
                            ))
                            :""}


                            {timeRelease ? 
                                timeRelease.map((G)=>(
                                    <span key={G.label} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                        {G.label}
                                    
                                        <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(RemoavValuetHandel_(Fansub,G.value,SetTimeRelease))}>x</button>
                                    </span>
                                ))
                            :""}


                            {seasons ? 
                                seasons.map((G)=>(
                                    <span key={G.label} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                        {G.label}
                                    
                                        <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(RemoavValuetHandel_(Fansub,G.value,SetSeasons))}>x</button>
                                    </span>
                                ))
                            :""}



                        </div>
                </div>      
            </div>
     
            
        
          
             <div className=' grid lg:grid-cols-3  grid-cols-1  gap-2 py-5'>
                   
                    
                   {posts.filter((val) =>  {
                        if(!displayvalue || displayvalue==""){
    
                            return val                           
                        }else
                        {
                            
                            num1 =0
                            num2 =0
                            val.node.category.map((C)=>{
                            displayvalue.map((G,i)=>
                            {
                                num1 =i+1
                                if(C.label ==G.label){
                                    
                                    num2= num2 +1;
                                  
                                    
                                }else{
                                  
                                    
                                }
                                
                            })
                        })
                       
                        if(num2 == num1 &&num2!=0)
                        {
                           
                            return val
                            
                        }else{
                            return null
                        }
                       
                    }}).filter((val)=> {

                       if( !Myformt || Myformt=="")  return val
    
                                                   
                        
                       num1 =0;
                       Myformt.map((G,i)=> 
                        {
                            if( G.label == val.node.format ){
                                num1 =num1 + 1 ;
                            }
                        })
                       if(num1 >= 1)return val
                        
                        
                        
                    }).filter((val) =>{

                        if(!Fansub || Fansub == "")
                        {
                           
                            return val
                        }
                        
                        num1 =0;
                        Fansub.map((G,i)=> 
                         {
                             if( G.label == val.node.fansub ){
                                 num1 =num1 + 1 ;
                             }
                         })
                        if(num1 >= 1)return val
                        
               
                    }).filter((val) =>{
                        

                        if(!projectStatus || projectStatus == "")
                        {
                           
                            return val
                        }
                        
                        num1 =0;
                        projectStatus.map((G,i)=> 
                         {
                             if( G.label == val.node.projectStatus ){
                                 num1 =num1 + 1 ;
                             }
                         })
                        if(num1 >= 1)return val

                        
                    }).filter((val) =>{
                        

                        if(!timeRelease || timeRelease == "")
                        {
                           
                            return val
                        }

                     
                        
                        num1 =0;
                        timeRelease.map((G,i)=> 
                         {
                            console.log(moment(val.node.createdAt).format('YYYY'));
                             if( G.label ==  moment(val.node.createdAt).format('YYYY')){
                                 num1 =num1 + 1 ;
                             }
                         })
                        if(num1 >= 1)return val

                        
                    }).filter((val) =>{
                        

                        if(!seasons || seasons == "")
                        {
                           
                            return val
                        }

                     
                        
                        num1 =0;
                        seasons.map((G,i)=> 
                         {
                             if( G.label == val.node.season_){
                                 num1 =num1 + 1 ;
                             }
                         })
                        if(num1 >= 1)return val

                        
                    }).map((val,key)=>
                    (
                        val.node.itsShow?
                        <span className='flex items-stretch'>
                        <PageCard key={key} post={val.node}  type={val.node.format} />
                        </span> :""
                    ))}
                   
                    
             </div>
              </div>
              
             
    
    )
}

export default CategoriesSearch