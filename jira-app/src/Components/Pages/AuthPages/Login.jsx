import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../Styles/Signup.css';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { storeToken, getToken, storeRole, getRole } from '../../../Services/LocalStorage';
import { db, auth } from '../../../Services/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { ValAuthContext } from '../../Context/ValContext';
import Header from '../AuthPages/Header';

function Login() {

  const [admin,setAdmin] = useState([]);
  const val = useContext(ValAuthContext);
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    if (!val.toggle) {
      document.getElementById('block').style.opacity = '0.3';
    }
    else {
      document.getElementById('block').style.opacity = '1';
    }
  }, [val.toggle]);

  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [users,setUsers] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const unsub = onSnapshot(query(usersCollectionRef), (querySnapshot) => {
      let Users = [];
      querySnapshot.forEach((doc) => {
        Users.push(doc.data());
      })
      setUsers(Users)
    })
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db,'admin')), (querySnapshot) => {
      let admin = [];
      querySnapshot.forEach((doc) => {
        admin.push(doc.data());
      })
      setAdmin(admin)
    })
    return () => unsub();
  }, []);

  console.log(admin,'.....admin....');
  const onSubmit = async (data) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((response) => {
      console.log(response.user,'...res-user.....');
      storeToken(response.user.accessToken);
      users.forEach((user)=>{
        if(user.uid == response.user.uid)
        {
          storeRole(`${user.role}`);
          navigate(`/${user.role}Dashboard`);
        }
      });
      admin.forEach((admin)=>{
        if(admin.uid == response.user.uid)
        {
          storeRole(`${admin.role}`);
          navigate(`/${admin.role}Dashboard`);
        }
      })
      setLoading(false);
    }).catch((error) => {
      setError('User not found !');
    })
    setError('');
    reset();
  }

  let token = getToken();
  let role = getRole();
  useEffect(() => {
    token && role ? navigate(`/${role}Dashboard`) : navigate('/login')
  }, [])

  return (
    <>
    <Header />
    <div className="block" id='block'>
      <div className='signup-form'>
        <div className="container">
          <div className="row w-100 m-0">
            <div className="card p-0">
              <div className="card-title bg-light p-2">
                <h6 className='text-center text-secondary'>WelCome Back !! Log In</h6>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                  <div className="form-floating mb-3">
                    <input type="text" className={classNames("form-control", { 'is-invalid': errors.email })} id="floatingInput" placeholder="Email" name='email'
                      {...register("email", {
                        required: '** This field is required !!',
                        pattern: {
                          value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: '** Invalid Email !!'
                        }
                      })}
                    />
                    <label htmlFor="floatingInput">Email</label>
                    {errors.email && (<span className='text-danger form-text invalid-feedback'>{errors.email.message}</span>)}
                  </div>
                  <div className="form-floating">
                    <input type="password" className={classNames("form-control", { 'is-invalid': errors.password })} id="floatingPassword" placeholder="Password" name='password'
                      {...register("password", {
                        required: '** This field is required !!',
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                          message: '** Minimum 6 characters, at least one letter and one number!!'
                        }
                      })}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password && (<span className='text-danger form-text invalid-feedback'>{errors.password.message}</span>)}
                  </div>
                </div>
                <div className="card-footer bg-light p-2">
                  <div className=" bg-light justify-content-between w-100 form-control">
                    <div className="row">
                      <div className="col-sm-6 m-0">
                        <button className='btn btn-outline-primary' type='submit'>{loading ? 'Logging in...' : 'Log In'}</button>
                      </div>
                      <div className="col-sm-6 mt-1 m-sm-0">
                        <p>Don't have an Account ? <NavLink to='/signup' className='text-decoration-none'> Register</NavLink></p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <span className='text-danger'>{error}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login