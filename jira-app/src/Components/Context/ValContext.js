import React ,{createContext,useEffect,useState} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth } from '../../Services/firebase';
import Loading from '../Pages/AuthPages/Loading';

export const ValAuthContext = createContext();

const AuthProvider = ({children})=>{

    const [loading,setLoading] = useState(true);
    const [toggle,setToggle] = useState(true);

    onAuthStateChanged(auth,(user)=>{
        setLoading(false);
    })
    

    if(loading)
    {
        return <Loading/>
    }
    
    return <ValAuthContext.Provider value={{toggle,setToggle,loading}}>{children}</ValAuthContext.Provider>
}
export default AuthProvider