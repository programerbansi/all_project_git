import { UserClient } from "../client/UserClient"
import { HOME } from "../../services/UserRoutePath"
import { storeLoggedInUser, storeUserRole, storeUserToken } from "../../services/UserLocalStorage"
import { storeAdminRole, storeAdminToken, storeLoggedInAdmin } from "../../services/AdminLocalStorage"
import { ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_JOB_TYPE, ADMIN_LOGIN, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_TEAM, ADMIN_USER } from "../../services/AdminRoutePath"
import { toast } from 'react-toastify';
import axios from "axios"

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"

export const GET_INVOICE_LIST = "GET_INVOICE_LIST"
export const GET_INVOICE_NEED_LIST = "GET_INVOICE_NEED_LIST"
export const GET_SEARCH_LIST = "GET_SEARCH_LIST"
export const GET_SEARCH_LIST_ARRAY = "GET_SEARCH_LIST_ARRAY"
export const GET_PHOTO_LIST = "GET_PHOTO_LIST"
export const GET_DOCUMENT_LIST = "GET_DOCUMENT_LIST"
export const GET_MESSAGE_LIST = "GET_MESSAGE_LIST"
export const GET_JOB_TYPES = "GET_JOB_TYPES"
export const GET_STATUS = "GET_STATUS"
export const GET_STRIPE_PAYMENT = "GET_STRIPE_PAYMENT"
export const GET_INVOICE_BY_ID = "GET_INVOICE_BY_ID"
export const GET_REPORTS_LIST = "GET_REPORTS_LIST"
export const GET_USER_TEAM_LIST = "GET_USER_TEAM_LIST"
export const GET_USER_CARDLIST = "GET_USER_CARDLIST"
export const GET_USER_BILL_LIST = "GET_USER_BILL_LIST"
export const GET_PAY_AMOUNT = "GET_PAY_AMOUNT"
export const GET_USER_CARDS = "GET_USER_CARDS"
export const GET_NOTIFY_USER = "GET_NOTIFY_USER"
export const GET_HISTORY = "GET_HISTORY"
export const GET_HISTORY_LIST = "GET_HISTORY_LIST"
export const GET_PHOTOS = "GET_PHOTOS"
export const GET_DOCUMENTS = "GET_DOCUMENTS"

export const ADD_INVOICE = "ADD_INVOICE"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const UPLOAD_PHOTO = "UPLOAD_PHOTO"
export const UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT"
export const ADD_USER_TEAM = "ADD_USER_TEAM"
export const UPDATE_CARD_STATUS = "UPDATE_CARD_STATUS"
export const ADD_USER_CARD = "ADD_USER_CARD"
export const ADD_NOTIFY_USER = "ADD_NOTIFY_USER"

export const EDIT_USER_TEAM = "EDIT_USER_TEAM"
export const EDIT_USER_CARD = "EDIT_USER_CARD"
export const EDIT_INVOICE = "EDIT_INVOICE"
export const EDIT_NOTIFY_USER = "EDIT_NOTIFY_USER"

export const DELETE_PHOTO = "DELETE_PHOTO"
export const DELETE_SHEET = "DELETE_SHEET"
export const DELETE_INVOICE = "DELETE_INVOICE"
export const DELETE_TEAM = "DELETE_TEAM"
export const DELETE_CARD = "DELETE_CARD"
export const DELETE_HISTORY = "DELETE_HISTORY"
export const DELETE_HISTORY_ALL = "DELETE_HISTORY_ALL"


