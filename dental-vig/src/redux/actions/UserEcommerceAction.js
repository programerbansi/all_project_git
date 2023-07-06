import { removeUserRole, removeUserToken, removeLoggedInUser, getLoggedInUser, storeForgotEmail, storeLoggedInUser, storeMobileNo, storeSendMobile, storeUserRole, storeUserToken, removeMobileNo, removeSendMobile } from "../../services/LocalStorageUser";
import userClient from "../userClient";
import swal from 'sweetalert';
import $ from 'jquery'

import { AD_POST, MY_ADS, PROFILE, SETTINGS, USER_LOGIN } from "../../services/UserRoutePath";

let loggedInUser = getLoggedInUser();

export const LOGIN = 'LOGIN';
export const USER_SOCIAL_LOGIN = 'USER_SOCIAL_LOAGIN';
export const USER_PROFILE_DETAIL = 'USER_PROFILE_DETAIL';
export const USER_ADDITIONAL_INFO = 'USER_ADDITIONAL_INFO';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_MESSAGE = 'USER_MESSAGE';
export const USER_MESSAGE_ID = 'USER_MESSAGE_ID'

export const USER_FORGOT_PASSWORD = 'USER_FORGOT_PASSWORD';
export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';

export const GET_USER_CATEGORY = 'GET_USER_CATEGORY';
export const GET_USER_SUB_CATEGORY = 'GET_USER_SUB_CATEGORY';
export const GET_USER_BRAND = 'GET_USER_BRAND';
export const GET_USER_TAG = 'GET_USER_TAG';
export const GET_USER_PRODUCTS_BY_CATEGORY = 'GET_USER_PRODUCTS';
export const GET_USER_WISHLIST = 'GET_USER_WISHLIST';
export const GET_USER_PRODUCT = 'GET_USER_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_USER_TYPE = 'GET_USER_TYPE';
export const GET_USER_TYPE_TO_CAT = 'GET_USER_TYPE_TO_CAT';
export const GET_USER_CAT_TO_SUBCAT = 'GET_USER_CAT_TO_SUBCAT';
export const GET_USER_CAT_TO_BRAND = 'GET_USER_CAT_TO_BRAND';

export const GET_USER_MESSAGE = 'GET_USER_MESSAGE';
export const GET_USER_CONVERSTAION = 'GET_USER_CONVERSTAION';
export const GET_USER_MESSAGE_LIST = 'GET_USER_MESSAGE_LIST';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION'
export const DELETE_CONVERSATION_SEEN = 'DELETE_CONVERSATION_SEEN'
export const GET_USER_ADVERTISEMENT = 'GET_USER_ADVERTISEMENT';
export const GET_ITEM_ID = 'GET_ITEM_ID';
export const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION'

export const USER_COUNTRYLIST = 'USER_COUNTRYLIST';
export const USER_STATELIST = 'USER_STATELIST';
export const USER_CITYLIST = 'USER_CITYLIST';
export const USER_ALL_STATELIST = 'USER_ALL_STATELIST';
export const USER_ADD_PRODUCT = 'USER_ADD_PRODUCT';
export const USER_UPDATE_PRODUCT = 'USER_UPDATE_PRODUCT';
export const USER_ADD_WISHLIST = 'USER_ADD_WISHLIST';
export const USER_DELETE_WISHLIST = 'USER_DELETE_WISHLIST';
export const USER_SEND_MOBILENO = 'USER_SEND_MOBILENO';
export const USER_SEND_OTP = 'USER_SEND_OTP';

export const USER_DELETE_PRODUCT_IMAGE = 'USER_DELETE_PRODUCT_IMAGE';
export const USER_DELETE_PRODUCT = 'USER_DELETE_PRODUCT';
export const USER_MARK_AS_SOLD = 'USER_MARK_AS_SOLD';

export const GET_USER_PRODUCTS_BY_CATEGORY_PRICE = 'GET_USER_PRODUCTS_BY_CATEGORY_PRICE';
export const GET_USER_PRODUCTS_BY_CATEGORY_BRAND = 'GET_USER_PRODUCTS_BY_CATEGORY_BRAND';
export const GET_RELATED_PRODUCTS = 'GET_RELATED_PRODUCTS';
export const GET_BOUGHT_PRODUCTS = 'GET_BOUGHT_PRODUCTS';
export const GET_NOTIFICATION_LISTING = 'GET_NOTIFICATION_LISTING';
export const SET_BUYSELL_NOTIFICATION_SEEN = 'SET_BUYSELL_NOTIFICATION_SEEN';

