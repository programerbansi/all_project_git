import { React, useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import TextField from '../InputFunction/TextField'
import Button from '../InputFunction/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../../Css/Register.css'
import { useDispatch } from 'react-redux';
import { getCityList, getCountryList, getStateList, userAdditionalInfo, userSendMobileNo } from '../../../redux/actions/UserEcommerceAction';
import { UserValAuthContext } from '../Context/UserValContext';
import AreaDetail from '../InputFunction/AreaDetail';
import { getLoggedInUser, getMobileNo, getSendMobile } from '../../../services/LocalStorageUser';
import SnackBar from '../../../admin/Actions/SnackBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MobileOtp from '../Action/MobileOtp';
import moment from 'moment'
import Moment from 'react-moment';
import swal from 'sweetalert';
import { MdVerified } from "react-icons/md";
import { TextField as DateTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Register = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();
    const [error, setError] = useState('');
    const [status, setStatus] = useState(false);
    const [dateVal,setDateVal]  = useState('');
    const [dateError,setDateError] = useState('');
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    const navigate = useNavigate();
    console.log(val.sendmobile);
    let listLoaded = false;
    let user = getLoggedInUser();
    let mobileverify = getSendMobile();
    let mobileNo = getMobileNo();
    let location = useLocation();
    const { values, setFieldValue, errors, handleBlur, handleChange, handleSubmit, touched, setValues } = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            phonenumber: "",
            address: "",
            pincode: "",
            state: '',
            city: '',
            dob: ''
        },
        validationSchema: yup.object().shape({
            firstname: yup.string().required('firstname is required!'),
            lastname: yup.string().required('lastname is required!'),
            phonenumber: yup.string().required('phone-number is required!').matches(/^[0-9]+$/, "must be only digits")
                .min(10, 'must be exactly 10 digits')
                .max(10, 'must be exactly 10 digits'),
            address: yup.string().required('address is required!'),
            // address: yup.string().required('address is required!').max(50, 'maximum 50 words !'),
            pincode: yup.string().required('pincode is required!').matches(/^[1-9][0-9]{5}$/, 'invalid pincode!'),
            // country: yup.object().required("Please select a country"),
            state: yup.object().required("Please select a state"),
            city: yup.object().required("Please select a city"),
            dob: yup.string().nullable()
                .required("date of birth is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            const formdata = new FormData();
            formdata.append('firstname', values.firstname);
            formdata.append('lastname', values.lastname);
            formdata.append('phone', values.phonenumber);
            formdata.append('address', values.address);
            formdata.append('pincode', values.pincode);
            formdata.append('image', values.profile);
            formdata.append('country_id', val.selectedCountry.id);
            formdata.append('state_id', val.selectedState.id);
            formdata.append('city_id', val.selectedCity.id);
            formdata.append('status', 1);
            formdata.append('dob', values.dob);
            if (mobileverify) {
                dispatch(userAdditionalInfo(formdata, user.id, setLoading, navigate, setMessage, setError, setStatus, location))
                resetForm({ values: '' });
                setFieldValue('dob', '');
            }
            else {
                swal({
                    title: "Please verify your phone number!",
                    icon: "warning",
                    confirmButtonColor: '#0044bb',
                    closeOnConfirm: false,
                    closeOnClickOutside: false,
                })
            }
        }
    })

    const handleFileChange = (e) => {
        setFieldValue('profile', e.target.files[0]);
    }
    let verifyButtonId = document.getElementById("verify");
    console.log(val.flagOtp, '=====flag-====')
    const handleOtp = () => {
        const formdata = new FormData();
        formdata.append('phone', `+91${values.phonenumber}`);
        dispatch(userSendMobileNo(user?.id, formdata, navigate, setMessage, setError, setStatus, val.setFlagOtp, verifyButtonId))
    }

    useEffect(() => {
        if (val.flagOtp) { verifyButtonId.click(); }
    }, [val.flagOtp])
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            {
                val.flagOtp && <MobileOtp />
            }

            <div className="user-form-title">
                <h2>Profile Info</h2>
                <p>Add Additional Information</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <TextField
                                id='firstname'
                                name="firstname"
                                placeholder="first-name"
                                className="form-control"
                                type="text"
                                error={errors.firstname}
                                event={handleChange}
                                event1={handleBlur}
                                touch={touched.firstname}
                                value={values.firstname}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <TextField
                                id='lastname'
                                name="lastname"
                                placeholder="last-name"
                                className="form-control"
                                type="text"
                                event={handleChange}
                                event1={handleBlur}
                                value={values.lastname}
                                error={errors.lastname}
                                touch={touched.lastname}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <DateTextField
                                id="date"
                                label="Birthday"
                                type="date"
                                value={values?.dob}
                                className={classes?.textField}
                                onChange={(e) => { setDateVal(e.target.value); setFieldValue('dob', moment(e.target.value).format('YYYY-MM-DD')); }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br />
                            {dateError != ' ' && <span className='text-danger'>{dateError}</span>}
                            {errors.dob && touched.dob ? (<span className='text-danger'>{errors.dob}</span>) : null}         
                        </div>
                    </div>
                    <div className="col-12">
                        <div className='row justify-content-center align-items-center'>
                            <div className={`${values.phonenumber.length < 10 || values.phonenumber.length > 10 ? 'col-12' : 'col-sm-6 align-content-center'}`}>
                                <div className="form-group mb-0 d-flex">
                                    <div className="pe-0 mx-1" style={{ width: '50px', height: '45px', backgroundColor: 'white', borderBottom: '2px solid #e8e8e8', textAlign: 'center', display: 'block', paddingTop: '9px' }}>
                                        + 91
                                    </div>
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
                            {
                                (values.phonenumber.length == 10 && !mobileverify) ? <div className="col-sm-6">
                                    <Button type="button" userEvent='button' id={'verify'} className="btn-sm btn-success px-3 py-2" name="verify" dataToggle="modal" dataTarget="#staticBackdrop" event={handleOtp} />
                                </div> : mobileverify && (`+91${values.phonenumber}` == mobileNo) && <div className="col-sm-6 mx-auto">
                                    <MdVerified className='text-success' style={{ fontSize: "30px" }} />                                  
                                </div>
                            }
                            {
                                values.phonenumber.length == 10 && mobileverify && (`+91${values.phonenumber}` != mobileNo) && <div className="col-sm-6">
                                    <Button type="button" userEvent='button' id={'verify'} className="btn btn-sm btn-success px-3 py-2" name="verify" dataToggle="modal" dataTarget="#staticBackdrop" event={handleOtp} />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mt-4">
                            <TextField
                                id='profile'
                                name="profile"
                                placeholder="profile-image"
                                className="form-control"
                                type="file"
                                event={handleFileChange}
                                value={values.profile}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <TextField
                                id='address'
                                name="address"
                                placeholder="address"
                                className="form-control"
                                type="text"
                                event={handleChange}
                                event1={handleBlur}
                                value={values.address}
                                error={errors.address}
                                touch={touched.address}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <TextField
                                id='pincode'
                                name="pincode"
                                placeholder="pincode"
                                className="form-control"
                                type="text"
                                event={handleChange}
                                event1={handleBlur}
                                value={values.pincode}
                                error={errors.pincode}
                                touch={touched.pincode}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="row w-100 m-0">
                            <AreaDetail obj={{ country: 'country', state: 'state', city: 'city', setValues: setValues, values: values, setFieldValue: setFieldValue, error: errors, handleBlur: handleBlur, touch: touched }} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <Button type="submit" className="btn btn-inline" icon="fas fa-user-check" name="Add info" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register