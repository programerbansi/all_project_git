const storeToken= (value)=>{
    localStorage.setItem('token',value)
}

const getToken=()=>{
    let token=localStorage.getItem('token')
    return token
}

const removeToken=()=>{
    localStorage.removeItem('token')
}

const storeRole = (value) =>{
    localStorage.setItem('role', value);
  }
  const getRole = () => {
    let role = localStorage.getItem('role');
    return role;
  }
  const removeRole = ()=>{
    localStorage.removeItem('role');
  }

  const storeUser = (value) =>{
    localStorage.setItem('user', JSON.stringify(value));
  }
  const getUser = () => {
    return  JSON.parse(localStorage.getItem('user'));
  }
  const removeUser = ()=>{
    localStorage.removeItem('user');
  }

  export {storeToken, getToken, removeToken , storeRole , getRole , removeRole ,storeUser , getUser , removeUser}