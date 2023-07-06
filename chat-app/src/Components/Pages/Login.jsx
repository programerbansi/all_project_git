import React,{useState , useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
// import { Timestamp } from 'firebase/firestore';
import { auth ,db} from '../Services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { storeToken ,getToken } from '../Services/LocalStorage';
import { updateDoc,doc } from 'firebase/firestore';

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState('')
  const[loading,setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit =async (data) => {
    console.log(data);
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((response) => {
      console.log(response.user,'...res-user.....');
      updateDoc(doc(db,'users',response.user.uid),{
        isOnline:true,
    })
      storeToken(response.user.accessToken);
      navigate('/dashboard');
      setLoading(false);
    }).catch((error) => {
      setError('User not found !');
    })
    setError('');

    reset();
  }

  let token = getToken();
  useEffect(() => {
    token ? navigate('/dashboard') : navigate('/login')
}, [token])


  return (
    <div className="block">
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
                  <div className="d-flex bg-light justify-content-between w-100 form-control">
                    <button className='btn btn-outline-primary' type='submit'>{loading ? 'Logging in...' : 'Log In'}</button>
                    <p>Don't have an Account ? <NavLink to='/login' className='text-decoration-none'> Register</NavLink></p>
                  </div>
                </div>
              </form>
            </div>
            <span className='text-danger'>{error}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login