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
const storeStatus =(value) => {
  localStorage.setItem('state-status',JSON.stringify(value));
}
const getStatus = () =>{
  return  JSON.parse(localStorage.getItem('state-status'));
}
const removeStatus = () => {
  localStorage.removeItem('state-status')
}

export {removeStatus,getStatus,storeStatus,storeUserToken,getUserToken,removeUserToken,storeUserRole,getUserRole,removeUserRole,storeLoggedInUser,getLoggedInUser, removeLoggedInUser }