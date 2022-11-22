import React,{useState,useEffect} from 'react';
import { SearchBar  } from '../getComponents';
import {getPages,GetRandomPost,GetRandomSeries } from '../../services/services'
import Link from 'next/link'
import Dropdown from './Dropdown';
import { ShowCharacter } from '../getComponents';
import {useStateContext} from  '../../context/StateContext'
const OptionsAbout =[
    {OptionName:"דרושים", href:`/team/jobs`, to:``,target:``},
    {OptionName:"אודות", href:`/team/about`, to:``,target:``},
    {OptionName:"צוות", href:`/pages/team`, to:``,target:``},
    {OptionName:"שאלות נפוצות", href:`/pages/frequently-asked-question`, to:``,target:``},
]

const OptionsFun = (randomSeries, randomPost) => [
    {OptionName:"סדרה רנדומלית", href:`/series/` + randomSeries.slug , to:``,target:``},
    {OptionName:"פוסט רנדומלי", href:`/post/` + randomPost.slug , to:``,target:``},
    {OptionName:"פינת קריוקי", href:`/pages/karaoke`, to:``,target:``},
    {OptionName:"עמוד מידע", href:`/post/information`, to:``,target:``},
    //{OptionName:"המלצות", href:`/page/`},
    //{OptionName:"סקרים", href:`/page/`},
]


const OptionsMore =[
   // {OptionName:"עידכונים", href:`/page/`},
   // {OptionName:'לו"ז', href:`/page/`},
    {OptionName:'שת"פ', href:`/pages/cooperation` , to:``,target:``},
    {OptionName:'תגים', href:`/pages/tags `, to:`tags`,target:``}

]

const stayles ={
    classNameSpan_1 : '  ',
    classNameSpan_2_1 : ' mx-3 open:scale-100 scale-0 hover:delay-[0ms] open:translate-x-[0] translate-x-[135px] transition duration-700 delay-[250ms] ease transform  hover:-translate-x-[10px] flex justify-center  border-indigo-200  border-y-indigo-500  inline-block  text-[22px] font-medium  text-white px-5 cursor-pointer ',
    classNameSpan_2_2 : 'mx-3 open:scale-100 scale-0 hover:delay-[0ms] open:translate-x-[0] translate-x-[135px] transition duration-700 delay-[250ms] ease transform  hover:-translate-x-[10px] flex justify-center  border-indigo-200  border-y-indigo-500  inline-block  text-[22px] font-medium  text-white px-5 cursor-pointer  ',
    classNameSpan_2_3 : 'mx-3 open:scale-100 scale-0 hover:delay-[0ms] open:translate-x-[0] translate-x-[135px] transition duration-700 delay-[250ms] ease transform  hover:-translate-x-[10px] flex justify-center  border-indigo-200  border-y-indigo-500  inline-block  text-[22px] font-medium  text-white px-5 cursor-pointer  ',
}
 


