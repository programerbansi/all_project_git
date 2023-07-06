const storeToken = (value) => {
    localStorage.setItem('jiraToken', value)
  }
  const getToken = () => {
    let token = localStorage.getItem('jiraToken')
    return token
  }
  const removeToken = () => {
    localStorage.removeItem('jiraToken')
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

  const storeLocation = (value) =>{
    localStorage.setItem('location',value)
  }

  const removeLocation = () =>{
    localStorage.removeItem('location');
  }

  const getLocation = () =>{
    let location = localStorage.getItem('location');
    return location
  }

  const storeProjectId = (value) =>{
    localStorage.setItem('projectId',value)
  }

  const getProjectId = () =>{
    let id = JSON.parse(localStorage.getItem('projectId'));
    return id;
  }

  const removeProjectId = () =>{
    localStorage.removeItem('projectId');
  }

  const storeUserTicket = (value) =>{
    localStorage.setItem('userTicket',value)
  }

  const getUserTicket = () =>{
    let ticket = JSON.parse(localStorage.getItem('userTicket'));
    return ticket;
  }

  const removeUserTicket = () =>{
    localStorage.removeItem('userTicket');
  }

  export { storeToken, getToken, removeToken , storeRole , getRole , removeRole ,getLocation ,removeLocation,storeLocation,storeProjectId ,getProjectId , removeProjectId ,storeUserTicket ,getUserTicket ,removeUserTicket}