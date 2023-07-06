  const storeAdminToken = (value) => {
    localStorage.setItem('admin-login', value)
  }
  const getAdminToken = () => {
    let token = localStorage.getItem('admin-login')
    return token
  }
  const removeAdminToken = () => {
    localStorage.removeItem('admin-login')
  }
  const app_name = 'DENTOMED';

  export {storeAdminToken,getAdminToken,removeAdminToken,app_name}