const Toolbar = ({isOpen ,SetOpenNav})  => {
    
    const [pages, setPages] = useState([]);
    const [randomSereis, setRandomSereis] = useState([]);
    const [randomPost, setRandomPost] = useState([]);
    const [profileShow,SetProfileShow] = useState(false);
    const {isLogin,profile,HandleLogout} = useStateContext();
    
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
            <div id ="head" className=' my-3'>
                <div className=' grid gap-5 flex flex-wrap   rounded-full border-indigo-200  border-y-indigo-500  shadow-indigo-500/50 flex justify-center ' >   
                    {isLogin && 
                        <div className='transition  open:scale-100 scale-0 open:translate-x-[0] translate-x-[135px] transition  duration-700 delay-[50ms] ease transform hover:duration-700  hover:scale-110  px-1 relative grid grid-cols-1 mb-5  place-items-center place-content-center flex flex-wrap text-white ' onReset={e=>SetProfileShow(false)} onMouseLeave ={e=>SetProfileShow(false)} onMouseEnter ={e=>SetProfileShow(true)} onClick={e=>SetProfileShow(true)}  open={isOpen}>
                        
                  
                        <div className='border-[1px] p-2 open:bg-cover_color fixed right-[110px] mb-6 open:scale-100  scale-0  absolute transition  duration-300 ease-in-out grid grid-flow-row-dense rounded-lg  -z-5' open={profileShow}>
                        {profileShow&&    <button onClick={(e)=>(HandleLogout())}  className =" " > התנתקות</button>}
                        </div>
                      
                             <a href={`/profile/${profile?.name}`}>
                                <div onClick={ (e) => SetOpenNav(false)} className=' place-items-center   border-4 border-indigo-200  border-y-indigo-500 transition duration-500 ease hover:bg-cover_bg_color_2 inline-block bg-cover_bg_color text-lg font-medium rounded-full text-white   cursor-pointer    z-40'   >
                                { <img src={profile?.photoUrl}  className ='object-fill object-cover  h-20 w-20 rounded-full'/> }
                                    <div className=''>
                                   
                                        {/* <ShowCharacter wear ={profile.wear} /> */}
                                    </div>
                                    
                                    
                                </div>
                                <h1 className='mt-2'>{profile?.name}</h1>
                            </a>
                            
                    </div>}
                    <div className='  bg-black bg-opacity-20 p-1 mt-[10px] open:mt-0' open= {isLogin}>
                        <a target="_blank" key="home" href={`/`} className=' ' onClick={ (e) => SetOpenNav(false)}>
                            <Link target="_blank" key="home" href={`/`}>
                                <span className='pb-4  '>
                                    <span className='mx-3 open:scale-100 scale-0 hover:delay-[0ms] open:translate-x-[0] translate-x-[135px] transition duration-700 delay-[250ms] ease transform  hover:scale-110  flex justify-center  border-indigo-200  border-y-indigo-500  inline-block  text-[22px] font-medium  text-white px-5 cursor-pointer  ' open={isOpen}>
                                        בית
                                    </span>
                                </span>
                            </Link>
                        </a>
                    </div>
                     

                    <div className=' '>
                        <a  target="_blank" key={`/pages/anime`} href={`/pages/anime`} className ="mt-5 " onClick={ (e) => SetOpenNav(false)}>
                            <Link target="_blank"  href={`/pages/anime`}>
                                <span className='flex justify-center  lg:border-[#5344C1] bg-black bg-opacity-20 p-1'>
                                    <span className='mx-3 open:scale-100 scale-0 hover:delay-[0ms] open:translate-x-[0] translate-x-[135px] transition duration-700 delay-[250ms] ease transform  hover:scale-110  flex justify-center  border-indigo-200  border-y-indigo-500  inline-block  text-[22px] font-medium  text-white px-5 cursor-pointer  ' open={isOpen} >
                                        אנימות
                                    </span>
                                </span>
                            </Link>
                        </a>      
                    </div>


                    <Dropdown defaultOption={"< עלינו"} options={OptionsAbout}  classNameSpan_1={stayles.classNameSpan_1} classNameSpan_2={stayles.classNameSpan_2_1} open={isOpen} SetOpen = {SetOpenNav}/>
                    <Dropdown  defaultOption={"< פנאי"} options={OptionsFun(handleRandomPages(),handleRandomPost())} classNameSpan_1={stayles.classNameSpan_1} classNameSpan_2={stayles.classNameSpan_2_2} open={isOpen} SetOpen ={SetOpenNav}/>
                    <Dropdown  defaultOption={"< עוד"} options={OptionsMore} classNameSpan_1={stayles.classNameSpan_1} classNameSpan_2={stayles.classNameSpan_2_3}  open={isOpen} SetOpen = {SetOpenNav}/>
                    {/* <div className='bg-black bg-opacity-20 p-1 '>
                        <a  target="_blank" key={`/pages/shop`} href={`/pages/shop`} className ="mt-5 " onClick={ (e) => SetOpenNav(false)}>
                            <Link target="_blank"  href={`/pages/shop`}>
                                <span className='flex justify-center  lg:border-[#5344C1] '>
                                    <span className='mx-3 open:scale-100 scale-0 hover:delay-[0ms] open:translate-x-[0] translate-x-[135px] transition duration-700 delay-[250ms] ease transform  hover:scale-110  flex justify-center  border-indigo-200  border-y-indigo-500  inline-block  text-[22px] font-medium  text-white px-5 cursor-pointer   ' open={isOpen} >
                                        חנות
                                    </span>
                                </span>
                            </Link>
                        </a>      
                    </div> */}
                </div>  
            </div>     
        </>
    )
}





    

export default Toolbar