export const GET_MESSAGE_NOTIFICATION_LISTING = 'GET_MESSAGE_NOTIFICATION_LISTING';
export const SET_MESSAGE_NOTIFICATION_SEEN = 'SET_MESSAGE_NOTIFICATION_SEEN';
export const SEEN_MESSAGES = 'SEEN_MESSAGES';

export const GET_SELECTED_PRODUCT_DETAIL = 'GET_SELECTED_PRODUCT_DETAIL';
export const SET_SELECTED_PRODUCT_DETAIL = 'SET_SELECTED_PRODUCT_DETAIL';

export const GET_LOCATION = 'GET_LOCATION';
export const GET_ITEM_ALL_TYPE = 'GEt_ITEM_ALL_TYPE';
export const COUNT_ITEM_VIEW = 'COUNT_ITEM_VIEW';

export const STORE_REVIEWS = 'STORE_REVIEWS';
export const GET_REVIEWS = 'GET_REVIEWS';
export const GET_LOW_TO_HIGH_REVIEWS = 'GET_LOW_TO_HIGH_REVIEWS';
export const GET_HIGH_TO_LOW_REVIEWS = 'GET_HIGH_TO_LOW_REVIEWS';
export const GET_RECENT_REVIEWS = 'GET_RECENT_REVIEWS';

export const GET_ALL_TYPECAT = 'GET_ALL_TYPECAT'
export const GET_ALL_TYPE = 'GET_ALL_TYPE'
export const USER_SET_REPORT = 'USER_SET_REPORT';
export const USER_STORE_CONTACT_US = 'USER_STORE_CONTACT_US';


export const userRegister = (obj, setLoading, setError, setStatus, resetForm, checkid, setOpenVerifyModal) => (dispatch) => {
  userClient.post('register',obj).then((response) => {
    storeUserToken(response.data.access_token);storeUserRole(`${response.data.data.role}`);storeLoggedInUser(response.data.data);
    dispatch({
      type: USER_PROFILE_DETAIL,
      payload: response.data
    })
    setLoading(false);setOpenVerifyModal(true); resetForm({ values: '' });document.getElementById(checkid).checked = false;
  }).catch((error) => {
    setLoading(false);setError(true);setStatus(true);console.log(error);
  })
}
export const userLogin = (obj, navigate, setLoading, setMessage, setStatus, setError) => (dispatch) => {
  userClient.post('login', obj).then((response) => {
    storeUserToken(response.data.access_token);storeUserRole(`${response.data.data.role}`);storeLoggedInUser(response.data.data);
    dispatch({
      type: LOGIN,
      payload: response.data
    })
    setLoading(false);setError(false);navigate('/');
  }).catch((error) => {
    setLoading(false);setError(true);setStatus(true);setMessage(error.response.data.message);console.log(error);
  })
}
export const userLogout = (obj, navigate, setLoading) => (dispatch) => {
  userClient.post(`logout`, obj).then((res) => {
    dispatch({
      type: USER_LOGOUT,
      payload: res.data
    })
    setLoading(false);navigate('/');removeUserRole();removeUserToken();removeLoggedInUser();removeMobileNo();removeSendMobile();window.location.reload();
  }).catch((error) => {setLoading(false);console.log(error);})
}
export const userSocialLogin = (obj, navigate, setLoading, setMessage, setStatus, setError) => (dispatch) => {
  userClient.post('social-login', obj).then((response) => {
    storeUserToken(response.data.access_token);storeUserRole(`${response.data.data.role}`);storeLoggedInUser(response.data.data);
    dispatch({
      type: USER_SOCIAL_LOGIN,
      payload: response.data.data
    })
    setLoading(false);navigate('/');
  }).catch((error) => {
    setLoading(false);setError(true);setStatus(true);setMessage(error.response.data.message);console.log(error);
  })
}

