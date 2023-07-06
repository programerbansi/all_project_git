const storeUserToken = (value) => {
    localStorage.setItem('user-token', value)
  }
  const getUserToken = () => {
    let token = localStorage.getItem('user-token')
    return token
  }
  const removeUserToken = () => {
    localStorage.removeItem('user-token')
  }
  const storeUserRole = (value) => {
    localStorage.setItem('user-role', value)
  }
  const getUserRole = () => {
    let role = localStorage.getItem('user-role')
    return role
  }
  const removeUserRole = () => {
    localStorage.removeItem('user-role')
  }
  const storeLoggedInUser =(value) => {
    localStorage.setItem('loggedIn-user',JSON.stringify(value));
  }
  const getLoggedInUser = () =>{
    return  JSON.parse(localStorage.getItem('loggedIn-user'));
  }
  const removeLoggedInUser = () => {
    localStorage.removeItem('loggedIn-user')
  }

  const storeForgotEmail =(value) => {
    localStorage.setItem('forgotEmail',JSON.stringify(value));
  }
  const getForgotEmail = () =>{
    return  JSON.parse(localStorage.getItem('forgotEmail'));
  }
  const removeForgotEmail = () => {
    localStorage.removeItem('forgotEmail')
  }

  const storeSendMobile =(value) => {
    localStorage.setItem('sendMobile',JSON.stringify(value));
  }
  const getSendMobile = () =>{
    return  JSON.parse(localStorage.getItem('sendMobile'));
  }
  const removeSendMobile = () => {
    localStorage.removeItem('sendMobile')
  }

  const storeMobileNo =(value) => {
    localStorage.setItem('mobileNo',JSON.stringify(value));
  }
  const getMobileNo = () =>{
    return  JSON.parse(localStorage.getItem('mobileNo'));
  }
  const removeMobileNo = () => {
    localStorage.removeItem('mobileNo')
  }
  export {storeUserToken,getUserToken,removeUserToken,storeUserRole,getUserRole,removeUserRole,storeLoggedInUser,getLoggedInUser, removeLoggedInUser ,removeForgotEmail,getForgotEmail,storeForgotEmail,
    removeSendMobile,getSendMobile,storeSendMobile, removeMobileNo,getMobileNo,storeMobileNo}