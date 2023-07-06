import axios from "axios";
// const baseUrl = 'http://localhost:8000/api'
const baseUrl = `https://admin.bridgelinebilling.com:8000/api`

export const AdminClient=   axios.create({
    baseURL:baseUrl,
    headers:{
        // 'Accept':'application/json',
        // 'Content-Type':'application/json',
        'Authorization':
        {
            toString () {
              return `Bearer ${localStorage.getItem('admin-token')}`
            }
        }
}});
 
AdminClient.interceptors.response.use( response => {
  return response;
}, error => {
  if(error.response.status == 401)
  {  
      localStorage.clear();
      window.location.reload();
      window.location.href  = 'https://app.bridgelinebilling.com/admin/login'
     
  }
  return Promise.reject(error);
});