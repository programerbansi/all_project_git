const storeAdminToken = (value) => {
    localStorage.setItem('admin-token', value)
  }
  const getAdminToken = () => {
    let token = localStorage.getItem('admin-token')
    return token
  }
  const removeAdminToken = () => {
    localStorage.removeItem('admin-token')
  }
  const storeAdminRole = (value) => {
    localStorage.setItem('admin-role', value)
  }
  const getAdminRole = () => {
    let role = localStorage.getItem('admin-role')
    return role
  }
  const removeAdminRole = () => {
    localStorage.removeItem('admin-role')
  }
  const storeLoggedInAdmin =(value) => {
    localStorage.setItem('loggedIn-admin',JSON.stringify(value));
  }
  const getLoggedInAdmin = () =>{
    return  JSON.parse(localStorage.getItem('loggedIn-admin'));
  }
  const removeLoggedInAdmin = () => {
    localStorage.removeItem('loggedIn-admin')
  }
  
  export {storeAdminToken,getAdminToken,removeAdminToken,storeAdminRole,getAdminRole,removeAdminRole,storeLoggedInAdmin,getLoggedInAdmin, removeLoggedInAdmin }