export const userAdditionalInfo = (obj, userId, setLoading, navigate, setMessage, setError, setStatus, location) => (dispatch) => {
  setLoading(true);
  userClient.post(`user/updateuser/${userId}`, obj).then((res) => {
    storeLoggedInUser(res.data.data);
    dispatch({
      type: USER_ADDITIONAL_INFO,
      payload: res.data
    })
    setLoading(false);setStatus(true);setError(false);
    if (location.pathname == SETTINGS) {
      setMessage("Profile updated successfully")
      setTimeout(() => {navigate(PROFILE)}, 2000);
    }
    else {
      navigate(AD_POST)
    }
    removeMobileNo();removeSendMobile();
  }).catch((error) => {
    setLoading(false);setError(true);setStatus(true);console.log(error, "--------add info---------")
  })
}


export const userForgotPassword = (obj, setMessage, setError, setStatus, navigate) => (dispatch) => {
  userClient.post(`forgot-password`, obj).then((res) => {
    dispatch({
      type: USER_FORGOT_PASSWORD,
      payload: res
    })
    setError(false);setStatus(true);
    setMessage(`Link has been sent to your ${obj.email} .Click on link to reset password`);
    storeForgotEmail(obj.email)
  }).catch((error) => {
    console.log(error);
    setError(true);
    setStatus(true);
    setMessage(error.response.data.message);
  })
}

export const userResetPassword = (obj, setMessage, setError, setStatus, navigate) => (dispatch) => {
  userClient.post(`reset-password`, obj).then((res) => {
    dispatch({
      type: USER_RESET_PASSWORD,
      payload: res
    })
    setError(false)
    setStatus(true);
    setMessage('Password changed successfully');
    navigate('/');
  }).catch((error) => {
    console.log(error);
    setError(true);
    setStatus(true);
    setMessage(error.response.data.message);
  })
}

export const userAddProduct = (obj, userid, setMessage, setError1, setStatus) => (dispatch) => {
  userClient.post(`user/additem`, obj).then((res) => {
    dispatch({
      type: USER_ADD_PRODUCT,
      payload: res.data
    })
    dispatch(getDatas(`user/getitemCreated_by_user/${userid}`,GET_USER_PRODUCT))
    setError1(false);
    setStatus(true)
    setMessage(res.data.message)
  }).catch((error) => {
    console.log(error)
  })
}
export const userUpdateProduct = (id, obj, userid, setMessage, setError1, setStatus, navigate) => (dispatch) => {
  userClient.post(`user/updateitem/${id}`, obj).then((res) => {
    dispatch({
      type: USER_UPDATE_PRODUCT,
      payload: res.data
    })
    setError1(false);
    setStatus(true)
    setMessage(res.data.message)
    setTimeout(() => {
      navigate(MY_ADS);
    }, 1000);
  }).catch((error) => {
    console.log(error)
  })
}
export const userDeleteProduct = (id, userid) => (dispatch) => {
  userClient.delete(`user/delete_item_by_user/${id}`).then((res) => {
    dispatch({
      type: USER_DELETE_PRODUCT,
      payload: res.data
    })
    dispatch(getDatas(`user/getitemCreated_by_user/${userid}`,GET_USER_PRODUCT))
  }).catch((error) => {
    console.log(error)
  })
}
export const userDeleteProductImage = (id, userid) => (dispatch) => {
  userClient.delete(`user/deleteitemimage/${id}`).then((res) => {
    dispatch({
      type: USER_DELETE_PRODUCT_IMAGE,
      payload: res.data
    })
  }).catch((error) => {
    dispatch(getDatas(`user/getitemCreated_by_user/${userid}`,GET_USER_PRODUCT))
    console.log(error)
  })
}

export const userAddWishList = (obj, setLike, userid) => (dispatch) => {
  userClient.post(`user/storewishlist`, obj).then((res) => {
    dispatch({
      type: USER_ADD_WISHLIST,
      payload: res.data
    })
    dispatch(getDatas(`user/getwishlistCreatedByUser/${userid}`,GET_USER_WISHLIST));
  }).catch((error) => {
    console.log(error)
  })
}

export const userDeleteWishList = (obj, setLike, userid) => (dispatch) => {
  userClient.post(`user/deletewishlist`, obj).then((res) => {
    dispatch({
      type: USER_DELETE_WISHLIST,
    });
    dispatch(getDatas(`user/getwishlistCreatedByUser/${userid}`,GET_USER_WISHLIST));
  })
}

export const getDatas = (url,type) => (dispatch) => {
  userClient.get(url).then((res) => {
    dispatch(
      {
        type: type,
        payload: res.data.data
      }
    )
  }).catch((error) => console.log(error))
}

