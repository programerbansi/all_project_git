const storeToken = (value) => {
    localStorage.setItem('auth', value)
  }
  const getToken = () => {
    let token = localStorage.getItem('auth')
    return token
  }
  const removeToken = (value) => {
    localStorage.removeItem(value)
  }
  export { storeToken, getToken, removeToken}