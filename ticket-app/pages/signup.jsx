import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useContext, useRef, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { FaUserAlt, FaUserCircle,FaUserCheck} from "react-icons/fa";
import InputTextField from '../user/inputFunction/InputTextField';
import { valAuthContext } from '../Context/valContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { getRole, getToken, storeRole, storeToken } from '../LocalStorage/localStorageServices';
import Alert from 'react-bootstrap/Alert';
import { Spinner } from 'react-bootstrap';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, sendEmailVerification } from "firebase/auth";
import swal from 'sweetalert';
const signup = () => {

    const [admin, setAdmin] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const router = useRouter()
    const val = useContext(valAuthContext);
    const userCollectionRef = collection(db, 'users');
    const [Error, setError] = useState('')
    const authuser=getAuth();
    // console.log(router.pathname,"=====================pathname=============")

    useEffect(() => {
        if (!val?.toggle) {
            document.getElementById('block').style.opacity = '0.3';
        }
        else {
            document.getElementById('block').style.opacity = '1';
        }
    }, [val?.toggle]);



    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            email: yup.string().email('Invalid Email address').required("Email is required"),
            password: yup.string().min(6, 'Password must be 6 character length').required('Password is required!'),
        }),

        onSubmit: async (values, { resetForm }) => {
            // console.log(values, "==============")
            setLoading(true);
                await createUserWithEmailAndPassword(auth, values.email, values.password).then((res) => {
                console.log(res);
                toast.success('Account created successfully !!');
                setDoc(doc(db, 'users', res.user.uid), {
                    uid: res.user.uid,
                    email: values.email,
                    name: values.name,
                    password: values.password,
                    role: 'user',
                    createdAt: Timestamp.fromDate(new Date()),
                })
             
               
            }).catch((error) => {
                console.log(error);
                let errorcode = error.code.split("auth/")[1];
                setError(errorcode);
                setLoading(false);

            })
           
            await sendEmailVerification(authuser.currentUser)
            .then(() => {
                swal({
                    title: "Email Verification",
                    text: "send email verification link on your email,please verify email !!",
                    icon: "success",
                    // closeOnConfirm: false,zz
                    closeModal: false,
                    // buttons: true,
                    confirmButtonColor: '#0d6efd',
                    closeOnClickOutside: false,
                    button:{
                            confirm: {
                              text: "OK",
                            //   value: true,
                              visible: true,
                              className: "",
                              closeModal: true,
                              onclick:router.replace('/login') ,
                            }
                          }
                  })
                // toast.success('send email verification link on your email,please verify email !!');
               
            }).catch((error) => {
                console.log(error);
            });

            resetForm({ values: "" })
        }
    })
    let token = getToken();
    let role = getRole();
    useEffect(() => {
        token && role ? router.push(`/`) : router.push(router.pathname)
    }, [])
    return (
        <div className='block' id="block">
            <div className="container-fluid d-flex align-items-center" style={{ height: '100vh' }}>
                <div className='container shadow bg-body rounded login-container'>
                    <div className="row py-3">
                        <div className="col-lg-6 d-lg-block d-none">
                            <div className='position-relative' style={{ height: '100%' }}>
                                <Image src="/signup.svg" layout="fill"
                                    alt="Login Image" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className='pb-3'>
                                <h3 className='text-primary'>Signup</h3>
                            </div>
                            {/* <div className='login-btn my-3 d-lg-none'>
                                 <FaUserCircle className='login-user-icon text-primary'/>
                            </div> */}
                            {Error ? <Alert variant="danger">
                                {Error}
                            </Alert> : null}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <InputTextField
                                        name="name"
                                        label="Enter Name"
                                        type="text"
                                        placeholder="Enter Name"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        error={errors.name}
                                        touch={touched.name}
                                        value={values.name}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <InputTextField
                                        name="email"
                                        label="Enter Email"
                                        type="email"
                                        placeholder="Enter Email"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        error={errors.email}
                                        touch={touched.email}
                                        value={values.email}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <InputTextField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        placeholder="Enter Password"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        error={errors.password}
                                        touch={touched.password}
                                        value={values.password}
                                    />
                                </Form.Group>
                                <Button className='d-block w-100 login-btn' type="submit">

                                    {/* <span>Login</span> */}
                                    {loading ? <div> <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />Signing up...</div> : <><FaUserCheck className='mx-1' /> <span>Signup</span></>}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default signup