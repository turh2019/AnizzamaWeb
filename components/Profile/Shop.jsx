import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Axios from 'axios'
import {editWear,publishAuthor ,getAllItems,buyItem } from '../../services/services'
import { filter } from 'domutils';

import {useStateContext} from  '../../context/StateContext'


import {BoxMessage} from '../getComponents'
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
        classNameSpan_1 :'flex justify-center items-center translate-y-[40%] -translate-x-3 ',
    },
    {
        classNameSpan_1 :' ',
    },
    {
        classNameSpan_1 : '',
    }
]
 

const Shop = () =>{

    const [items,SetItems] = useState([]);
    const [OpenContainer,setOpenContainer] =useState(bodyPart[0]);
    const [openIndexContainer,setOpenIndexContainer] = useState(0);

    const [wear,setWear] = useState([]);

    const [BoxError,setBoxError] = useState("");
    const [openBoxError,setOpenBoxError] = useState(false);


    const [BoxYouSure,setBoxYouSure] = useState("");
    const [openBoxYouSure,setOpenBoxYouSure] = useState(false);


    const [isClickYes,setIsClickYes] = useState(false);

    const {isLogin,profile,HandleLogout} = useStateContext();
    useEffect(() => {
        
        getAllItems().then((result) => {
            SetItems(result)});

    }, [])



    const onClickItem = (bodypart,itemClick) =>
    {
        if(openBoxError|| openBoxYouSure || isClickYes) return
      
        var  foundComment = wear?.find((item) => item.bodyPart === bodypart )
        if(foundComment == null){

            if(!wear ||wear == undefined ){
            
                setWear([itemClick]) 
                return;
            }
           
            setWear([...wear, itemClick]) 
            return;
        }
       
        const newCommentstems = wear.map((item) => item === foundComment ?item =itemClick:item =item )

        setWear(newCommentstems) 
    }


    const onClickItemRemove = (bodypart,itemClick) =>
    {
        if(openBoxError|| openBoxYouSure || isClickYes) return
        var  foundComment = wear?.find((item) => item.bodyPart === bodypart && item.id == itemClick.id)
        var NewWear = wear?.filter((item) => (item.id != foundComment.id))
        setWear(NewWear?NewWear:null ) 
    }


    const onClickBuy =async (cost,buy) =>
    {
        if(openBoxError|| openBoxYouSure || isClickYes) return
        
        if(cost > profile?.mycoins){
            setBoxError("  אין לך מספיק כסף חסר לך - " +(cost - profile.mycoins))
            setOpenBoxError(true);
            return;
        }
        
        setBoxYouSure("  אם אתה בטוח רוצה לקנות את הפריטים האלו?  " + buy.map((item) => (" \n "+ item.cost + " - " + item.name   )))
        setOpenBoxYouSure(true)

      
    }



    const onClickYes = async (items) =>
    {

       
     const work =   items.map((item) => (buyItem({id:profile.id, idItem:item.id, cost:profile.mycoins - item.cost}), profile.mycoins- item.cost)) 
     setBoxError("קנית בהצלחה!")
     setOpenBoxError(true);
     publishAuthor({id:profile.id})

     window.location.assign('/pages/shop')
      return;
    } 
    
    if(isClickYes){
        onClickYes(wear)
        setIsClickYes(false);
    }

    return (
   
     <div className="text-center mt-20 z-10 text-white" dir="rtl">
       
       
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 w-full h-full  '>
            <div className=' h-[500px] w-[110%] bg-main_Inventory border-2 rounded-lg border-Inventory-border mt-10'>

                    <div className ='relative scale-[95%] h-[500px] w-[95%] bg-cover_Inventory border-[1px] rounded-lg border-Inventory-border flex justify-center items-center'>
                        <img src="/bg/profile.png" className='h-[250px]  '/>
                            <div className='absolute inset-0  '>
                                {bodyPart.map((part,index)=> (
                                    wear?.map((item) =>(
                                        item.bodyPart == part.label &&
                                        <div className={stayles[index].classNameSpan_1}>
                                            <img src={item.image.url} className='h-[150px] w-[150px]  '/>
                                            <button className='p-2 w-6 h-10 hover:bg-Inventory-border rounded-lg ' onClick={(e) =>(onClickItemRemove( item.bodyPart ,item))}>x</button>
                                        </div>
                                    ))
                                ))}
                            </div>
                    </div>
            </div> 

            
           <div className=' flex justify-center open:scale-100 scale-0 transition  duration-700 ease  transform' open={profile && wear.length >0}>
            <button  className="transition duration-500 ease hover:bg-cover_bg_color_2 inline-block bg-cover_color text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer mr-5" onClick={(e) => (onClickBuy(wear.map(((item) => (item.cost))),wear))}>לקנות</button>
            <p className="transition duration-500 ease inline-block bg-cover_bg_color_2 text-lg font-medium rounded-lg text-white px-8 py-3 cursor-pointer mr-5 flex justify-center w-[15%]  "><img src="/bg/Coins.png " className = " h-7 w-7  " />:{wear.map(((item) => (item.cost)))}</p>
            </div>
            
            <div className='w-[105%] transition  duration-700 ease  transform  '  >
                    <div className='grid grid-flow-col auto-cols-max flex justify-start  flex-wrap  pr-6 '>
                        {bodyPart.map((part)=> (
                                <div id={part.value} className={part == OpenContainer ? 'h-[45px] w-[50px] text-center bg-cover_bg_color_3 ml-2 rounded-t-lg translate-y-3 z-0 hover:scale-105':' h-[45px] w-[50px] text-center bg-cover_bg_color_3 ml-2 rounded-t-lg  translate-y-4  z-0  hover:translate-y-3 hover:scale-105'} >
                                    <button onClick={ (e)=>(setOpenContainer(part),setOpenIndexContainer(0))}><p className='text-center mt-2'>{part.value}</p></button>
                                </div>
                            ))}
                    </div>

                    <div className=' -z-20  h-[150px] bg-main_Inventory border-2 rounded-lg border-Inventory-border '>
                        <div className ='w-full h-full scale-[95%]  bg-cover_Inventory border-[1px] rounded-lg border-Inventory-border grid md:grid-cols-5 grid-cols-3  grid-rows-4 gap-4 md:scale-100 scale-0  md:visible invisible'>
                            {items?.filter((item) => (item.bodyPart == OpenContainer.label)).filter((item) =>(item.id !=  wear?.map((item) => (item.id)))).filter((item) =>(profile?.inventory?.filter((item_) => (item_.id == item.id)).length <=0 || !profile)). map((item, index)=> (
                                openIndexContainer + 1 >=  (index + 1) / 5  &&  openIndexContainer < (index + 1)  / 5  &&           
                                <span className=' mx-3  my-[17%] h-[80px] w-20 bg-cover_Inventory-button border-2 rounded-lg border-Inventory-border ' id={item.name}>
                                    <button onClick={(e) =>(onClickItem(item.bodyPart,item))}>
                                        <div className='flex justify-center grid grid-cols-1 '>
                                            <p className='flex justify-center'>{item.name}</p>
                                           <div  className = " flex justify-center"> <img src={item.image.url} className = " h-8 w-8 rounded-lg " /></div>
                                            <div className='grid grid-cols-2 flex justify-center'>
                                                <span className='grid grid-cols-2 flex justify-center '> <img src="/bg/Coins.png " className = " h-5 w-5 rounded-lg " />: </span>
                                                <p>{item.cost}</p>
                                            </div>
                                        </div>
                                    </button>
                            </span>))} 
                  
                        </div>
                        <div className='-translate-y-6 flex justify-center  flex-wrap md:visible invisible'>
                            <button className='mx-1' onClick={ (e) => openIndexContainer >= ((items.filter((item) =>(profile?.inventory?.filter((item_) => (item_.id == item.id)).length <=0|| !profile)).filter((item)=> (item.bodyPart == OpenContainer.label)).length  / 5)) ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer + 1)}><p>{"<"}</p></button>
                            <p className='mx-1'>{openIndexContainer}</p>
                            <button className='mx-1'  onClick={ (e) => openIndexContainer <= 0 ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer - 1)}><p>{">"}</p></button>
                        </div>

                        <div className='-translate-y-[95%] flex justify-center  flex-wrap text-witeh visible md:invisible  z-5'>
                            <button className='mx-1' onClick={ (e) => openIndexContainer >= ((items.filter((item) =>(profile?.inventory?.filter((item_) => (item_.id == item.id)).length <=0|| !profile)).filter((item)=> (item.bodyPart == OpenContainer.label)).length  / 3)) ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer + 1)}><p>{"<"}</p></button>
                            <p className='mx-1'>{openIndexContainer}</p>
                            <button className='mx-1'  onClick={ (e) => openIndexContainer <= 0 ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer - 1)}><p>{">"}</p></button>
                        </div>

                        <div className ='w-full h-full scale-[95%]  bg-cover_Inventory border-[1px] rounded-lg border-Inventory-border grid  grid-cols-3  grid-rows-4 gap-4  visible md:invisible -translate-y-[130%] p-3'>
                            {items?.filter((item) => (item.bodyPart == OpenContainer.label)).filter((item) =>(item.id !=  wear?.map((item) => (item.id)))).filter((item) =>(profile?.inventory?.filter((item_) => (item_.id == item.id)).length <=0 || !profile)). map((item, index)=> (
                                openIndexContainer + 1 >=  (index + 1) / 3  &&  openIndexContainer < (index + 1)  / 3  &&           
                                <span className=' mx-3  my-[17%] h-[80px] w-20 bg-cover_Inventory-button border-2 rounded-lg border-Inventory-border  ' id={item.name}>
                                    <button onClick={(e) =>(onClickItem(item.bodyPart,item))}>
                                        <div className='flex justify-center grid grid-cols-1 '>
                                            <p className='flex justify-center'>{item.name}</p>
                                           <div  className = " flex justify-center"> <img src={item.image.url} className = " h-8 w-8 rounded-lg " /></div>
                                            <div className='grid grid-cols-2 flex justify-center'>
                                                <span className='grid grid-cols-2 flex justify-center '> <img src="/bg/Coins.png " className = " h-5 w-5 rounded-lg " />: </span>
                                                <p>{item.cost}</p>
                                            </div>
                                        </div>
                                    </button>
                            </span>))} 
                            

                        </div>
                   
                       
                    </div> 

                   
                </div> 

        </div>
        <div className='flex justify-center '>
            <BoxMessage isOpen ={openBoxError} setIsOpen={setOpenBoxError} Message ={BoxError} onclick/>
            <BoxMessage isOpen ={openBoxYouSure} setIsOpen={setOpenBoxYouSure} Message ={BoxYouSure} setonClickYes = {setIsClickYes}/>
        </div>
       
     </div>
    )

}
   
export default Shop;