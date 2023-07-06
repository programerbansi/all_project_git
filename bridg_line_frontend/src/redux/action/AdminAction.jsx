import { AdminClient } from "../client/AdminClient"
import { toast } from 'react-toastify';
import { ADD_INVOICE } from "./Action";
import { ADMIN_INVOICE } from "../../services/AdminRoutePath";
import { useContext } from "react";
import { AdminValAuthContext } from "../../admin/context/AdminAuthProvider";

export const ADMIN_LOGOUT = "ADMIN_LOGOUT"

export const ADD_USER = "ADD_USER"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const ADD_JOB_TYPE = "ADD_JOB_TYPE"
export const ADD_STATUS = "ADD_STATUS"
export const ADD_PAYMENT = "ADD_PAYMENT"
export const ADD_NOTIFY = "ADD_NOTIFY"
export const SEND_REMAIND_EMAIL = "SEND_REMAIND_EMAIL"

export const EDIT_USER = "EDIT_USER"
export const EDIT_INVOICE_STATUS = "EDIT_INVOICE_STATUS"
export const EDIT_JOB_TYPE = "EDIT_JOB_TYPE"
export const EDIT_STATUS = "EDIT_STATUS"
export const EDIT_PAYMENT = "EDIT_PAYMENT"
export const EDIT_NOTIFY = "EDIT_NOTIFY"

export const UPDATE_TASK_DEFAULT = "UPDATE_TASK_DEFAULT"
export const UPDATE_TASK_FILE = "UPDATE_TASK_FILE"
export const UPDATE_TASK_AMOUNT = "UPDATE_TASK_AMOUNT"
export const UPDATE_PAYMENT_STATUS = "UPDATE_PAYMENT_STATUS"

export const DELETE_USER = "DELETE_USER"
export const DELETE_JOB_TYPE = "DELETE_JOB_TYPE"
export const DELETE_STATUS = "DELETE_STATUS"
export const DELETE_PAYMENT = "DELETE_PAYMENT"
export const DELETE_TEAM = "DELETE_TEAM"
export const DELETE_NOTIFY = "DELETE_NOTIFY"


export const GET_USER_LIST = "GET_USER_LIST"
export const GET_INVOICE_LIST = "GET_INVOICE_LIST"
export const GET_INVOICE_COMPLETED_LIST = "GET_INVOICE_COMPLETED_LIST"
export const GET_MESSAGE_LIST = "GET_MESSAGE_LIST"
export const GET_JOB_TYPE_LIST = "GET_JOB_TYPE_LIST"
export const GET_USERS = "GET_USERS"
export const GET_JOB_TYPES = "GET_JOB_TYPES"
export const GET_STATUS = "GET_STATUS"
export const GET_STATUS_LIST = "GET_STATUS_LIST"
export const GET_PAYMENT_LIST = "GET_PAYMENT_LIST"
export const GET_PAYMENTS = "GET_PAYMENTS"
export const GET_ORDER_LIST = "GET_ORDER_LIST"
export const GET_NOTIFY_ADMIN = "GET_NOTIFY_ADMIN"
export const GET_PHOTOS_ADMIN = "GET_PHOTOS_ADMIN"
export const GET_DOCS_ADMIN = "GET_DOCS_ADMIN"

export const GET_USERS_LENGTH = "GET_USERS_LENGTH"
export const GET_TASK_LENGTH = "GET_TASK_LENGTH"
export const GET_ORDER_LENGTH = "GET_ORDER_LENGTH"
export const GET_STRIPAC_LENGTH = "GET_STRIPAC_LENGTH"
export const GET_PENDING_LENGTH = "GET_PENDING_LENGTH"
export const GET_NEEDPHOTO_LENGTH = "GET_NEEDPHOTO_LENGTH"
export const GET_REDYINVOICE_LENGTH = "GET_REDYINVOICE_LENGTH"
export const GET_COMPLETED_LENGTH = "GET_COMPLETED_LENGTH"
export const GET_PROFIT_LENGTH = "GET_PROFIT_LENGTH"
export const GET_NEEDDOC_LENGTH = "GET_NEEDDOC_LENGTH"
export const GET_JOB_LENGTH = "GET_JOB_LENGTH"
export const GET_OTHER_LENGTH = "GET_OTHER_LENGTH"
export const GET_INVOICE_BY_ID = "GET_INVOICE_BY_ID"
export const GET_TEAM_LIST = "GET_TEAM_LIST"
export const GET_TEAM_LENGTH = "GET_TEAM_LENGTH"
export const GET_NOTIFICATION_LENGTH = "GET_NOTIFICATION_LENGTH"