export const login = (obj, setLoading, navigate, setError) => (dispatch) => {
  UserClient.post('/login', obj).then((response) => {
    // console.log(response.data.data, '--------------login-----------------------')
    dispatch({
      type: LOGIN,
      payload: response.data.data
    })
    setLoading(false);
    if (response.data.data.role == 'admin') {
      storeAdminToken(response.data.access_token)
      storeAdminRole(`${response.data.data.role}`)
      storeLoggedInAdmin(response.data.data)
      if(response.data.data.status?.includes(1) && response.data.access_token) return navigate(ADMIN_DASHBOARD)
      else if(response.data.data.status?.includes(2) && response.data.access_token) return navigate(ADMIN_INVOICE)
      else if(response.data.data.status?.includes(3) && response.data.access_token) return navigate(ADMIN_ORDERS)
      else if(response.data.data.status?.includes(4) && response.data.access_token) return navigate(ADMIN_USER)
      else if(response.data.data.status?.includes(5) && response.data.access_token) return navigate(ADMIN_TEAM)
      else if(response.data.data.status?.includes(6) && response.data.access_token) return navigate(ADMIN_PAYMENT)
      else if(response.data.data.status?.includes(7) && response.data.access_token) return navigate(ADMIN_JOB_TYPE)
      else if(!response.data.data && !response.data.access_token) return navigate(ADMIN_LOGIN)
    } else {
      storeUserToken(response.data.access_token);
      storeUserRole(`${response.data.data.role}`);
      storeLoggedInUser(response.data.data);
      navigate(HOME)
    }

  }).catch((error) => {
    // console.log(error)
    setError(error.response.data.message)
    setLoading(false);
  })
}
export const logout = (navigate, setLoading) => (dispatch) => {
  UserClient.post('/logout').then((response) => {
    dispatch({
      type: LOGOUT,
      payload: response
    })
    setTimeout(() => {
      setLoading(false);
      localStorage.clear();
      navigate("/", { state: { statePath: "/user" } })
    }, 500);


  }).catch((error) => {
    console.log(error)
    setLoading(false);
  })
}

export const getDataList = (url, type, setLoading) => (dispatch) => {
  UserClient.get(url).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
      path: res.data.path,
      totalItemCount: res.data.totalItemCount,
    })
    setLoading(false);
  }).catch((error) => { setLoading(false) })
}
export const getData = (obj, url, type) => (dispatch) => {
  UserClient.post(url, obj).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
    })
  }).catch((error) => {
    console.log(error)
  })
}
export const getHistoryData = (url, type,setLoading) => (dispatch) => {
  UserClient.get(url).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
    })
    setLoading(false)
  }).catch((error) => {
    console.log(error)
  })
}
export const getDataSearch = (obj,url, type, setLoading) => (dispatch) => {
  UserClient.post(url,obj).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
    })
    setLoading(false)
  }).catch((error) => { console.log(error); 
    setLoading(false) 
  })
}
export const getDataWithLoading = (url, type, setLoading) => (dispatch) => {
  UserClient.get(url).then((res) => {
    dispatch({
      type: type,
      payload: res.data.data,
    })
    setLoading(false)
  }).catch((error) => { console.log(error); setLoading(false) })
}
export const curdData = (obj, setLoading, setShow, setAction, url, type, getUrl, getType, msg) => (dispatch) => {
  UserClient.post(url, obj).then((response) => {
    dispatch({
      type: type,
      payload: response
    })
    setLoading(false); setShow(false); setAction(false);
    dispatch(getDataList(getUrl, getType, setLoading)); toast.success(msg);
  }).catch((error) => {
    setLoading(false); setShow(false); setAction(false);
    dispatch(getDataList(getUrl, getType, setLoading)); toast.error(error.response.data.message);
  })
}

export const getStripePayment = (obj, setLoading, navigate) => (dispatch) => {
  UserClient.post(`/user/add-stripe-payment`, obj).then((res) => {
    dispatch({
      type: GET_STRIPE_PAYMENT,
      payload: res.data.data,
    })
    setLoading(false);
    toast.success("Payment done successfully!");
    setTimeout(() => {
      navigate(HOME)
    }, 1000);
  }).catch((error) => { console.log(error); setLoading(false); toast.error(error.response.data.message); })
}

