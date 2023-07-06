import React, { createContext, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import Loading from '../admin/Loading';
import { auth } from '../firebase/firebase-config';
import Router from 'next/router';
export const valAuthContext =createContext();

const AuthProvider = ({children})=>{

    const [loading,setLoading]=useState(true);
    const [toggle,setToggle]=useState(true);
    const[sidebarSize,setsidebarSize]=useState("lg");
    const[showModal,setShowModel]=useState(false);
    const[urls,setUrls]=useState([]);
    const [tdesc,setTdesc]=useState('')
    
    onAuthStateChanged(auth,()=>{
        setLoading(false);
    })

    if(loading)
    {
        return <Loading/>
    }

    return <valAuthContext.Provider value={{tdesc,setTdesc,urls,setUrls,toggle,setToggle,loading,sidebarSize,setsidebarSize,showModal,setShowModel}}>{children}</valAuthContext.Provider>
}

export default AuthProvider