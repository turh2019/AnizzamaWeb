import React,{useState,useEffect, FunctionComponent} from 'react'
import { Header ,PageCard} from '../getComponents';
import { getCategories ,getPage} from '../../services/services';
import Link from 'next/link'
import Image from 'next/image';

import makeAnimated from 'react-select/animated';

import Select  from 'react-select';



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
      
    
const animatedComponents = makeAnimated();
const CategoriesSearch = ({posts}) => {
    var num1 =0;
    var num2 =0;
    const [Catgoryot, setCatgoryot] = useState([""])
    const [formt, setformt] = useState("")
    const [projectStatus, SetProjectStatus] = useState("")
    var  x = "";
  

    useEffect(() =>{
        getCategories()
        .then((newcat)=>setCatgoryot(newcat))
        
   
    },[])

    
    
 
    
    var [displayvalue,getvalue] =useState();
    var [Fansub,GetFansub] =useState([]);
    var CatgoryottHandel = (e) =>{
        
        getvalue(Array.isArray(e)?e.map(x => x.label):[]);
      
    }

    var CatgoryottHandel_ = (e,y) =>{
        
        getvalue(Array.isArray(e)?e.filter(x => x!= y? x:null):[]);
      
    }

    var FansubHandel = (e) =>{
        
        GetFansub(Array.isArray(e)?e.map(x => x.label):[]);
      
    }
  
    var FansubHandel_ = (e, y) =>{
        
        GetFansub(Array.isArray(e)?e.filter(x => x!= y? x:null):[]);
    }
    const ClearIndicator = () =>{
      
        const children_ =  fansub.filter((f) =>{
            const children = Fansub?.filter((fan)=>{
                   if( f.label !=fan){
                    
                     return f
                   } else{
                     return null;       
                   }
                   
                })
            })

        console.log({children_})
        return (<div> {children_}</div>  );
    }
    
     
    return (
       <div className=' p-4 lg:p-0 text-white  ' >
            <div className=' lg:grid lg:grid-cols-4 mx-4  gap-4' dir="rtl">
                <div className='  pb-7  text-withe-4'>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"קטגוריות "}
                    </center>
                    <div className='cursor-pointer'>
                        <Select styles=" p-4 lg:p-0 " inputValue={displayvalue?.values.prototype}  placeholder="בחר/י..."  autoFocus={true} hideSelectedOptions={true}  tabSelectsValue={true} isRtl={true} components={animatedComponents}  isMulti options={Catgoryot} onChange={CatgoryottHandel} className =" px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>

                <div className='  pb-7  text-withe-4'>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"פאנסאבים"}
                    </center>
                    <div className='cursor-pointer'>
                        <Select hideSelectedOptions inputValue ={Fansub.values.prototype} label={Fansub.values.prototype} values = {Fansub.values.prototype} clearValue= {Fansub != null ?false: true}    styles=" lg:p-0 text-white"  placeholder="בחר/י..."  autoFocus={true}   tabSelectsValue={true} isRtl={true}  isMulti options={fansub} onChange={FansubHandel} className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>

                <div className='  pb-7  text-withe-4'>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"מצב פרויקט "}
                    </center>
                    <div className='cursor-pointer'>
                    <Select hideSelectedOptions value={projectStatus}  placeholder="בחר/י..." isRtl={true} components={animatedComponents}  isClearable={true} options={ProjectStatus} onChange={(e)=>(SetProjectStatus(e?e.label:""))}  className ="px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={true}></Select>
                    </div>
                 
                </div>


                <div className='  pb-7  text-withe px-4'>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"פורמט "}
                    </center>
                    <div className='cursor-pointer'>
                        <Select hideSelectedOptions value={formt} placeholder="בחר/י..."isRtl={true} components={animatedComponents}  isClearable={true} options={formts} onChange={(e)=>(setformt(e?e.label:""))} className =" px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl    accent-pink-500  scroll-ml-6" closeMenuOnSelect={true}></Select>
                    </div>
                 
                </div>
            
            </div>
            
            <div >
                 <div>
                     <div className='bg-bookmark bg-contain bg-left bg-no-repeat    '>
                     </div>
                       <div  className='grid grid-cols-3  lg:grid grid-cols-5 '>
                           {formt!=""?
                            <span className='break-ward text-center   shadow-size-[15px] rounded-lg  font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1 px-1 rounded-lg  mb-4 ml-4  bg-[#3E2E88]'>
                                {formt}
                                <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(setformt(""))}>x</button>
                            </span>
                           :""}

                            {projectStatus ? 
                                <span key={projectStatus} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1 px-1 rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                    {projectStatus}
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(SetProjectStatus(""))}>x</button>
                                </span>
                            :""}
                           
                           {displayvalue ? 
                            displayvalue.map((G)=>(
                                <span key={G} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1 px-1 rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                    {G}
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(CatgoryottHandel_(displayvalue,G))}>x</button>
                                </span>
                                
                                        
                            ))
                            :""}

                            {Fansub ? 
                            Fansub.map((G)=>(
                                <span key={G} className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[12px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1  rounded-lg  mb-4 ml-4  bg-[#3E2E88]' >
                                    {G}
                                   
                                    <button className='text-center float-right transition duration-500 ease transform hover:bg-[#FF0000] px-1 text-[12px]  rounded-full  ' onClick={(e)=>(FansubHandel_(Fansub,G))}>x</button>
                                </span>
                            ))
                            :""}


                        </div>
                </div>      
            </div>
     
            
        
          
             <div className=' grid grid-cols-3 gap-2 py-5'>
                   
                    
                   {posts.filter((val) =>  {
                        if(!displayvalue || displayvalue==""){
                            
                            if(!formt||formt =="") 
                            {
                                return val
                            }
                                
                              
                            if(formt == val.node.format){
                                
                                return val
                            }


                                
                            return null                           
                        }else
                        {
                            
                            num1 =0
                            num2 =0
                            val.node.category.map((C)=>{
                            
                           
                            displayvalue.map((G,i)=>
                            {
                                num1 =i+1
                                if(C.label ==G){
                                    
                                    num2= num2 +1;
                                  
                                    
                                }else{
                                  
                                    
                                }
                                
                            })
                           
                            
                           
                        })
                       
                        if(num2 == num1 &&num2!=0)
                        {
                            if(!formt||formt =="") 
                            {
                                return val
                            } 

                            if(formt ==val.node.format)
                            {
                                return val
                            }
                           
                            return null
                            
                        }else{
                            return null
                        }
                       
                    }}).filter((val) =>{
                        if(!Fansub || Fansub == "")
                        {
                           
                            return val
                        }else{


                            num1 =0
                            num2 =0
                            val?.node?.fansub.map((C)=>{
                                
                                Fansub.map((G,i)=>
                                {
                                  
                                    num1 =i+1
                                    if(C ==G){
                                        
                                        num2= num2 +1;
                                    
                                        
                                    }
                            })
                                
                                
                      
                           
                        }) 
                        console.log(num2 == num1 )
                        if(num2 == num1 && num2 !=0 )
                        {
                            return val
                        }else{
                            return null
                        }
                    
                    }}).filter((val) =>{
                        
                        if(!projectStatus || projectStatus == "")
                        {
                           
                            return val

                        }
                        else if( val?.node?.projectStatus == projectStatus )
                        {
                           return val;     
                        }
                        else
                        {
                           
                            return null
                        }
                        
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