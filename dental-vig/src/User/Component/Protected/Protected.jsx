import React, { useEffect } from 'react'
import { getLoggedInUser, getUserRole, getUserToken } from '../../../services/LocalStorageUser'
import { useNavigate, useLocation } from "react-router-dom";
import { AD_POST, PROFILE, USER_REGISTER, BOOKMARK, USER_LOGIN, USER_SIGNUP, MY_ADS, DASHBOARD, DETAIL_PAGE } from '../../../services/UserRoutePath';
import { getAdminToken } from '../../../services/LocalStorage';
import swal from 'sweetalert';
import { LOGIN } from '../../../services/AdminRoutePath';
const Protected = ({ Component, path }) => {

  let token = getUserToken();
  let admin_token = getAdminToken();
  let user = getLoggedInUser();
  let role = getUserRole();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        (role == "user") || !user ? navigate("/") : navigate(USER_SIGNUP)
        break;
      case AD_POST:
        role == "user" && token ? navigate(AD_POST) : navigate(USER_SIGNUP)
        break;
      case PROFILE:
        role == "user" && token ? navigate(PROFILE) : navigate(USER_SIGNUP)
        break;
      case BOOKMARK:
        role == "user" && token ? navigate(BOOKMARK) : navigate(USER_SIGNUP)
        break;
      case DASHBOARD:
        role == "user" && token ? navigate(DASHBOARD) : navigate(USER_SIGNUP)
        break;
      case MY_ADS:
        role == "user" && token ? navigate(MY_ADS) : navigate(USER_SIGNUP)
        break;
      case USER_REGISTER:
        role == 'user' && token ? navigate('/') : navigate(USER_LOGIN)
        break;
      case USER_SIGNUP:
        role == "user" && token ? navigate("/") : navigate(USER_SIGNUP);
        break;
      case USER_LOGIN:
        (role == "user" && token) ? navigate("/") : navigate(USER_LOGIN);
        break;
      default:
        break;
    }
    if (admin_token && (location.pathname == USER_LOGIN || USER_SIGNUP || USER_REGISTER)) {
      swal({
        icon: "info",
        text: "currently you're logged in admin-panel, first logout then login in user-panel!",
      
        closeOnClickOutside: false,
      }).then(function () {
        navigate(LOGIN)
      });
      if (!token) {
        navigate("/")
      }
    }
  }, [])
  return (
    <>
      <Component />
    </>
  )
}

export default Protected