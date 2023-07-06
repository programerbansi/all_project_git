import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useContext, useRef, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { FaUserAlt, FaUserCircle ,FaUnlock} from "react-icons/fa";
import InputTextField from '../../user/inputFunction/InputTextField';
import { valAuthContext } from '../../Context/valContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebase/firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { getRole, getToken, storeRole, storeToken, storeUser } from '../../LocalStorage/localStorageServices';
import Alert from 'react-bootstrap/Alert';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
const login = () => {

    const [admin, setAdmin] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    const router = useRouter()
    const val = useContext(valAuthContext);
    const userCollectionRef = collection(db, 'users');
    const [Error, setError] = useState('')
    // console.log(router.pathname,"=====================pathname=============")

    useEffect(() => {
        if (!val?.toggle) {
            document.getElementById('block').style.opacity = '0.3';
        }
        else {
            document.getElementById('block').style.opacity = '1';
        }
    }, [val?.toggle]);

    useEffect(() => {
        const unsub = onSnapshot(query(userCollectionRef), (querySnapshot) => {
            let Users = [];
            querySnapshot.forEach((doc) => {
                Users.push(doc.data());
            })
            setUsers(Users)
        })
        return () => unsub();
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'admin')), (querySnapshot) => {
            let admin = [];
            querySnapshot.forEach((doc) => {
                admin.push(doc.data());
            })
            setAdmin(admin)
        })
        return () => unsub();
    }, []);

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid Email address').required("Email is required"),
            password: yup.string().min(6, 'Password must be 6 character length').required('Password is required!'),
        }),

        onSubmit: async (values, { resetForm }) => {
            // console.log(values, "==============")
            setLoading(true);
            await signInWithEmailAndPassword(auth, values.email, values.password)
                .then((response) => {
                    console.log(response.user, '...res-user.....');
                    storeToken(response.user.accessToken);
                    storeUser(response.user);
                    users.forEach((user) => {
                        if (user.uid == response.user.uid) {
                            storeRole(`${user.role}`);
                            response?.user?.emailVerified ? router.push(`/`) : swal({
                                title: "Pending...",
                                text: "Email verification is in pending , please verify your email!",
                                icon: "warning",
                                buttons: true,
                                confirmButtonColor: '#0d6efd',
                              })
                           
                            // navigate(`/${user.role}Dashboard`);
                        }
                    });
                    admin.forEach((admin) => {
                        console.log(admin,"------------")
                        if (admin.uid == response.user.uid) {
                            storeRole(`${admin.role}`);
                            router.push(`/${admin.role}`)
                            // navigate(`/${admin.role}Dashboard`);
                        }
                    })
                    setLoading(false);
                    resetForm({ values: "" })
                }).catch((error) => {
                    console.log(error);
                let errorcode = error.code.split("auth/")[1];
                console.log(errorcode)
                setError(errorcode);
                setLoading(false);
                    // const errorCode = ((FirebaseAuthException) task.getException()).getErrorCode();
                    // console.log(error?.message,"==========")
                    // setError("Username or Password Invalid!!");
                })
            // setError("");
            // resetForm({ values: "" })
        }
    })
    let token = getToken();
    let role = getRole();
    useEffect(() => {
      token && role ? role == "admin" ? router.push(`/admin`):router.push(`/`) : router.push(router.pathname)
    }, [])
    return (
        <div className='block' id="block">
            <div className="container-fluid d-flex align-items-center" style={{ height: '100vh' }}>
                <div className='container shadow bg-body rounded login-container'>
                    <div className="row py-3">
                        <div className="col-lg-6 d-lg-block d-none">
                            <div className='position-relative' style={{ height: '100%' }}>
                                <Image src="/login.svg" layout="fill"
                                    alt="Login Image" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className='pb-3'>
                                <h3 className='text-primary'>Login</h3>
                            </div>
                            {/* <div className='login-btn my-3 d-lg-none'>
                                 <FaUserCircle className='login-user-icon text-primary'/>
                            </div> */}
                            {Error ? <Alert variant="danger">
                                {Error}
                            </Alert> : null}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <InputTextField
                                        name="email"
                                        label="Enter email"
                                        type="email"
                                        placeholder="Enter email"
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
                                        placeholder="Password"
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
                                    />Logging in...</div> :  <><FaUnlock className='mx-1' /> <span>Login</span></>}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login