/* ---------------------------------------------------------card and billing history -----------------------------------------*/
export const addUserCard = (obj, id, setLoading, setShow, setAction) => (dispatch) => {
  UserClient.post('/user/add-card', obj).then((response) => {
    dispatch({
      type: ADD_USER_CARD,
      payload: response
    })
    setLoading(false); setShow(false); setAction('');
    dispatch(getDataList(`/user/get-user-card/${id}/?page=${1}`, GET_USER_CARDLIST, setLoading)); dispatch(getCards(id, setLoading)); toast.success("Card added successful.");
  }).catch((error) => {
    setLoading(false); setShow(false); setAction('');
    dispatch(getDataList(`/user/get-user-card/${id}/?page=${1}`, GET_USER_CARDLIST, setLoading)); dispatch(getCards(id, setLoading)); toast.error(error.response.data.message);
  })
}
export const getPaymentAmount = (id, setLoading) => (dispatch) => {
  UserClient.get(`/user/get-pay-amount/${id}`).then((res) => {
    dispatch({
      type: GET_PAY_AMOUNT,
      payload: res.data.data.Pay_amount,
    })
    setLoading(false)
  }).catch((error) => { console.log(error); setLoading(false) })
}
export const makeAsDefaultCard = (id, obj, user_id, setLoading, currentPage, setCurrentPage,checkId) => (dispatch) => {
  UserClient.post(`/user/make-card-default/${id}`, obj).then((response) => {
    dispatch({
      type: UPDATE_CARD_STATUS,
      payload: response
    })
    dispatch(getDataList(`/user/get-user-card/${user_id}/?page=${1}`, GET_USER_CARDLIST, setLoading)); setCurrentPage(currentPage); toast.success("Default card has been changed successfully.")
   setTimeout(()=>{document.getElementById(checkId).disabled = false;},1500) 
    setLoading(false)
  }).catch((error) => {
    setLoading(false)
    dispatch(getDataList(`/user/get-user-card/${user_id}/?page=${1}`, GET_USER_CARDLIST, setLoading)); setCurrentPage(currentPage); toast.error(error.response.data.message)
  })
}
export const getCards = (id, setLoading) => (dispatch) => {
  UserClient.get(`/user/get-user-cards/${id}`).then((res) => {
    dispatch({
      type: GET_USER_CARDS,
      payload: res.data.data,
    })
    setLoading(false)
  }).catch((error) => { console.log(error); setLoading(false) })
}
/*--------------------------------------------manage notification--------------------------*/
export const getNotifyUser = (setLoading, id) => (dispatch) => {
  UserClient.get(`/user/get-notify-user/${id}`).then((res) => {
    dispatch({
      type: GET_NOTIFY_USER,
      payload: res.data.data,
    })
    setLoading(false);
  }).catch((error) => { console.log(error); setLoading(false); })
}
export const addNotification = (obj, user_id, setLoading, setShow, setAction) => (dispatch) => {
  UserClient.post(`/user/add-notify`, obj).then((response) => {
    dispatch({
      type: ADD_NOTIFY_USER,
      payload: response
    })
    setLoading(false); setShow(false); setAction('');
    dispatch(getNotifyUser(setLoading, user_id)); toast.success("Email notification added successful.");
  }).catch((error) => {
    setLoading(false); setShow(false); setAction('');
    dispatch(getNotifyUser(setLoading, user_id)); toast.error(error.response.data.message);
  })
}
export const updateNotification = (id, obj, user_id, setLoading, setShow, setAction,) => (dispatch) => {
  UserClient.post(`/user/update-notify/${id}`, obj).then((response) => {
    dispatch({
      type: EDIT_NOTIFY_USER,
      payload: response
    })
    setLoading(false); setShow(false); setAction('');
    dispatch(getNotifyUser(setLoading, user_id)); toast.success("Email notification updated successful.");
  }).catch((error) => {
    setLoading(false); setShow(false); setAction('');
    dispatch(getNotifyUser(setLoading, user_id)); toast.error(error.response.data.message);
  })
}