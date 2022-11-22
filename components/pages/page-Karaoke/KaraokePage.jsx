import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Axios from 'axios'


const Karaoke=[
    {
        title:"AoButa Ending Theme (01) with Karaoke and Translation",
        Link:"https://www.youtube.com/embed/PJvKEbVIU-k"
    },  
    {
        title:"Oregairu 3 - OP Karaoke in Hebrew",
        Link:"https://www.youtube.com/embed/AAwOcZZwGdA"
    },
    {
        title:"Ascendance of a Bookworm - Ending Song with Karaoke & Hebrew Subtitles",
        Link:"https://www.youtube.com/embed/gZdnmJ2xOqQ"
    }, 
    {
        title:"Ascendance of a Bookworm - Opening Song with Karaoke & Hebrew Subtitles",
        Link:"https://www.youtube.com/embed/SA4zd9JH0qE"
    },  
    {
        title:"Bokutachi no Remake - ED Karaoke in Hebrew",
        Link:"https://www.youtube.com/embed/m7f0AhUzyrc"
    },
    {
        title:"Bokutachi no Remake - OP Karaoke in Hebrew",
        Link:"https://www.youtube.com/embed/1fG7-Fuud60"
    },
    {
        title: "Wotakoi: Love Is Hard for Otaku Opening Theme with Karaoke and Translation",
        Link: "https://drive.google.com/file/d/1ZlSork9fv3eADlao7tGfDuc-Ssw6_CNN/preview"
    },
    {
        title: "My Teen Romantic Comedy SNAFU Climax! Opening Theme (02) with Karaoke and Translation",
        Link: "https://drive.google.com/file/d/1HSV9N1-qanxexppqCjo6GAs9DDjT9t9F/preview"
    },
    {
        title: "My Hero Academia Season 6 Opening Theme with Karaoke and Translation",
        Link: "https://drive.google.com/file/d/1CVAHUplD3Nqf0rAuNcXJKTT30P-Buvf_/preview"
    },
    {
        title: "AoButa Opening Theme (01) with Karaoke and Translation",
        Link: "https://drive.google.com/file/d/1j4pOrAmtnfVsylOEh6CygUlL5dooK6Bu/preview"
    },
    {
        title: "AoButa Opening Theme (02) with Karaoke and Translation",
        Link: "https://drive.google.com/file/d/1bVNurz8fugxCU1pY_Ba49ba0We_xF6Y-/preview"
    },
    {
        title: "AoButa Ending Theme (01) with Karaoke and Translation (Mai Sakurajima)",
        Link: "https://drive.google.com/file/d/13FB9OY_KlnkScVEef2x4L3NyTH7REFmk/preview"
    },
    {
        title: "AoButa Ending Theme (02) with Karaoke and Translation (Tomoe Koga)",
        Link: "https://drive.google.com/file/d/1ragTbqzoL9jPjkpHQbaL-bwYTel0sdsD/preview"
    },
    {
        title: "AoButa Ending Theme (03) with Karaoke and Translation (Rio Futaba)",
        Link: "https://drive.google.com/file/d/166dDJT9AWoQTO2UhgIHkPczpmSaQm4ml/preview"
    },
    {
        title: "AoButa Ending Theme (04) with Karaoke and Translation (Nodoka Toyohama)",
        Link: "https://drive.google.com/file/d/1cRkuKZvI_CJ_5Mk71rf6O99bwfK5cuoQ/preview"
    },
    {
        title: "AoButa Ending Theme (05) with Karaoke and Translation (Kaede Azusagawa)",
        Link: "https://drive.google.com/file/d/1K_KDSHXjSSRuVDMA7kPB3r9BrIRhHt0l/preview"
    },
    {
        title: "AoButa Ending Theme (06) with Karaoke and Translation",
        Link: "https://drive.google.com/file/d/1iDflqaBhoVblKBYUD-HX3ya74yF95pB-/preview"
    },
    {
            title: "My Hero Academia Season 6 Ending Theme with Karaoke and Translation",
            Link: "https://drive.google.com/file/d/1Xib2RaioNqJCjy9rKEPlCRwHRsnTLhWI/preview"
    },
    {
            title: "Wotakoi: Love Is Hard for Otaku Ending Theme with Karaoke and Translation",
            Link: "https://drive.google.com/file/d/1PEiUKrWox1tXjt9zC4gkXjSg-T1FwZXz/preview"
    },
    {
            title: "My Teen Romantic Comedy SNAFU Climax! Ending Theme with Karaoke and Translation",
            Link: "https://drive.google.com/file/d/1j26ORQ_SD75XyZc0ElSZLgueZDPSStt-/preview"
    },
    {
        title: "AoButa Insert Song with Karaoke and Translation",
         Link: "https://drive.google.com/file/d/1h13BIZsP6uX2MqoGquNbBSl2EPn1OrM8/preview"
    },
  ]



 

const FAQ = () =>{
    return (
   
     <div className=" mt-8 z-10 text-white bg-cover_bg_color rounded-lg" dir="rtl">
        <h1 className='text-center p-3 mt-2  mx-8 mb-7 font-extrabold text-2xl border-b-2 '>פינת קריוקי</h1>

        
        <div className=' '>
            {Karaoke.map((item) => (
                <div class=" mx-auto p-5">
                    <details class="transition transform ease-in-out  open:bg-slate-900 bg-opacity-25	open:bg-opacity-25 bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg " open>
                        <summary class=" text-sm  leading-6 text-slate-900 dark:text-white font-semibold select-none">
                            {item.title}
                        </summary>
                        <div class="my-5 text-sm  leading-6 text-slate-900 dark:text-white  select-none">
                        <iframe src={item.Link} allowfullscreen="true" Optio  allow="autoplay" className='  w-full h-full aspect-video bg-red rounded-lg'  playIcon={<button>Play</button>}></iframe>           
                        </div>
                    </details>
                </div>
            ))}
        </div>
     </div>
    )

}
   
export default FAQ;