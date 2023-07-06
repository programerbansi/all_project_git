import React, { useEffect } from 'react'
import { getRole, getToken } from '../../LocalStorage/localStorageServices'
import { useRouter } from 'next/router'
import Layout from '../../admin/layout';
function index() {
    const role=getRole();
    const token=getToken();
    const router=useRouter();
    useEffect(()=>{
        token && role ? role=="admin"?router.push('/admin'):router.push('/'):router.push('/admin/login');
    },[])
  return (
    // <div>index</div>
    <Layout/>
    
  )
}

export default index