export const adminLogout = (navigate, setLoading) => (dispatch) => {
  AdminClient.post('/logout').then((response) => {
    dispatch({
      type: ADMIN_LOGOUT,
      payload: response
    })
    setTimeout(() => {
      setLoading(false);
      localStorage.clear();
      navigate("/admin/login", { state: { statePath: "/admin" } })
    }, 500);


  }).catch((error) => {
    console.log(error)
    setLoading(false);
  })
}
export const getAdminDataList = (url, type, setLoading) => (dispatch) => {
  AdminClient.get(url).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
      path: res.data.path,
      totalItemCount: res.data.totalItemCount,
    })
    setLoading(false);
  }).catch((error) => { setLoading(false); })
}
export const getAdminDatas = (url, type, setLoading) => (dispatch) => {
  AdminClient.get(url).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
    })
    setLoading(false)
  }).catch((error) => { setLoading(false) })
}
export const getAdminDataLength = (url, type, setLoading) => (dispatch) => {
  AdminClient.get(url).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data.length,
    })
    setLoading(false)
  }).catch((error) => { console.log(error); setLoading(false) })
}
export const addAdminData = (obj, url, type, setLoading, setShow, setAction, getUrl, getType, msg) => (dispatch) => {
  AdminClient.post(url, obj).then((response) => {
    dispatch({
      type: type,
      payload: response
    })
    setTimeout(() => { setLoading(false); setShow(false); setAction(false);}, 1000);
    setTimeout(() => { dispatch(getAdminDataList(getUrl, getType, setLoading)); toast.success(msg);}, 1500);
  }).catch((error) => {
    setTimeout(() => { setLoading(false); setShow(false); setAction(false);}, 1000);
      setTimeout(() => {dispatch(getAdminDataList(getUrl, getType, setLoading)); toast.error(error.response.data.message);}, 1500);
  })
}
export const updateAdminData = (obj, url,type,setLoading, setShow, setAction, currentPage, setCurrentPage, setItem,getUrl,getType,msg) => (dispatch) => {
  AdminClient.post(url, obj).then((response) => {
    dispatch({
      type: type,
      payload: response
    })
    setTimeout(() => { setLoading(false); setShow(false); setAction(false); setItem(''); }, 1000);
    setTimeout(() => { dispatch(getAdminDataList(getUrl, getType, setLoading)); setCurrentPage(currentPage); toast.success(msg); }, 1500);
  }).catch((error) => {
    setTimeout(() => { setLoading(false); setShow(false); setAction(false); setItem(''); }, 1000);
    setTimeout(() => { dispatch(getAdminDataList(getUrl, getType, setLoading)); setCurrentPage(currentPage); toast.error(error.response.data.message); }, 1500);
  })
}
export const updateAdminDatas = (obj,url,type, setLoading, setShow, setAction, setItem,getUrl,getType,msg) => (dispatch) => {
  AdminClient.post(url, obj).then((response) => {
    dispatch({
      type: type,
      payload: response
    })
    setTimeout(() => { setLoading(false); setShow(false); setAction(''); setItem(''); }, 1000);
    setTimeout(() => { dispatch(getAdminDatas(getUrl,getType,setLoading)); toast.success(msg); }, 1500);
  }).catch((error) => {
    setTimeout(() => { setLoading(false); setShow(false); setAction(''); setItem(''); }, 1000);
    setTimeout(() => { dispatch(getAdminDatas(getUrl,getType,setLoading)); toast.error(error.response.data.message); }, 1500);
  })
}
export const deleteAdminData = (url,type, setLoading, setShow, setAction, currentPage, setCurrentPage, setItem,getUrl,getType,msg) => (dispatch) => {
  AdminClient.post(url).then((response) => {
    dispatch({
      type: type,
      payload: response
    })
    setTimeout(() => { setLoading(false); setShow(false); setAction(false); setItem(''); }, 1000);
    setTimeout(() => { dispatch(getAdminDatas(getUrl,getType,setLoading)); setCurrentPage(currentPage); toast.success(msg); }, 1500);
  }).catch((error) => {
    setTimeout(() => { setLoading(false); setShow(false); setAction(false); setItem(''); }, 1000);
    setTimeout(() => { dispatch(getAdminDatas(getUrl,getType,setLoading)); setCurrentPage(currentPage); toast.error(error.response.data.message); }, 1500);
  })
}
export const updateAdminTask = (obj,url,type, setLoading, navigate,msg,path,setFilteredArray) => (dispatch) => {
  AdminClient.post(url, obj).then((response) => {
    dispatch({
      type: type,
      payload: response
    })
   setFilteredArray([]);
    setTimeout(() => { setLoading(false); }, 1000);
    setTimeout(() => { toast.success(msg); navigate(path) }, 1500);

  }).catch((error) => {
   setFilteredArray([]);
    setTimeout(() => { setLoading(false); }, 1000);
    setTimeout(() => { toast.error(error.response.data.message); }, 1500);

  })
}
export const getMessageAdminList = (setLoading, page, id) => (dispatch) => {
  AdminClient.get(`/admin/get-message/${id}/?page=${page}`).then((res) => {
    dispatch({
      type: GET_MESSAGE_LIST,
      payload: res.data.data,
      totalItemCount: res.data.totalItemCount,
    })
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }).catch((error) => {
    console.log(error)
    setLoading(false);
  })
}
export const addMessageAdmin = (obj, invoice_id, setLoading, setShow) => (dispatch) => {
  AdminClient.post(`/admin/add-message`, obj).then((response) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: response
    })
    setTimeout(() => { setLoading(false); setShow(false); }, 1000);
    setTimeout(() => { dispatch(getMessageAdminList(setLoading, 1, invoice_id)); toast.success("Note added successful."); }, 1500);
  }).catch((error) => {
    setTimeout(() => { setLoading(false); setShow(false); }, 1000);
    setTimeout(() => { dispatch(getMessageAdminList(setLoading, 1, invoice_id)); toast.error(error.response.data.message); }, 1500);
  })
}
export const getInvoiceById = (id, setLoading) => (dispatch) => {
  AdminClient.get(`/admin/get-invoice-id/${id}`).then((res) => {
    dispatch({
      type: GET_INVOICE_BY_ID,
      payload: res.data.data,
    })
    setLoading(false);
  }).catch((error) => { console.log(error); setLoading(false); })
}

export const makeAsDefaultPayment = (id, obj, setLoading, currentPage, setCurrentPage,getUrl,getType) => (dispatch) => {
  AdminClient.post(`/admin/make-payment-default/${id}`, obj).then((response) => {
    dispatch({
      type: UPDATE_PAYMENT_STATUS,
      payload: response
    })
    setLoading(false)
    dispatch(getAdminDataList(getUrl,getType,setLoading)); setCurrentPage(currentPage); toast.success("Payment method status updated successful.")
  }).catch((error) => {
    setLoading(false)
    dispatch(getAdminDataList(getUrl,getType,setLoading)); setCurrentPage(currentPage); toast.error(error.response.data.message)
  })
}
export const addRemaindEmail= (obj) => (dispatch) => {
  AdminClient.post(`/admin/remaind-email`, obj).then((response) => {
    dispatch({
      type: SEND_REMAIND_EMAIL,
      payload: response
    })
    toast.success("Remainder email send successful.");
  }).catch((error) => {
     toast.error(error.response.data.message); 
  })
}