export const getDatasPost = (url,type) => (dispatch) => {
  userClient.post(url).then((res) => {
    dispatch(
      {
        type: type,
        payload: res.data.data
      }
    )
  }).catch((error) => console.log(error))
}
export const GetUserProductsByCategory = (category_id, page, setItemList, itemList, setLoader) => (dispatch) => {
  setLoader(true);
  userClient.post(`itemFilteration?page=${page}`, { 'category_id': category_id }).then((res) => {
    setLoader(false);
    setItemList([...itemList, ...res.data.data.data])
    dispatch({
      type: GET_USER_PRODUCTS_BY_CATEGORY,
      payload: res.data.data.data,
      lastPage: res.data.data.last_page,
      currentPage: res.data.data.current_page
    })
  }).catch((error) => setLoader(false))
}

export const GetUserCattoSubCat = (obj) => (dispatch) => {
  userClient.get(`get_category_to_subcategory/${obj}`).then((res) => {
    dispatch(
      {
        type: GET_USER_CAT_TO_SUBCAT,
        payload: res.data.data[0].subcategory
      })
  })
}

export const GetUserProductsByCategoryPrice = (argObj, page, setNewList, newList, setLoader, type, alltype) => (dispatch) => {
  setLoader(true);
  userClient.post(`item_filteration/${type}/${alltype}?page=${page}`, argObj).then((res) => {
    setLoader(false);
    if (page == 1) {
      setNewList([]);
      if (res.data.status == true) {
        setNewList(res.data.data.data)
      }
    }
    else if (page > 1) {
      if (res.data.status == true) {
        setNewList([...newList, ...res.data.data.data])
      }
    }
    dispatch({
      type: GET_USER_PRODUCTS_BY_CATEGORY_PRICE,
      payload: res.data.data.data,
      lastPage: res.data.data.last_page,
      currentPage: res.data.data.current_page
    })
    if (res.data.status == true) {
      setLoader(false)
    }
  }).catch((error) => {
    setLoader(false);
    console.log(error)
  })
}

export const GetUserProductsByCategoryBrand = (argObj, page, setNewList, newList, setLoader, setLength) => (dispatch) => {
  setLoader(true);
  userClient.post(`getRelatedItem?page=${page}`, argObj).then((res) => {
    if (page == 1) {
      setNewList([]);
      if (res.data.status == true) {
        setTimeout(() => setNewList(res.data.data), 500)
      }
    }
    else if (page > 1) {
      if (res.data.status == true) {
        setTimeout(() => setNewList([...newList, ...res.data.data]), 500)
      }
    }
    dispatch({
      type: GET_USER_PRODUCTS_BY_CATEGORY_PRICE,
      payload: res.data.data,
      lastPage: res.data.data.last_page,
      currentPage: res.data.data.current_page
    })
    if (res.data.status == true) {
      setTimeout(() => setLoader(false), 500);
    }
  }).catch((error) => {
    setLoader(false);
    console.log(error)
  })
}

export const getCountryList = () => (dispatch) => {
  userClient.get('countries').then((res) => {
    dispatch(
      {
        type: USER_COUNTRYLIST,
        payload: res.data.countries
      }
    )
  })
}
export const getStateList = () => (dispatch) => {
  userClient.get(`states`).then((res) => {
    dispatch(
      {
        type: USER_STATELIST,
        payload: res.data.states
      }
    )
  })
}

export const userSendMobileNo = (id, obj, navigate, setMessage, setError, setStatus, setFlagOtp, verifyButtonId) => (dispatch) => {
  userClient.post(`save_phone_no/${id}`, obj).then((res) => {
    dispatch({
      type: USER_SEND_MOBILENO,
      payload: res.data
    })
    setFlagOtp(true);
    storeMobileNo(res.data.data.phone);
  }).catch((error) => {
    setFlagOtp(false)
    setError(true);
    setStatus(true)
    setMessage(error.response.data.message)
    console.log(error)
  })
}

