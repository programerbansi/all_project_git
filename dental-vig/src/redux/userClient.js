import axios from "axios";
import swal from 'sweetalert';

const url = 'https://api-dentalvig.cuotainfotech.com'

const userClient =  axios.create({
    // baseURL:'http://192.168.1.2:8001/api/',
    baseURL: `${url}/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': {
            toString() {
                return `Bearer ${localStorage.getItem('user-token')}`
            }
        }
    }
});

userClient.interceptors.response.use( response => {
    return response;
  }, error => {
    if(error.response.status == 401)
    {
        localStorage.clear();
        window.location.reload();
        window.location.href  = url

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

export default userClient;

