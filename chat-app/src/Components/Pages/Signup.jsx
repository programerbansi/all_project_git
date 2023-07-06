import React,{useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { auth, db } from '../Services/firebase';
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc ,Timestamp} from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading,setLoading] =useState(false);

  const onSubmit =async (data) => {
    console.log(data)
    setLoading(true);
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password).then((res) => {
      console.log(res);
      toast.success('Account created successfully !!');
      setDoc(doc(db,'users',res.user.uid),{
        uid:res.user.uid,
        email:data.email,
        name:data.fname,
        createdAt:Timestamp.fromDate(new Date()),
        isOnline:false,
        count:1,
      })
      setTimeout(() => navigate('/login'), 1000);
    }).catch((error) => {
      console.log(error);
    })
    user();
    
    reset();
  }
  return (
    <>
      <div className="block">
        <div className='signup-form'>
          <div className="container">
            <div className="row w-100 m-0">
              <div className="card p-0">
                <div className="card-title bg-light p-2">
                  <h5 className='text-center text-secondary'>Create an Account</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="card-body">
                    <div className="form-floating mb-3">
                      <input type="text" id="floatingInput" placeholder="Name" name='fname'
                        className={classNames("form-control", { 'is-invalid': errors.fname })}
                        {...register("fname", {
                          required: '** This field is required !!',
                          minLength: {
                            value: 2,
                            message: '** Minimum 2 characters!!'
                          }
                        })}
                      />
                      <label htmlFor="floatingInput">Name</label>
                      {errors.fname && (<span className='text-danger form-text invalid-feedback'>{errors.fname.message}</span>)}
                    </div>
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
                    <button className='btn btn-outline-primary' type='submit'>{loading ? 'Signing up...' : 'Sign Up'}</button>
                    <p>Already have an  Account ? <NavLink to='/login' className='text-decoration-none'> Login</NavLink></p>
                    <ToastContainer/>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup