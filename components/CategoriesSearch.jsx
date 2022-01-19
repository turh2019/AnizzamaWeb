import React,{useState,useEffect} from 'react'
import { Header ,PageCard} from './getComponents';
import { getCategories ,getPage} from '../services/services';
import Link from 'next/link'
import Image from 'next/image';
import Select from'react-select'




  

const CategoriesSearch = ({posts}) => {
  
    const [Catgoryot, setCatgoryot] = useState([])
    const num1 =0;
    const num2 =0;


    useEffect(() =>{
        getCategories()
        .then((newcat)=>setCatgoryot(newcat))
        
   
    },[])

  
    
    
    var [displayvalue,getvalue] =useState();
    var DdiHandel = (e) =>{
        
        getvalue(Array.isArray(e)?e.map(x => x.label):[]);
      
    }
        
   
  
       console.log({posts})
     
    return (
       <div className='mt-3 p-4 lg:p-0 text-white text-opacity-50 '>
           <center className="font-bold text-2xl pb-7  ">
           {"select Categories "}
           </center>
            
            <div className=' p-2 pb-7 '>
                <Select isMulti options={Catgoryot} onChange={DdiHandel} className =" text-black bg-black font-bold "></Select>
            </div>
        
        
        
            {displayvalue && displayvalue!="" ? 
             <div className=' grid grid-cols-1 lg:grid-cols-2 gap-12'>
                   {posts.filter((val) =>  {
                        if(displayvalue ==""){    
                             return null
                        }else
                         num1 =0
                         num2 =0
                         val.node.category.map((C)=>{
                           
                           
                            displayvalue.map((G,i)=>
                            {
                                num1 =i+1
                                if(C.label ==G){
                                    console.log(C.label+" == "+G)
                                    num2= num2 +1;
                                  
                                    
                                }else{
                                  
                                    
                                }
                                
                            })
                           
                            
                           
                        })
                        console.log(num2 +"="+ num1)
                        if(num2 == num1 &&num2!=0){
                            return val  
                        }else{
                            return null
                        }
                       
                    }).map((val,key)=>
                    (
                        <span className='flex items-stretch'>
                        <PageCard key={key} post={val.node} />
                        </span> 
                    ))}
                   
                    
             </div>  :
             <div className='grid grid-cols-1 lg:grid-cols-2 gap-12  '>
                    {posts.map((post, index) => (
                        <span className='flex items-stretch'>
                            <PageCard key={index} post={post.node} />
                        </span>   
                    ))}  
              </div>
              }
              </div>
             
    
    )
}

export default CategoriesSearch