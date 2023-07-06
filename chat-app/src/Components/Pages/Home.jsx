import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../Services/LocalStorage';
import '../Styles/Home.css';

function Home() {
  let token = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if(token)
    {
      navigate('/dashboard');
    }
  }, [token])
  
  return (
    <div className='container-fluid home-block p-0'>
      <div className="row w-100 m-0">
        <div className="col-12 w-100 p-0">
          <img src={require('../Assets/bg_image2.png')} alt="photo" className='w-100'/>
        </div>
      </div>
    </div>
  )
}

export default Home