import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { getRole, getToken } from '../LocalStorage/localStorageServices'
import Header from '../user/Header'
import Allproject from './admin/AllProject'
function project() {
    const role=getRole();
    const token=getToken();
    const router=useRouter();
useEffect(()=>{
//    if(role == "user")
//    {
      token && role ? router.push("/project"):router.push("/login")
//    }
},[])
    return (
        <div>
            <Header />
            {/* <div className='container-fluid mt-5'> */}
                <Allproject />
            {/* </div> */}

        </div>
    )
}

export default project
