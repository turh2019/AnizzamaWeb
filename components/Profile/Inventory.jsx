import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Axios from 'axios'
import {editWear ,getAllProfiles,publishAuthor, updateAuthor} from '../../services/services'
import { filter } from 'domutils';


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
        classNameSpan_1 :'flex justify-center items-center translate-y-[5%] md:translate-y-[40%]  ',
    },
    {
        classNameSpan_1 :' ',
    },
    {
        classNameSpan_1 : '',
    }
]
 

const Inventory = ({Profile, setUp}) =>{

    
    const [OpenContainer,setOpenContainer] =useState(bodyPart[0]);
    const [openIndexContainer,setOpenIndexContainer] = useState(0);
    const [openInventory,setOpenInventory] = useState(false);
    const [wear,setWear] = useState(Profile.wear);
    const [oneTime,setOneTime] = useState(false);

    const onClickItem = (bodypart,itemClick) =>
    {
      
        var  foundComment = wear.find((item) => item.bodyPart === bodypart )
        if(foundComment == null){

            setWear([...wear,{ itemClick}]) 
          
            return;
        }
       
        const newCommentstems = wear.map((item) => item === foundComment ?item =itemClick:item =item )

        setWear(newCommentstems) 
    }


    const onClickSave =async () =>
    {
        
       
        const newCommentstems = wear.filter((item) => Profile.wear.filter((item_) => item.bodyPart == item_.bodyPart)[0].name != item.name )
        const wear_2  =await  newCommentstems.map((item) => (SendInvtory(item.id, Profile.wear.filter((item_) =>( item_.bodyPart == item.bodyPart)).length > 0, Profile.wear.filter((item_) =>( item_.bodyPart == item.bodyPart))[0].id) ))
        Profile.wear = wear;
        console.log(Profile.wear)
        console.log(wear);

        
        const commentObj = {
           id:Profile.id
        };



        publishAuthor(commentObj)
    }


    const SendInvtory = (idItem,iHave,wearIdItem) =>
    {
        const id =Profile.id
        const commentObj = {
            idItem,
            iHave,
            wearIdItem,
            id
        };
        editWear(commentObj);
        console.log({commentObj})

    }

    if(setUp == true &&  oneTime == false){
        setOneTime(true);
        console.log("somting");
        onClickSave()
    }

    return (
   
     <div className="text-center " dir="rtl">
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full  '>
            <div className=' h-[400px] md:h-[500px] md:w-[110%] w-[125%] bg-main_Inventory border-2 rounded-lg border-Inventory-border mt-10 md:-translate-x-[46%] md:open:translate-x-4 md:open:translate-x-6 translate-x-6 transition  duration-700 ease  transform  ' open ={openInventory}>
                <button onClick={(e) => (setOpenInventory(!openInventory))} className =" items-center float-left translate-y-[1000%] m-1 hover:scale-125 ">{openInventory ?'<':'>'}</button>
                <div className ='relative scale-[95%] h-[400px] md:h-[500px] md:w-[95%]  bg-cover_Inventory border-[1px] rounded-lg border-Inventory-border flex justify-center items-center '>
                    <img src="/bg/profile.png" className='h-[250px]  '/>
                        <div className='absolute inset-0  '>
                            {bodyPart.map((part,index)=> (
                                wear.map((item) =>(
                                    item.bodyPart == part.label &&
                                    <div className={stayles[index].classNameSpan_1}>
                                        <img src={item.image.url} className='h-[150px] w-[150px]  '/>
                                    </div>
                                ))
                            ))}
                            
                        </div>
                </div>
            </div> 
            <div className='open:scale-100 transition  duration-700 ease  transform scale-0 -translate-x-[50%] open:-translate-x-3 ' open ={ openInventory} >
                    <div className='grid grid-flow-col auto-cols-max flex justify-start  flex-wrap  mr-4'>
                        {bodyPart.map((part)=> (
                                <div id={part.value} className={part == OpenContainer ? 'h-[45px] w-[50px] text-center bg-cover_bg_color_3 ml-2 rounded-t-lg translate-y-3 z-0 hover:scale-105':' h-[45px] w-[50px] text-center bg-cover_bg_color_3 ml-2 rounded-t-lg  translate-y-4  z-0  hover:translate-y-3 hover:scale-105'} >
                                    <button onClick={ (e)=>(setOpenContainer(part),setOpenIndexContainer(0))}><p className='text-center mt-2'>{part.value}</p></button>
                                </div>
                            ))}
                    </div>

                    <div className=' -z-20 h-[0px] md:h-[520px] bg-main_Inventory border-2 rounded-lg border-Inventory-border md:scale-100 scale-0   md:visible invisible' >
                        <div className ='w-full h-full scale-[95%]  bg-cover_Inventory border-[1px] rounded-lg border-Inventory-border grid md:grid-cols-3 grid-cols-2 grid-rows-4 gap-4 -translate-y-2  '>
                            {Profile.inventory.filter((item) => (item.bodyPart == OpenContainer.label)).filter((item) =>(wear.filter((item) =>( item.bodyPart == OpenContainer.label)).length > 0 && wear.filter((item) =>( item.bodyPart == OpenContainer.label))[0].name != item.name)). map((item, index)=> (
                                openIndexContainer + 1 >=  (index + 1) / 12  &&  openIndexContainer < (index + 1)  / 12  &&           
                                <span className=' mx-3 my-3 h-[80px] md:w-20 w-20 bg-cover_Inventory-button border-2 rounded-lg border-Inventory-border ' id={item.name}>
                                    <button onClick={(e) =>(onClickItem(item.bodyPart,item))}>
                                        <div>
                                            <p>{item.name}</p>
                                            <img src={item.image.url} className = "mt-1 h-10 w-10 rounded-lg" />
                                        </div>
                                    </button>
                            </span>))} 
                              
                        </div>
                        <div className='-translate-y-5 flex justify-center  flex-wrap '>
                            <button className='mx-1' onClick={ (e) => openIndexContainer >= ((Profile.inventory.filter((item)=> (item.bodyPart == OpenContainer.label)).length  / 12)) ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer + 1)}><p>{"<"}</p></button>
                            <p className='mx-1'>{openIndexContainer}</p>
                            <button className='mx-1'  onClick={ (e) => openIndexContainer <= 0 ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer - 1)}><p>{">"}</p></button>
                        </div>
                       
                    </div> 


                    <div className=' -z-20 w-[280px] md:h-[0px] h-[520px] bg-main_Inventory border-2 rounded-lg border-Inventory-border  md:scale-0 scale-100 translate-x-[15%] ' >
                        <div className ='w-full h-full scale-[95%]  bg-cover_Inventory border-[1px] rounded-lg border-Inventory-border grid md:grid-cols-3 grid-cols-2 grid-rows-4 gap-4 -translate-y-2 '>
                            {Profile.inventory.filter((item) => (item.bodyPart == OpenContainer.label)).filter((item) =>(wear.filter((item) =>( item.bodyPart == OpenContainer.label)).length > 0 && wear.filter((item) =>( item.bodyPart == OpenContainer.label))[0].name != item.name)). map((item, index)=> (
                                openIndexContainer + 1 >=  (index + 1) / 10  &&  openIndexContainer < (index + 1)  / 10  &&           
                                <span className=' mx-3 my-3 h-[80px] md:w-20 w-20 bg-cover_Inventory-button border-2 rounded-lg border-Inventory-border ' id={item.name}>
                                    <button onClick={(e) =>(onClickItem(item.bodyPart,item))}>
                                        <div>
                                            <p>{item.name}</p>
                                            <img src={item.image.url} className = "mt-1 h-10 w-10 rounded-lg" />
                                        </div>
                                    </button>
                            </span>))} 
                              
                        </div>
                        <div className='-translate-y-5 flex justify-right  flex-wrap'>
                            <button className='mx-1' onClick={ (e) => openIndexContainer >= ((Profile.inventory.filter((item)=> (item.bodyPart == OpenContainer.label)).length  / 10)) ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer + 1)}><p>{"<"}</p></button>
                            <p className='mx-1'>{openIndexContainer}</p>
                            <button className='mx-1'  onClick={ (e) => openIndexContainer <= 0 ? setOpenIndexContainer(0) : setOpenIndexContainer(openIndexContainer - 1)}><p>{">"}</p></button>
                        </div>
                       
                    </div> 

                    
                </div>                        
        </div>
     </div>
    )

}
   
export default Inventory;