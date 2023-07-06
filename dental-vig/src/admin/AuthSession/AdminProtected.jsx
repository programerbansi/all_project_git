import { React, useEffect } from 'react';
import { getAdminToken } from '../../services/LocalStorage';
import { useNavigate } from 'react-router';
import { ALL_CATEGORIES, LOGIN } from '../../services/AdminRoutePath';
import { getUserToken } from '../../services/LocalStorageUser';
import swal from 'sweetalert';
import { PROFILE, USER_LOGIN } from '../../services/UserRoutePath';
const AdminProtected = (props) => {

    let adminToken = getAdminToken();
    let userToken = getUserToken();
    const navigate = useNavigate();
    const { Component } = props;

    useEffect(()=>{
        if(!adminToken)
        {
            navigate(LOGIN)
        }
        if(userToken)
        {
          swal({
            icon: "info",
            text: "currently you're logged in user-panel, first logout then login in admin-panel!",  
            // confirmButtonColor: '#0044bb',  
            // closeOnConfirm: false,
            closeOnClickOutside: false,
          }).then(function() {
            navigate(PROFILE)
        });
          // navigate('/');
        }
        // else{
        //     navigate(ALL_CATEGORIES);
        // }
    },[])

  return (
    <>
      <Component/>
    </>
  )
}

export default AdminProtected
