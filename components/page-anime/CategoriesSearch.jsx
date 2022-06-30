import React,{useState,useEffect} from 'react'
import { Header ,PageCard} from '../getComponents';
import { getCategories ,getPage} from '../../services/services';
import Link from 'next/link'
import Image from 'next/image';
import Select from'react-select'
import makeAnimated from 'react-select/animated';






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
    
const animatedComponents = makeAnimated();
const CategoriesSearch = ({posts}) => {
    var num1 =0;
    var num2 =0;
    const [Catgoryot, setCatgoryot] = useState([])
    const [formt, setformt] = useState("")
    var  x = "";

    useEffect(() =>{
        getCategories()
        .then((newcat)=>setCatgoryot(newcat))
        
   
    },[])

    
    
 
    
    var [displayvalue,getvalue] =useState();
    var DdiHandel = (e) =>{
        
        getvalue(Array.isArray(e)?e.map(x => x.label):[]);
      
    }
  
      
     
    return (
       <div className='mt-3 p-4 lg:p-0 text-white  ' >
            <div className=' lg:grid grid-cols-4 mx-4  gap-4' dir="rtl">
                <div className=' p-2 pb-7  text-withe-4'>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"קטגוריות "}
                    </center>
                    <div className='cursor-pointer'>
                        <Select styles="mt-3 p-4 lg:p-0 text-white"  placeholder="בחר/י..."  autoFocus={true} hideSelectedOptions={false}  tabSelectsValue={true} isRtl={true} components={animatedComponents}  isMulti options={Catgoryot} onChange={DdiHandel} className ="hover:px-4 px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={false}></Select>
                    </div>
                 
                </div>

                <div className=' p-2 pb-7  text-withe px-4'>
                    <center className="font-bold text-2xl  pb-2 text-withe text-opacity-50  will-change-scroll hover:will-change-scroll ">
                    {"פורמט "}
                    </center>
                    <div className='cursor-pointer'>
                        <Select  placeholder="בחר/י..." isRtl={true} components={animatedComponents}  isClearable={true} options={formts} onChange={(e)=>(setformt(e?e.label:""))} className ="hover:px-4 px-8 h-30 w-60 text-sky-600  font-bold  shadow-2xl   ease-in duration-300 accent-pink-500  scroll-ml-6" closeMenuOnSelect={true}></Select>
                    </div>
                 
                </div>
            
            </div>
            
            <div className='  ' >
              
               
                 <div>
                     <div className='bg-bookmark bg-contain bg-left bg-no-repeat    '>
                     </div>
                       <div  className='grid grid-cols-3  lg:grid grid-cols-5 '>
                           {formt!=""?
                            <span className='ml-5 p-1 bg-sky-500 shadow-lg shadow-sky-500/40 text-withe rounded-lg px-2 font-bold mb-4  text-md  '>
                                {formt}
                            </span>
                           :""}
                           
                           {displayvalue ? 
                            displayvalue.map((G)=>(
                                <span key={G} className='ml-5 p-1 bg-sky-500 shadow-lg shadow-sky-500/40 text-withe rounded-lg px-2 font-bold mb-4  text-md  ' >
                                    {G}
                                    
                                </span>
                                
                                        
                            ))
                            :""}
                        </div>
                   
                </div>  
                 
                   
            </div>
     
            
        
          {displayvalue && displayvalue!="" ||formt&&formt !="" ? 
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
                       
                    }}).map((val,key)=>
                    (
                        <span className='flex items-stretch'>
                        <PageCard key={key} post={val.node}  type={val.node.format} />
                        </span> 
                    ))}
                   
                    
             </div>:
             <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {posts.map((post, index) => (
                        <span className='flex items-stretch'>
                            <PageCard key={index} post={post.node}  type={post.node.format}/>
                        </span>   
                    ))}  
              </div>
              }
              </div>
              
             
    
    )
}

export default CategoriesSearch