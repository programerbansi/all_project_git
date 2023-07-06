import React from 'react'
import TextField from '../../InputFunction/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import '../../../Css/ForgotPassword.css'
import Button from '../../InputFunction/Button'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { USER_LOGIN } from '../../../../services/UserRoutePath'
import SnackBar from '../../../../admin/Actions/SnackBar'
import { useDispatch } from 'react-redux'
import { userResetPassword } from '../../../../redux/actions/UserEcommerceAction'
import { getForgotEmail } from '../../../../services/LocalStorageUser'
import { FaEye,FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [error, setError] = useState('');
    const [status, setStatus] = useState(false);
    const [eyeShow,setEyeShow]=useState(false);
    const [type,setType]=useState("password");
    const [eyeShow1,setEyeShow1]=useState(false);
    const [type1,setType1]=useState("password");
    let { token } = useParams();
    let forgotEmail = getForgotEmail();

    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setTouched, setErrors } = useFormik({
        initialValues: {
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: yup.object({
            password: yup.string().min(8, 'Password must be 8 character length!').required('Enter new password'),
            passwordConfirmation: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match!').required('Confirm password'),
        }),

        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            dispatch(userResetPassword({ newpassword: values.password, confirmpassword: values.passwordConfirmation, token: token, email: forgotEmail }, setMessage, setError, setStatus, navigate))
        }
    })

    const handleCancel = () => {
        setTouched({}, false);
        setErrors({}, false);
    }
    const handleEyeIcon = () =>{
        if(type == 'password') setType('text')
        else if(type == 'text') setType('password')
        setEyeShow(!eyeShow);
    }
    const handleEyeIcon1 = () =>{
        if(type1 == 'password') setType1('text')
        else if(type1 == 'text') setType1('password')
        setEyeShow1(!eyeShow1);
    }
    return (
        <div className='container-fluid forgot-password-banner'>
            <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            <div className="row h-100 align-items-center justify-content-center my-auto">
                <div className="col-xl-4 col-md-6 col-12 text-center">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <h4 className="card-title mb-3">Reset Password</h4>
                                <div className="form-group mb-3">
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
                                <div className="form-group">
                                    <TextField
                                        id='passwordConfirmation'
                                        name="passwordConfirmation"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        type={type1}
                                        event={handleChange}
                                        event1={handleBlur}
                                        value={values.passwordConfirmation}
                                        error={errors.passwordConfirmation}
                                        touch={touched.passwordConfirmation}
                                    />
                                       {eyeShow1 == true? <FaEye className='eye-slash' onClick={handleEyeIcon1}/>:values.passwordConfirmation.length >= 8 ?<FaEyeSlash className='eye-slash' onClick={handleEyeIcon1}/> :null}
                           
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-6 col-sm-4 px-3">
                                        <Button type="submit" className="btn btn-sm btn-primary px-3 py-2 w-100" icon="fas fa-key" name="reset" />
                                    </div>
                                </div>
                                <div className="d-flex w-100">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword