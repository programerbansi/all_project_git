import React, { useEffect, useState } from 'react'
import '../../css/Login.css'
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup'
import InputLabel from '../function/InputLabel';
import InputText from '../function/InputText';
import InputButton from '../function/InputButton';
import BackDrop from '../function/BackDrop';
import { getLoggedInUser, getUserToken } from '../../../services/UserLocalStorage';
import { HOME, INVOICE, LOGIN, REPORT, TEAM } from '../../../services/UserRoutePath';
import { login } from '../../../redux/action/Action';
import { getAdminRole, getAdminToken, getLoggedInAdmin } from '../../../services/AdminLocalStorage';
import { ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_JOB_TYPE, ADMIN_LOGIN, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_TEAM, ADMIN_USER } from '../../../services/AdminRoutePath';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { slug_id } = useParams();
    let userToken = getUserToken()
    let user = getLoggedInUser()
    let adminToken=getAdminToken()
    let admin=getLoggedInAdmin()
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            email: "",
            // username: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid Email address!').required("Email is required!"),
            // username: yup.string().required('Username is required!'),
            password: yup.string().min(6, 'Password must be 6 character length!').required('Password is required!'),
        }),

        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            dispatch(login({ email: values.email, password: values.password }, setLoading, navigate, setError));
            resetForm({ values: '' });
        }
    })

    useEffect(() => {
        if(!user && !userToken && !admin && !adminToken)
        {
            if(location?.state?.statePath == "/user") return navigate(LOGIN)
            else if(location?.state?.statePath == "/admin") return navigate(ADMIN_LOGIN)
            else return navigate(LOGIN)
        }
        else
        {
            if (user && userToken && user?.status?.includes(1)) return  navigate(HOME)
            else if (user && userToken && user?.status?.includes(2)) return  navigate(INVOICE)
            else if (user && userToken && user?.status?.includes(3)) return  navigate(REPORT)
            else if (user && userToken && user?.status?.includes(4)) return  navigate(TEAM)
            else if (user && userToken && user?.status?.includes(2)) return  navigate(`/invoice/${slug_id}`)
            else { 
                if(admin?.status?.includes(1) && adminToken) return navigate(ADMIN_DASHBOARD)
                else if(admin?.status?.includes(2) && adminToken) return navigate(ADMIN_INVOICE)
                else if(admin?.status?.includes(3) && adminToken) return navigate(ADMIN_ORDERS)
                else if(admin?.status?.includes(4) && adminToken) return navigate(ADMIN_USER)
                else if(admin?.status?.includes(5) && adminToken) return navigate(ADMIN_TEAM)
                else if(admin?.status?.includes(6) && adminToken) return navigate(ADMIN_PAYMENT)
                else if(admin?.status?.includes(7) && adminToken) return navigate(ADMIN_JOB_TYPE)
                else if(!admin && !adminToken) return navigate(ADMIN_LOGIN)
                else return navigate(LOGIN)  
            }
        }
    }, [user,admin])
    return (
        <>
            {loading ? <BackDrop /> : null}
            <div className='auth-main-wrapper'>
                <div classname="container" style={{ minHeight: "100vh" }}>
                    <div className="row justify-content-center m-0 align-items-center" style={{ minHeight: "100vh" }}>
                        <div className="col-md-8 col-lg-6 col-xl-3 ">
                            <div className="card auth-wrapper">
                                <div className="card-body py-1">
                                    <div className="text-center mt-2">
                                        <img
                                            src={require("../../../assets/logo.png")}
                                            className='logo'
                                            alt='...'
                                            style={{ height: "71px" }}
                                        />
                                        <h5 className="text-blue mt-1">Welcome Back !</h5>
                                        <p className="text-muted">Sign in to continue to BridgeLine Billing.</p>
                                    </div>
                                    <div className="p-2">
                                        {Error && <div class="alert alert-danger alert-borderless mb-1 p-2" role="alert">{Error}</div>}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <InputLabel className="form-label" name="Email Address" />
                                                <InputText
                                                    name="email"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter email address"
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    value={values.email}
                                                    error={errors.email}
                                                    touch={touched.email} />
                                            </div>
                                            <div className="mb-3">
                                                <InputLabel className="form-label" name="Password" />
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <InputText
                                                        name="password"
                                                        type="password"
                                                        className="form-control pe-5 password-input"
                                                        placeholder="Enter password"
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        value={values.password}
                                                        error={errors.password}
                                                        touch={touched.password} />
                                                </div>
                                                {/* <div className="float-end">
                                                    <a href="#" className="text-muted">Forgot password?</a>
                                                </div> */}
                                            </div>
                                            {/* <div className="form-check">
                                                <InputText className="form-check-input" type="checkbox" />
                                                <InputLabel className="form-check-label" name="Remember me" />
                                            </div> */}
                                            <div className="mt-4">
                                                <InputButton className="btn btn-blue w-100" type="submit" name="Sign In" />

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login