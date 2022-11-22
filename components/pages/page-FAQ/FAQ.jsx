import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import Axios from 'axios'


const questionAndAnswers=[
    {
        question:"כמה אתם בצוות? & מתי הוקמתם?",
        Answers:( <div>  <p>הפאנסאב נוצר בתאריך "11/19/2021". בהתחלה היינו בצוות רק אני  (אביתר) ואורי אך עם הזמן הצטרפו עוד ועוד אנשים. הצוות החתיך שלנו זמין לראווה <a href="/pages/team" >בעמוד הצוות.</a></p></div>)
    },
    {
        question:"איך חשבתם להקים פאנסאב?",
        Answers:`אם לומר את האמת, שכחתי.`
    },
    {
        question:"היכן אתם גרים, בני כמה אתם וכו",
        Answers:"שלום, הגעתי למשטרה?"
    },
    {
        question:"מתי אתם מוציאים פרקים?",
        Answers:`אנחנו לא. אבל אנחנו משתדלים להעלות פרק לפחות אחת לשבועיים. לזמנים ספציפיים יותר, אנא בקרו בחדר ה"Schedule" שבשרת הדיסקורד שלנו.`
    },
    {
        question:"למה אתם מתעכבים הרבה פעמים בהוצאת הפרקים?",
        Answers:"בגלל נסיבות החיים, חוסר מוטיבציה, חיי חברה, משפחה, עיסוקים, תחביבים, ניהול לא יעיל וכהנה וכהנה"
    },
    {
        question:"תוכלו לתרגם את X?",
        Answers:`אם אתם רוצים שנתרגם איזושהי סדרה, אנא שלחו לנו את שם הסדרה באנגלית או ברומאג'י בחדר "Suggestions". רק תנו לי להודיע מראש שהלו"ז שלנו תפוס מכאן ועד להודעה חדשה...`
    },
    {
        question:"למה אתם מעלים את Y כש-Z לא נגמר?",
        Answers:`מכל מיני סיבות. המרכזיות הן: וויבים, בשביל לא לחנוק את הצופים של Y, כדי שלא יצטבר עומס בסדרה אחת, בגלל שכבר תיכננו לו"ז לזמן הרחוק וכהנה וכהנה.`
    },
    {
        question:"איך מצטרפים לסאב?",
        Answers:(<div><p>נא בדקו את <a href="/team/jobs">עמוד הדרושים</a></p></div>)
    },
    {
        question:"האם אתם מרווחים כסף והאם אתם מקבלים תרומות?",
        Answers:"הלוואי."
    }
  ]



 

const FAQ = () =>{



    return (
   
     <div className=" mt-8 z-10 text-white bg-cover_bg_color rounded-lg" dir="rtl">
        <h1 className='text-center p-3 mt-2  mx-8 mb-7 font-extrabold text-2xl border-b-2 '>שאלות נפוצות</h1>

        <h2 className='   mx-8 mb-7 text-lg   float-right mb-10 ' dir="rtl"> בעמוד זה ניתן מענה לשאלות חוזרות שאנחנו מקבלים. מומלץ לעיין בעמוד זה לפני שאלת שאלה.</h2>
        <div className='mt-[65px] '>
            {questionAndAnswers.map((item) => (
                <div class=" mx-auto px-5 py-2">
                    <details class="transition transform ease-in-out  open:bg-slate-900 bg-opacity-25	open:bg-opacity-25 bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg " open ={false}>
                        <summary class=" text-sm  leading-6 text-slate-900 dark:text-white font-semibold select-none">
                            {item.question}
                        </summary>
                        <div class="mt-3 text-sm  leading-6 text-slate-900 dark:text-white  select-none">
                            <p>{item.Answers}</p>
                        </div>
                    </details>
                </div>
            ))}
        </div>
     </div>
    )

}
   
export default FAQ;