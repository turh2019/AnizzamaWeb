import React,{useState,useEffect} from 'react'
import { getTags  } from '../../services/services';
function TagsList() {
    const [tags, SetTags] = useState([])
 
    useEffect(() =>{
        getTags()
        .then((newTag)=>SetTags(newTag))
    },[])
 
  
    return (
        <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 " id="tags">
                  <h1 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center ">
                     תגים
                  </h1> 
            <div>
                <div className='  grid  grid-flow-col auto-cols-max grid-flow-row-dense  grid-cols-3   ' > 
                    {tags.map((tag) => (
                            <a  href={`/tags/${tag.slug}`} to className='break-ward text-center   shadow-size-[15px] rounded-lg   font-bold  text-[10px] p-1 px-2 out hadow-lg shadow-[#3E2E88] cursor-pointer transition duration-500 ease transform hover:-translate-y-1 px-1 rounded-lg  mb-4 ml-4  bg-[#3E2E88] '>
                                {tag.label } 
                                <span className=' ml-1 text-[#FFFC22] font-bold text-[10px]'>
                                    - ({tag.posts.length})
                                </span>
                            </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TagsList