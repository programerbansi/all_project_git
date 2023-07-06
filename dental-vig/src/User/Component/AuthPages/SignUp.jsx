import React, { useContext, useEffect } from 'react'
import { useFormik, yupToFormErrors } from 'formik';
import * as yup from 'yup'
import TextField from '../InputFunction/TextField'
import Button from '../InputFunction/Button';
import { useCallback, useRef, useState } from "react";
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login';
import { GoogleLogin } from 'react-google-login';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getLoggedInUser, getMobileNo, getSendMobile, storeUserSRole, storeUserSToken } from '../../../services/LocalStorageUser';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { userLogin, userRegister, userSendMobileNo } from '../../../redux/actions/UserEcommerceAction';
import { useDispatch } from 'react-redux';
import { userSocialLogin } from '../../../redux/actions/UserEcommerceAction';
import SnackBar from '../../../admin/Actions/SnackBar';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../Css/InputFunction.css"
import Alert from 'react-bootstrap/Alert';
import { MdVerified } from 'react-icons/md';
import MobileOtp from '../Action/MobileOtp';
import { UserValAuthContext } from '../Context/UserValContext';
import swal from 'sweetalert'
import { app_name } from '../../../services/LocalStorage';
import VerifyNumber from '../Modal/VerifyNumber';
const SignUp = () => {
    const [provider1, setProvider1] = useState("");
    const [profile1, setProfile1] = useState();
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();
    const [error, setError] = useState('');
    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);
    const [chechmsg, setCheckmsg] = useState();
    const [emailveri, setEmailveri] = useState(false);
    const [eyeShow, setEyeShow] = useState(false);
    const [type, setType] = useState("password");
    const [eyeShow1, setEyeShow1] = useState(false);
    const [type1, setType1] = useState("password");

    const [openVerifyModal, setOpenVerifyModal] = useState(false);

    let user = getLoggedInUser();
    let mobileverify = getSendMobile();
    let mobileNo = getMobileNo();
    const val = useContext(UserValAuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLoginStart = useCallback(() => {
    }, []);

    const onLogoutFailure = useCallback(() => {
    }, []);
    const onLogoutSuccess = useCallback(() => {
        setProfile1(null);
        setProvider1("");
        alert("logout success");
    }, []);
    useEffect(() => {
        if (profile1 && provider1) {
            dispatch(userSocialLogin({ email: profile1.email, social_user_id: profile1.id, login_type: provider1 }, navigate, setLoading, setMessage))
        }

    }, [profile1, provider1])
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            name: '',
            email: "",
            phonenumber: '',
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: yup.object({
            name: yup.string().required('name is required!'),
            email: yup.string().email('Enter valid Email! ').required("Enter an email!"),
            phonenumber: yup.string()
                .required('phone-number is required!')
                .matches(/^[0-9]+$/, "must be only digits")
                .min(10, 'must be exactly 10 digits')
                .max(10, 'must be exactly 10 digits'),
            password: yup.string().min(8, 'Password must be 8 character length!').required('Enter a password!'),
            // passwordConfirmation: yup.string()
            //     .oneOf([yup.ref('password'), null], 'Passwords must match!').required('Enter a repeat password!'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (check == true) {
                var checkid = document.getElementById("signup-check").id;
                console.log(checkid)
                setLoading(true);
                
                dispatch(userRegister({ email: values.email, password: values.password, name: values.name, phone: `+91${values.phonenumber}` }, navigate, setLoading, setMessage, setError, setStatus, resetForm, checkid, setEmailveri, setOpenVerifyModal, val.setFlagOtp))
            }
            else {
                setCheckmsg("Please agree to all the terms and conditions of dental vig");
            }
        }
    })
    const checkClick = () => {
        let check = document.getElementById("signup-check");
        setCheck(check.checked)
    }

    const handleEyeIcon = () => {
        if (type == 'password') setType('text')
        else if (type == 'text') setType('password')
        setEyeShow(!eyeShow);
    }
    const handleEyeIcon1 = () => {
        if (type1 == 'password') setType1('text')
        else if (type1 == 'text') setType1('password')
        setEyeShow1(!eyeShow1);
    }
    let verifyButtonId = document.getElementById("verify");
    const handleOtp = () => {
        const formdata = new FormData();
        formdata.append('phone', `+91${values.phonenumber}`);
        dispatch(userSendMobileNo(user?.id, formdata, navigate, setMessage, setError, setStatus, val.setFlagOtp, verifyButtonId))
    }
   
    useEffect(() => {
        if (val.flagOtp) { verifyButtonId?.click(); }
    }, [val.flagOtp])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                val.flagOtp && <MobileOtp />
            }

            <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            <VerifyNumber open={openVerifyModal} setOpen={setOpenVerifyModal} />
            <div className="user-form-title">
                <h2>Register</h2>
                <p>Setup a new account in a minute.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        {error ? <Alert className='mb-3' variant="danger">
                            {message}
                        </Alert> : null}
                        <div className="form-group">
                            <TextField
                                id='name'
                                name="name"
                                placeholder="name"
                                className="form-control"
                                type="text"
                                error={errors.name}
                                event={handleChange}
                                event1={handleBlur}
                                touch={touched.name}
                                value={values.name}
                            />
                        </div>
                    </div>
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
                            {eyeShow == true ? <FaEye className='eye-slash' onClick={handleEyeIcon} /> : values.password.length >= 8 ? <FaEyeSlash className='eye-slash' onClick={handleEyeIcon} /> : null}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <div className='w-100'>
                                <TextField
                                    style={{ paddingRight: '0px' }}
                                    id='phonenumber'
                                    name="phonenumber"
                                    placeholder="phone-number"
                                    className="form-control ps-0"
                                    type="text"
                                    event={handleChange}
                                    event1={handleBlur}
                                    value={values.phonenumber}
                                    error={errors.phonenumber}
                                    touch={touched.phonenumber}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mt-4">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="signup-check" onClick={checkClick} />

                                <label className="custom-control-label" htmlFor="signup-check">I agree to the all <a href="#"> terms &amp; consitions</a> of {app_name}.</label>
                            </div>
                            {check == false ? <span className='text-danger'>{chechmsg}</span> : null}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <Button type="submit" className="btn btn-inline" icon="fas fa-user-check" name="Create new account" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUp