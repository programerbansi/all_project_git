import {React,useContext} from 'react'
import TextField from '../../InputFunction/TextField'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import '../../../Css/ForgotPassword.css'
import Button from '../../InputFunction/Button'
import { useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '../../../../services/UserRoutePath'
import { useDispatch } from 'react-redux'
import { userForgotPassword } from '../../../../redux/actions/UserEcommerceAction'
import SnackBar from '../../../../admin/Actions/SnackBar'

const ForgottenPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [message,setMessage]=useState();
    const [error, setError] = useState('');
    const [status,setStatus]=useState(false);
    
    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setTouched, setErrors } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid Email address').required("Email is required"),
        }),

        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            dispatch(userForgotPassword({email:values.email},setMessage,setError,setStatus,navigate))
        }
    })

    const handleCancel = () => {
        setTouched({}, false);
        setErrors({}, false);
        navigate(USER_LOGIN)
    }
    return (
        <div className='container-fluid forgot-password-banner'>
            <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            <div className="row h-100 align-items-center justify-content-center my-auto">
                <div className="col-xl-4 col-md-6 col-12 text-center">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <h4 className="card-title mb-3">Forgot Password</h4>
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
                                <div className="row justify-content-start w-100 m-0">
                                    <div className="col-md-6 col-sm-4">
                                        <Button userEvent="button" type='button' event={handleCancel} className="btn btn-sm btn-secondary px-3 py-2 w-100" icon="fas fa-backspace" name="cancel" />
                                    </div>
                                    <div className="col-md-6 col-sm-4">
                                        <Button type="submit" className="btn btn-sm btn-primary px-3 py-2 w-100" icon="far fa-envelope" name="submit" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgottenPassword