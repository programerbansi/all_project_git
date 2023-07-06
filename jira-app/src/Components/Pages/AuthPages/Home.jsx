import React,{useEffect,useContext} from 'react';
import '../../Styles/Home.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ValAuthContext } from '../../Context/ValContext';
import Header from '../AuthPages/Header';
import { getRole, getToken } from '../../../Services/LocalStorage';

function Home() {

  const val = useContext(ValAuthContext);
  const navigate = useNavigate();
  let role =  getRole();
  let token = getToken();

  useEffect(() => {
    if (!val.toggle) {
      document.getElementById('block').style.opacity = '0.3';
    }
    else {
      document.getElementById('block').style.opacity = '1';
    }
  }, [val.toggle]);

  useEffect(()=>{
    if(token && role){
      navigate(`/${role}Dashboard`)
    }
    else
    {
      navigate('/');
    }
  },[])

  return (
    <>
    <Header />
    <div id='block'>
      <div className="container-fluid home_block1">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4  offset-md-1">
            <h1>
              Move fast, stay aligned, and build better - together
            </h1>
            <h4>
              The #1 software development tool used by agile teams
            </h4>
            <NavLink className='btn btn-primary' to='/signup'>Get it free</NavLink>
          </div>
          <div className="col-md-6 mt-2 mt-md-0">
            <img src={require('../../Assets/hero-illustration.png')} alt="photo" className='w-100' />
          </div>
        </div>
      </div>
      <div className="container-fluid home_block2 pt-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={require('../../Assets/diagram.png')} alt="photo" className='w-100 h-100' />
          </div>
          <div className="col-md-4 block2-content offset-md-1">
            <h1>Let developers focus on code</h1>
            <p>Developers want to focus on code, not update issues. We get it! Open DevOps makes it easier to do both regardless of the tools you use. Now developers can stay focused and the business can stay aligned.</p>
            <button className='btn'>Explore More</button>
            <h6 className='mt-5'>HOW CUSTOMERS ARE BENEFITING</h6>
            <p>
              <img src={require('../../Assets/FLO_logo.png')} alt="logo" style={{}} />
            </p>
            <h3>900 %</h3>
            <h6>increase in deployments</h6>
            <h3>50%</h3>
            <h6>decrease in cycle time</h6>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
