import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Axios from 'axios'
import {updateAuthor ,getAllProfiles,publishAuthor} from '../../services/services'
import {Inventory} from '../getComponents'



const EditProfile = ({Profile}) =>{
    const [details,setdetails] = useState({name:Profile.name,bio:Profile?.bio});
    const [photo,setPhoto] = useState("");
    
    const [photoOBJ,setPhotoOBJ] = useState(false);
    const [profiles, SetProfiles] = useState([])
    const [error,setError] = useState("");
    const [oneTime,SetOneTime]  =useState(false)
    useEffect(() => {

        setdetails({...details,name:Profile.name})
        setdetails({...details,bio:Profile?.bio})
  
   
        setPhoto(Profile?.photoUrl)
     
    }, [])
    
    const  fileSelectedHandler = (e) =>{

        if(!e.target.files[0]) return;
        setPhotoOBJ(e.target.files[0])
        const reader = new FileReader();
        reader.onload =() =>{
            if(reader.readyState === 2){
                setPhoto(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const  sudmitCodeHandler = async () =>{
        if(oneTime == true) return;
        SetOneTime(true);
        if(photoOBJ.name != "")
        {
            const data = new FormData();
            data.append('file',photoOBJ);
            data.append('upload_preset','pyhlnkig');
            
          await Axios.post(
                "https://api.cloudinary.com/v1_1/dsap8pivo/image/upload",
                data
            ).then((respons) =>{
            
                sudmitCodeHandlerCheck(respons.data.url);
            });
        }else{

       
            sudmitCodeHandlerCheck(Profile?.photoUrl);
        }

        sudmitCodeHandlerCheck(photo);
      
       // setPhoto(file?.becure_url)
    

    }

    const  sudmitCodeHandlerCheck = async (photoUrl) =>
    {   
       
        setError(<span className='animate-ping'>טוען...</span> )

        const { name, bio} = details;


      
        if(name == ""){
            SetOneTime(false)
            setError("שם משתמש חסר")
            return;
        }

        if(name == undefined || name == null){
            setdetails({...details,name:Profile.name})
        }

        if(bio == undefined || bio == null){
            if(Profile?.bio == null){
                setdetails({...details,bio:" "})
            }else{
                setdetails({...details,bio:Profile?.bio})
            }

        }


        SetProfiles([])
        if(name != Profile.name){
            await getAllProfiles()
            .then((newProfiles)=>SetProfiles(newProfiles))
      
            var foundProfile = profiles.find((item) => item.name === name )
                
            if(foundProfile)
            {
                setError("שם משתמש תפוס")
                return;
            }
       
        }
        const id = Profile.id
        const commentObj = {
            id,
            name,
            bio,
            photoUrl,
            
        };
        var someting = await updateAuthor(commentObj)
   
        if(someting?.createAuthor?.id == "" ){
            SetOneTime(false)
            setError("יש בעיה");
 
            return;
        }

        var someting = await  publishAuthor(someting.updateAuthor)
        if(someting?.updateAuthor?.id != "" ){
            SetOneTime(false)
            setError("עדכנת את הפרופיל בהצלחה!");
            window.location.assign(`/profile/${name}`)
            return;
        }

    }

    return (
   
     <div className="text-center" dir="rtl">
       <div className=' flex justify-center ' >
       {/* <Inventory Profile = {Profile}  setUp = {oneTime}/> */}

            {
             <div className='grid grid-cols-1  place-items-center inline-block text-lg font-medium rounded-full text-white p-5 w-80 h-80 flex justify-center'   >
             <img src={photo}   className ='rounded-full h-40  w-40  '/>
           <input accept='image/*' type="file" placeholder='תמןנה חדשה'  onChange={ fileSelectedHandler} className ='    text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-700  hover:file:text-violet-50' />     
       </div> }
       </div>
            <div className='m-2 text-center'>
                <p className='flex justify-center p-1 text-white text-center'>:שם</p>
                <input type="text" name='name' id='name' onChange={e => setdetails({...details,name:e.target.value})} value={details.name} placeholder="שם משתמש"   className=" py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-white  bg-cover_color text-white caret-pink-500 " />
            </div>

            <div className='m-2 '>
                    <p className='flex justify-center p-1 text-white'>:ביו</p>
                    <textarea  value={details.bio} onChange={e => setdetails({...details,bio:e.target.value})} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-white bg-cover_color text-white caret-pink-500  " name="comment" placeholder="Comment" />
            </div>  
            {error}
            <div className='m-2 py-3 flex justify-center'>
                <button onClick={(e) => sudmitCodeHandler()}  className='className="transition duration-500 ease hover:bg-[#382C8B] inline-block bg-cover_color text-lg font-medium rounded-full text-white px-7  cursor-pointer "'> שמור</button>
            </div> 
     </div>
   );}
   
   export default EditProfile;

   