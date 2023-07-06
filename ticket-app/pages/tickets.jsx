import React, { useEffect } from 'react'
import Allticket from './admin/AllTickets'
import Header from '../user/Header'
import { useRouter } from 'next/router';
import { getRole, getToken } from '../LocalStorage/localStorageServices'
function tickets() {
  const role=getRole();
  const token=getToken();
  const router=useRouter();
useEffect(()=>{
//    if(role == "user")
//    {
    token && role ? router.push("/tickets"):router.push("/login")
//    }
},[])
  return (
    <div>
      <Header/>
      <div className='container mt-5'>
      <Allticket/>
      </div>
     
    </div>
  )
}

export default tickets
