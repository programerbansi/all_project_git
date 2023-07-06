import React, { useContext, useEffect } from 'react'
import TextField from '../InputFunction/TextField'
import { useFormik, yupToFormErrors } from 'formik';
import * as yup from 'yup'
import Button from '../InputFunction/Button';
import '../../Css/Login.css'
import { useCallback, useRef, useState } from "react";
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { storeUserRole, storeUserToken } from '../../../services/LocalStorageUser';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { userLogin ,userSocialLogin} from '../../../redux/actions/UserEcommerceAction';
import { useDispatch } from 'react-redux';
import ToastAction from '../Action/ToastAction';
import SnackBar from '../../../admin/Actions/SnackBar';
import { ValAuthContext } from '../../../admin/context/ValContext';
import { USER_FORGOTTEN_PASSWORD } from '../../../services/UserRoutePath';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
const Login = () => {
    const val = useContext(ValAuthContext);
    const [provider, setProvider] = useState("");
    const [profile, setProfile] = useState();
    const [loading,setLoading]=useState(false)
    const [check,setCheck]=useState(false);
    const [chechmsg,setCheckmsg]=useState();
    const [message,setMessage]=useState();
    const [status,setStatus]=useState(false);
    const [error, setError] = useState('');
    const [eyeShow,setEyeShow]=useState(false);
    const [type,setType]=useState("password");
    const location=useLocation();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLoginStart = useCallback(() => {
        // alert("login start");
    }, []);

    const onLogoutFailure = useCallback(() => {
        // alert("logout fail");
    }, []);

    const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider("");
        // alert("logout success");
    }, []);
    useEffect(()=>{
        if(profile && provider)
        {
            dispatch(userSocialLogin({email:profile.email,social_user_id:profile.id,login_type:provider},navigate,setLoading,setMessage, setError, setStatus))
        }

    },[profile,provider])

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid Email address').required("Email is required"),
            password: yup.string().min(8, 'Password must be 8 character length').required('Password is required!'),
        }),

        onSubmit: (values, { resetForm }) => {      
            setLoading(true);
            dispatch(userLogin({email:values.email,password:values.password},navigate,setLoading,setMessage, setError, setStatus));                 
        }
    })
    const handleEyeIcon = () =>{
        if(type == 'password') setType('text')
        else if(type == 'text') setType('password')
        setEyeShow(!eyeShow);
    }

    return (
        <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>   
            <div className="user-form-title">
                <h2>Welcome!</h2>
                <p>Use credentials to access your account.</p>
            </div>
            {/* <ul className="user-form-option" style={{cursor:"pointer"}}>
                <LoginSocialFacebook
                    // ref={facebookRef}
                    callbackURL='https://dentalvig.cuotainfotech.com/'
                    appId={"1446503589179610"}
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }) => {
                        setProvider(provider);
                        setProfile(data);
                        console.log(data, "data");
                        console.log(provider, "provider");
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                >
                    <div className='facebook'>
                        <li><i className="fab fa-facebook-f" /><span>facebook</span></li>
                    </div>
                </LoginSocialFacebook>

               {location.pathname == "/login"?
                <LoginSocialGoogle
                    // ref={googleRef}
                    client_id="649839634213-62qurlf4b7i5p7hgfo4ro7phft298nne.apps.googleusercontent.com"
                    scope='https://www.googleapis.com/auth/userinfo.email'
                    onLogoutFailure={onLogoutFailure}
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }) => {
                        setProvider(provider);
                        setProfile(data);
                        // console.log(data, "data");
                        // console.log(provider, "provider");
                    }}
                    onReject={(err) => {
                        console.log("hbhbdhd", err);
                    }}
                >
                    <div className='google'>
                        <li><i className="fab fa-google" /><span>google</span></li>
                    </div>
                </LoginSocialGoogle>
         :null}
            </ul> */}
            {/* <div className="user-form-devider">
                <p>or</p>
            </div> */}

            <form onSubmit={handleSubmit}>
            { error ? <Alert  className='mb-3 p-2 border border-danger' variant="danger">
                             {message}
                        </Alert> : null}
              
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <TextField
                                id='email'
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                type="text"
                                event={handleChange}
                                event1={handleBlur}
                                value={values.email}
                                error={errors.email}
                                touch={touched.email}
                            />             
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <TextField
                                id='password'
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                type={type}
                                event={handleChange}
                                event1={handleBlur}
                                value={values.password}
                                error={errors.password}
                                touch={touched.password}
                            />
                               {eyeShow == true? <FaEye className='eye-slash' onClick={handleEyeIcon}/>:values.password.length >= 8 ?<FaEyeSlash className='eye-slash' onClick={handleEyeIcon}/> :null}
                           

                    
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="signin-check" />
                                <label className="custom-control-label" htmlFor="signin-check" >Remember me</label></div>
                             
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group text-right"><NavLink to={USER_FORGOTTEN_PASSWORD} className="form-forgot">Forgot password?</NavLink>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <Button type="submit" className=" btn btn-inline" icon="fas fa-unlock" name="Enter your account"/>
                       
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login