export const userSendOTP = (id, obj, navigate, setMessage, setError, setStatus, setSendMobile) => (dispatch) => {
  userClient.post(`otpverification/${id}`, obj).then((res) => {
    dispatch({
      type: USER_SEND_OTP,
      payload: res.data
    })
    setSendMobile(res.data.status)
    if (res.data.status == true) {
      removeLoggedInUser();
      removeUserRole()
      removeUserToken()
      swal({
        title: res.data.message,
        icon: "success",
        confirmButtonColor: '#0044bb',
        closeOnConfirm: false,
        closeOnClickOutside: false,
        buttons: {
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "swal-button--confirm",
          },
        },
      }).then((value) => {
        if (value) {
          navigate(USER_LOGIN);
        }
      });
    }
    else {
      swal({
        title: res.data.message,
        icon: "warning",
        confirmButtonColor: '#0044bb',
        closeOnConfirm: false,
        closeOnClickOutside: false,
      })
    }
  }).catch((error) => {
    setError(true);
    setStatus(true)
    setMessage(error.response.data.message)
    console.log(error)
  })
}

export const userMessage = (obj, setTotalResult, setMessages, messages, setPage, setLoading, setMessageAdded) => (dispatch) => {
  userClient.post(`user/message`, obj).then((res) => {
    dispatch({
      type: USER_MESSAGE,
      payload: res.data,
      conversation_id: res.data.data.conversation_id,
    })
    dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
    setMessageAdded(false)
  }).catch((error) => {
    console.log(error)
  })
}
export const userMessageId = (id, obj, page, setTotalResult, setMessages, messages, setSubmitFlag, submitFlag, scrollToBottom, setSendingMessage, setMessageAdded) => (dispatch) => {
  userClient.post(`user/message/${id}`, obj).then((res) => {
    scrollToBottom();
    dispatch({
      type: USER_MESSAGE_ID,
      payload: res.data,
      conversation_id: res.data.data.conversation_id,
    })
    setSendingMessage(false);
    setMessageAdded(false)
  }).catch((error) => {
    console.log(error)
  })
}

export const getUserConversation = (id, page, setTotalResult, setMessages, messages, setPage, setLoading) => (dispatch) => {
  if (page > 1) setLoading(true);
  else setLoading(false);
  userClient.post(`user/get_message_by_conv_id/${id}?page=${page}`).then((res) => {
    setTotalResult(res.data.data.total)
    setMessages((messages) => [...messages, ...res.data.data.data]);
    dispatch({
      type: GET_USER_CONVERSTAION,
      payload: res.data.data.data,
      totalresult: res.data.data.total,
      lastpage: res.data.data.last_page
    })
    setLoading(false);
  }).catch((error) => {
    console.log(error)
  })
}

export const deleteMessage = (obj) => (dispatch) => {
  userClient.post(`user/delete_message`, obj).then((res) => {
    dispatch(
      {
        type: DELETE_MESSAGE,
      }
    )
  }).catch((error) => console.log(error, '---------deleteMessageError-------'))
}

export const deleteConversationSeen = (obj) => (dispatch) => {
  userClient.post(`seenwhereconv`, obj).then((res) => {
    const formdata = new FormData();
    formdata.append('id', res?.data?.data?.id);
    dispatch({
      type: DELETE_CONVERSATION_SEEN,
    })
    dispatch(getDatasPost(`user/get_all_messages`,GET_USER_MESSAGE_LIST))
    if (res?.data?.data?.s_delete == 1 && res?.data?.data?.r_delete == 1) {
      dispatch(deleteConversation(formdata))
    }
  }).catch((error) => console.log(error))
}
export const deleteConversation = (obj) => (dispatch) => {
  userClient.post(`user/delete_conversation_msg`, obj).then((res) => {

    dispatch({
      type: DELETE_CONVERSATION,
    })
  }).catch((error) => console.log(error))
}

export const markAsSold = (obj, handleCloseModal, id, setError, setQuantity) => (dispatch) => {
  userClient.post(`user/store_sold_data`, obj).then((res) => {
    handleCloseModal();
    setError('');
    setQuantity();
    dispatch({
      type: USER_MARK_AS_SOLD,
    })
    dispatch(getDatas(`user/getitemCreated_by_user/${id}`,GET_USER_PRODUCT))
  }).catch((error) => console.log(error))
}

export const getLocation = (obj) => (dispatch) => {
  userClient.post(`get_item_by_state_city`, obj).then((res) => {
    dispatch(
      {
        type: GET_LOCATION,
        payload: res.data.data
      }
    )
  })
}

