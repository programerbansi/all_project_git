import { useContext } from "react";
import { LOGIN } from "../../services/AdminRoutePath";
import { removeAdminToken, storeAdminToken } from "../../services/LocalStorage";
import { removeLoggedInUser, removeUserRole, removeUserToken ,removeMobileNo,removeSendMobile} from "../../services/LocalStorageUser";
import client from "../client";

export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
export const GET_SUB_CATEGORY_LIST = 'GET_SUB_CATEGORY_LIST';
export const GET_BRAND_LIST = 'GET_BRAND_LIST';
export const GET_TAG_LIST = 'GET_TAG_LIST';
export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_TYPE_LIST = 'GET_TYPE_LIST';
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER = 'GET_USER';
export const GET_ADVERTISE_LIST = 'GET_ADVERTISE_LIST';
export const GET_REPORTED_ITEMS = 'GET_REPORTED_ITEMS';
export const GET_CONTACT_ITEMS = 'GET_CONTACT_ITEMS';
export const REPLY_OF_CONTACT_US = 'REPLY_OF_CONTACT_US';
export const ADD_SUBCATEGORY = 'ADD_SUBCATEGORY';
export const ADD_BRAND_TO_BRANDLIST = 'ADD_BRAND_TO_BRANDLIST';
export const ADD_CATEGORY_TO_CATEGORYLIST = 'ADD_CATEGORY_TO_CATEGORYLIST';
export const ADD_TAG_TO_TAGLIST = 'ADD_TAG_TO_TAGLIST';
export const ADD_TYPE_TO_TYPELIST = 'ADD_TYPE_TO_TYPELIST';
export const ADD_ADVERTISE = 'ADD_ADVERTISE';

export const DELETE_BRAND = 'DELETE_BRAND';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_TAG = 'DELETE_TAG';
export const DELETE_TYPE = 'DELETE_TYPE';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_ADVERTISE = 'DELETE_ADVERTISE';
export const DELETE_SUB_CATEGORY = 'DELETE_SUB_CATEGORY';

export const UPDATE_BRAND = 'UPDATE_BRAND';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_SUB_CATEGORY = 'UPDATE_SUB_CATEGORY';
export const UPDATE_TAG = 'UPDATE_TAG';
export const UPDATE_TYPE = 'UPDATE_TYPE';
export const UPDATE_ADVERTISE = 'UPDATE_ADVERTISE';

export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT';

export const APPROVE_AD = 'APPROVE_AD';

// *********************************************** Admin-LogIn-LogOut **********************************************************

export const adminLogin = (obj, navigate, setLoading, setMessage, setError, setStatus) => (dispatch) => {
  client.post('login', obj).then((res) => {
    storeAdminToken(res.data.access_token);
    dispatch({
      type: ADMIN_LOGIN,
      payload: res.data
    })
    setLoading(false);
    setMessage('Login Success !');
    setError(false);
    setStatus(true);
    navigate('/admin/all-categories');
  }).catch((error) => {
    setLoading(false);
    setError(true);
    setStatus(true);
    setMessage(error.response.data.message)
    console.log(error);
  })
}

export const adminLogout = (adminToken, navigate) => (dispatch) => {
  client.post('logout', adminToken).then((res) => {
    dispatch({
      type: ADMIN_LOGOUT,
      payload: res.data
    });
    navigate(LOGIN);
    removeAdminToken();
  }).catch((error) => {
    console.log(error, '============================')
  })
}
// *********************************************** Get **********************************************************
export const getDataList = (gurl,gtype,setOpenLoader) => (dispatch) => {
  setOpenLoader(true);
  client.get(gurl).then((res) => {
    setOpenLoader(false);
    dispatch({
      type: gtype,
      payload: res.data.data.data ? res.data.data.data : res.data.data,
      lastPage: res.data.data.last_page
    })
  }).catch((error) => {
    setOpenLoader(false);
  })
};


export const replyOfContactUs = ( obj, currentPage, setMessage, setError, setStatus, setOpenLoader) => (dispatch) => {
  setOpenLoader(true);
  client.post(`admin/contact_us_reply`,obj).then((res) => {
    setOpenLoader(false);
    dispatch({type: REPLY_OF_CONTACT_US});
    setMessage('reply sent successfully !');
    setError(false);
    setStatus(true);
  }).catch((error)=>{
    setOpenLoader(false);
  })
}

// ************************************************ Add **********************************************************
export const curdData=(dataObj,url,type,gurl,gtype,msg,setMessage, setError, setStatus, setOpenLoader) => (dispatch) => {
  setOpenLoader(true);
  client.post(url, dataObj).then((res) => {
    setOpenLoader(false);
    dispatch({
      type: type,
      payload: res.data.data,
    });
    dispatch(getDataList(gurl,gtype,setOpenLoader));setMessage(msg);setError(false);setStatus(true);
  }).catch((error) => {setOpenLoader(false);setError(true);setStatus(true);setMessage(error?.response?.data?.message?.name[0]);});
};
export const deleteData=(dataObj,url,type,gurl,gtype,msg,setMessage, setError, setStatus, setOpenLoader) => (dispatch) => {
  setOpenLoader(true);
  client.delete(url, dataObj).then((res) => {
    setOpenLoader(false);
    dispatch({
      type: type,
      payload: res.data.data,
    });
    dispatch(getDataList(gurl,gtype,setOpenLoader));setMessage(msg);setError(false);setStatus(true);
  }).catch((error) => {setOpenLoader(false);setError(true);setStatus(true);setMessage(error?.response?.data?.message?.name[0]);});
};


// *********************************************** Approve-Disapprove Ad ******************************************************** 

export const approveAd = (id,gurl,gtype,setOpenLoader) =>(dispatch) =>{
  client.post(`admin/itemapprove`,id).then((res)=>{
    dispatch(getDataList(gurl,gtype,setOpenLoader))
  }).catch((error)=>{console.log(error)})
}

// *********************************************** Reject Ad ******************************************************** 

export const rejectAd = (id,gurl,gtype,setOpenLoader, setMessage, setError, setStatus) =>(dispatch) =>{
  client.post(`admin/itemapprove`,id).then((res)=>{
    dispatch(getDataList(gurl,gtype,setOpenLoader));
    setMessage(res.data.message);
    setError(false);
    setStatus(true);
  }).catch((error)=>{
    setError(true);
    setStatus(true);
    setMessage('error in rejection');
    console.log(error,'----ad-reject-error----')
  })
}

// *********************************************** Approve-Disapprove User ******************************************************** 
  
export const approveUser = (id,gurl,gtype,setOpenLoader) =>(dispatch) =>{
  client.post(`admin/user_approve`,id).then((res)=>{
    dispatch(getDataList(gurl,gtype,setOpenLoader))
  }).catch((error)=>{console.log(error,'----user-approve-error----')})
}
// *********************************************** Approve-Disapprove Advertisement ******************************************************** 
  
export const approveAdvertisement = (id,gurl,gtype,setOpenLoader) =>(dispatch) =>{
  client.post(`admin/ads_approve`,id).then((res)=>{
    dispatch(getDataList(gurl,gtype,setOpenLoader))
  }).catch((error)=>{console.log(error,'----advertise-approve-error----')})
}
