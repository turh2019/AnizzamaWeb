import React,{useState,useEffect} from 'react';
import { SearchBar  } from '../getComponents';
import {getPages,GetRandomPost,GetRandomSeries } from '../../services/services'
import Link from 'next/link'
import Dropdown from './Dropdown';


const OptionsAbout =[
    {OptionName:"דרושים", href:`/team/jobs`, to:``},
    {OptionName:"אודות", href:`/team/about`, to:``},
    {OptionName:"צוות", href:`/pages/team`, to:``},
]
const OptionsFun = (randomSeries, randomPost) => [
    {OptionName:"סדרה רנדומלית", href:`/series/` + randomSeries.slug, to:``},
    {OptionName:"פוסט רנדומלי", href:`/post/` + randomPost.slug, to:``},
    //{OptionName:"המלצות", href:`/page/`},
    //{OptionName:"סקרים", href:`/page/`},
]


const OptionsMore =[
   // {OptionName:"עידכונים", href:`/page/`},
   // {OptionName:'לו"ז', href:`/page/`},
    {OptionName:'שת"פ', href:`/pages/cooperation` , to:``},
    {OptionName:'תגים', href:`/pages/tags `, to:`tags`}

]

const stayles ={
    classNameSpan_1 : 'pb-4  lg:border-b-4  lg:border-[#5344C1]',
    classNameSpan_2 : 'mx-3  border-4 border-indigo-200  border-y-indigo-500 transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-5 focus:ring-offset-2  cursor-pointer  ',
}
 


const Toolbar = (type)  => {
    
    const [pages, setPages] = useState([]);
    const [randomSereis, setRandomSereis] = useState([]);
    const [randomPost, setRandomPost] = useState([]);
    useEffect(() =>{
        GetRandomSeries()
        .then((newPage)=>setRandomSereis(newPage))
    },[]);

    useEffect(() =>{
        GetRandomPost()
        .then((newPage)=>setRandomPost(newPage))
    },[]);

    useEffect(() =>{
        getPages()
        .then((newPage)=>setPages(newPage))
    },[]);


    const handleRandomPages = ()  =>
    {
        if(randomSereis){
            
           var randomNum = Math.floor(Math.random() * randomSereis.length  )
           
            var randomSeriesName = null;
            randomSereis.map((s,index) =>(index == randomNum? randomSeriesName = s.slug:""))
            return {
                slug:randomSeriesName,
            };
        }
    } 
    
    const handleRandomPost = ()  =>
    {
        if(randomPost){
            
           var randomNum = Math.floor(Math.random() * randomPost.length  )
            var randomPostName = null;
            randomPost.map((s,index) =>(index == randomNum? randomPostName = s.slug:""))
            return {
                slug:randomPostName,
            };
        }
    }

    
    return (
        <>
        <div className='pb-3 p-6 grid grid-cols-1 gap-4 place-items-center '>
            <div className='place-self-end flex flex-wrap'>   
            <Dropdown  defaultOption={"עוד"} options={OptionsMore} classNameSpan_1={stayles.classNameSpan_1} classNameSpan_2={stayles.classNameSpan_2} />
            <Dropdown  defaultOption={"פנאי"} options={OptionsFun(handleRandomPages(),handleRandomPost())} classNameSpan_1={stayles.classNameSpan_1} classNameSpan_2={stayles.classNameSpan_2}/>
           
                <div className='my-2 gap-5 mb-8 '>
                    <a  target="_blank" key={`/pages/anime`} href={`/pages/anime`} className ="mt-5 ">
                        <Link target="_blank"  href={`/pages/anime`}>
                            <span className='  pb-4  lg:border-b-4  lg:border-[#5344C1] '>
                                <span className='mx-3 mt-3 border-4 border-indigo-200  border-y-indigo-500 transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-5  cursor-pointer  ' >
                                     אנימות
                                </span>
                            </span>
                        </Link>
                    </a>      
                </div>
                <Dropdown defaultOption={"עלינו"} options={OptionsAbout}  classNameSpan_1={stayles.classNameSpan_1} classNameSpan_2={stayles.classNameSpan_2}/>

                <div className='my-5 gap-5 mb-8'>
                <a target="_blank" key="home" href={`/`} className=' '>
                        <Link target="_blank" key="home" href={`/`}>
                            <span className='pb-4  lg:border-b-4  lg:border-[#5344C1] '>
                                <span className='mx-3  border-4 border-indigo-200  border-y-indigo-500 transition duration-500 ease hover:bg-[#382C8B] inline-block bg-[#4864F6] text-lg font-medium rounded-full text-white px-5  cursor-pointer   ' >
                                    בית
                                </span>
                            </span>
                        </Link>
                    </a>
                </div>


         
                
                <SearchBar /> 
                
            </div>  
        </div>
               
        </>
    )
}





    

export default Toolbar



