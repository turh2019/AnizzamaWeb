import React,{useContext,useState,useEffect, createContext} from "react";
import { getAllProfiles,GetmyProfileSlug  } from '../services/services';
import { useRouter } from 'next/router';
const Context = createContext();

export const StateContext = ({children}) =>{

    const router =useRouter();
    if(router.isFallback){
     return <Loader />
    }
   
    const [isLogin, setIsLogin] = useState(false)
    const [profile,setProfile] = useState()

  
    const [profileData, setProfileData] = useState({ name: "", password: ""});



    useEffect(() => {
        if(window.localStorage.getItem("isLogin"))
        {
            HandleLogin(window.localStorage.getItem('name'),window.localStorage.getItem('password'))
        }
     
    }, [])


    const  HandleLogin = async(name ,password) =>{
        window.localStorage.setItem('name', name);
        window.localStorage.setItem('password', password);

        var foundProfile = await GetmyProfileSlug(name ,password)

        if(foundProfile[0])
        {
            setIsLogin(true);
            window.localStorage.setItem('isLogin', true);
            setProfile(foundProfile[0]);
            return foundProfile;

        }else
        {

            window.localStorage.removeItem('isLogin');
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('password');
            setIsLogin(false);
            return null;
        }
    }

    const  HandleLogout = () =>{
        window.localStorage.removeItem('isLogin');
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('password');
        setIsLogin(false);
        setProfile(null);
        window.location.assign('/');
    }

 return(
    <div className="  ">
            <Context.Provider 
            value={{
                isLogin,
                setIsLogin,
                profile,
                HandleLogout,
                setProfile,
                HandleLogin,
            }}>
                {children}
            </Context.Provider>
    </div>
 )
}
export const useStateContext  = () => useContext(Context);