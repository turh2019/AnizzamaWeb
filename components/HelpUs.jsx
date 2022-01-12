import React,{useState,useEffect} from 'react';
import Link from 'next/link'
import {getCategories} from '../services/services'
import { getJobs, getPostDetails } from '../services/services';
import Image from 'next/image';

function HelpUs() {
    const [authors, setAuthors] = useState([])
 
   

    useEffect(() =>{
        getJobs()
        .then((newAuthor)=>setAuthors(newAuthor))
    },[])
 
  
    return (
        <div className ="bg-[#261D78] text-white shadow-lg rounded-lg p-8 mb-8 pb-12 text-center " dir="rtl">
                  <h3 className="text-xl mb-8 font-semibold border-b pb-4 flex justify-center  rtl:mr-3 open:bg-white" >
                      דרושים!
                  </h3>
                  <h3 className="text-xl mb-8  text-center rtl:mr-3">
                 שלום, כרגע חסר לנו המון צוות, אז אם אתם רוצים לתמוך בנו ולעזור לנו בהוצאת הפרקים,
                אנחנו יותר מנשמח אם תגישו טופס בחינה !
                 </h3>
                    <h3 className="text-xl mb-8  text-center rtl:mr-3">
                    כדי להבחן תצטרכו להכנס לשרת הדיסקורד שלנו, ולפתוח טופס בחדר "🎫┆ᴛickets". לאחר-מכן, אנחנו נבחן אותכם. ואם צריך, גם נלמד אותכם!

                    </h3>
                    <h3 className="text-xl mb-8  text-center rtl:mr-3" >
                    שימו לב! כרגע אנחנו חייבים עורך לשוני, אם אתם מתאימים, בבקשה, תבחנו!
                    </h3>
                  
               
                </div>
    )
}

export default HelpUs