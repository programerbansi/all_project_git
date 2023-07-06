import axios from "axios";

const client=   axios.create({
    // baseURL:'http://192.168.1.2:8000/api/admin/',
    baseURL:'https://api-dentalvig.cuotainfotech.com/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':
        {
            toString () {
              return `Bearer ${localStorage.getItem('admin-login')}`
            }
        }
}});

client.interceptors.response.use( response => {
  return response;
}, error => {
  if(error.response.status == 401)
  {
      localStorage.clear();
      window.location.reload();
      window.location.href  = 'https://dentalvig.cuotainfotech.com/admin'
      // swal({
      //     icon: "warning",
      //     text: error.response.data.message,  
      //     closeOnClickOutside: false,
      //   }).then(function() {
      //     localStorage.clear();
      //     window.location.reload();
      //     window.location.href  = 'https://dentalvig.cuotainfotech.com/'
      // });
  }
  return Promise.reject(error);
});

export default client;