export const getCurrentLocation = (obj) => (dispatch) => {
  userClient.post(`getlatlng`, obj).then((res) => {
    dispatch(
      {
        type: GET_CURRENT_LOCATION,
        payload: res.data.result.results[0].formatted_address
      }
    )
  })
}
export const getItemByAllType = (obj) => (dispatch) => {
  userClient.post(`get_item_by_all_types`, obj).then((res) => {
    dispatch(
      {
        type: GET_ITEM_ALL_TYPE,
        payload: res.data.data
      }
    )
  })
}

export const GetItemId = (obj, id) => (dispatch) => {
  userClient.post(`get_data_by_slug/${id}`, obj).then((res) => {
    dispatch(
      {
        type: GET_ITEM_ID,
        payload: res.data.data,
        itemview: res.data.itemviews.itemsviews
      })
  })
}

export const getRelatedProducts = (obj) => (dispatch) => {
  userClient.post(`get_related_product`, obj).then((res) => {
    dispatch(
      {
        type: GET_RELATED_PRODUCTS,
        payload: res.data.data
      })
  })
}

export const getBoughtProducts = (obj) => (dispatch) => {
  userClient.post(`buyer_notification`, obj).then((res) => {
    dispatch(
      {
        type: GET_BOUGHT_PRODUCTS,
        payload: [...res.data.data.filter((p) => p?.buyer_id == loggedInUser?.id)]
      })
  })
}

export const getNotifications = (obj, setNotifications) => (dispatch) => {
  userClient.post(`buyer_notification`, obj).then((res) => {
    setNotifications(res.data.data)
    dispatch(
      {
        type: GET_NOTIFICATION_LISTING,
        payload: res.data.data
      })
  })
}

export const setNotificationSeen = (obj, formdata1, setNotifications) => (dispatch) => {
  userClient.post(`buyer_seller_seen`, obj).then((res) => {
    dispatch(getNotifications(formdata1, setNotifications))
    dispatch(
      {
        type: SET_BUYSELL_NOTIFICATION_SEEN,
      })
  })
}

export const getMessageNotifications = (obj, setMsg_Notifications) => (dispatch) => {
  userClient.post(`get_msg_notification`, obj).then((res) => {
    setMsg_Notifications(res.data.data)
    dispatch(
      {
        type: GET_MESSAGE_NOTIFICATION_LISTING,
        payload: res.data.data
      })
  })
}

export const setMessageNotificationSeen = (obj) => (dispatch) => {
  userClient.post(`msg_notification_seen`, obj).then((res) => {
    dispatch(
      {
        type: SET_MESSAGE_NOTIFICATION_SEEN,
      })
  })
}

export const seenMessages = (obj) => (dispatch) => {
  userClient.post(`seen_message`, obj).then((res) => {
    dispatch(
      {
        type: SEEN_MESSAGES
      })
  })
}

export const storeReview = (obj, handleClose) => (dispatch) => {
  userClient.post(`user/storereview`, obj).then((res) => {
    handleClose();
    dispatch(
      {
        type: STORE_REVIEWS,
      })
  })
}

export const getLowToHighReviews = (id, setReviews) => (dispatch) => {
  userClient.get(`asc_ratings/${id}`).then((res) => {
    setReviews(res.data.data);
    dispatch(
      {
        type: GET_LOW_TO_HIGH_REVIEWS,
        payload: res.data.data
      })
  })
}

export const getHighToLowReviews = (id, setReviews) => (dispatch) => {
  userClient.get(`desc_ratings/${id}`).then((res) => {
    setReviews(res.data.data);
    dispatch(
      {
        type: GET_HIGH_TO_LOW_REVIEWS,
        payload: res.data.data
      })
  })
}

export const getRecentReviews = (id, setReviews) => (dispatch) => {
  userClient.get(`getreview_created_by_item/${id}`).then((res) => {
    setReviews(res.data.data);
    dispatch(
      {
        type: GET_RECENT_REVIEWS,
        payload: res.data.data
      })
  })
}

export const userStoreReport = (obj, handleClose) => (dispatch) => {
  userClient.post(`user/store_report`, obj).then((res) => {
    handleClose();
    dispatch(
      {
        type: USER_SET_REPORT,
      })
  })
}

export const userStoreContactUs = (obj, show, setShow) => (dispatch) => {
  userClient.post(`user/set_contact_us`, obj).then((res) => {
    setShow(!show)
    dispatch(
      {
        type: USER_STORE_CONTACT_US,
      })
  })
}