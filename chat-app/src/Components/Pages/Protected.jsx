import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../Services/LocalStorage';

function Protected(props) {
    const navigate = useNavigate();
    const {Component} = props;

    let token = getToken();
    useEffect(()=>{   
       if(!token){
        navigate('/login')
       }
       else{
        navigate('/dashboard')
       }
    },[token])
    
    return (
        <div><Component/></div>
    )
}

export default Protected;