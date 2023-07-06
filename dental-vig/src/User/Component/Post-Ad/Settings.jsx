
import AddPostTabs from './AddPostTabs'
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
import swal from 'sweetalert';
import { MdVerified } from "react-icons/md";
import RightAds from '../Advertisement/RightAds';
import LeftAds from '../Advertisement/LeftAds';
import { AiFillCamera } from "react-icons/ai";
import "../../Css/Settings.css"
import { TextField as DateTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@mui/material';



const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
}));

const Settings = ({ left_ads, right_ads }) => {
    const classes = useStyles();
    let loggedInUser = getLoggedInUser();
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();
    const [error, setError] = useState('');
    const [status, setStatus] = useState(false);
    const [dateVal, setDateVal] = useState('');
    const [dateError, setDateError] = useState('');
    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    let user = getLoggedInUser();

    const { values, setFieldValue, errors, handleBlur, handleChange, handleSubmit, touched, setValues, setErrors } = useFormik({
        initialValues: {
           
            name: loggedInUser?.name || '',
            phonenumber: loggedInUser?.phone.substring(3, 13) || '',
            address: loggedInUser?.address || '',
            pincode: loggedInUser?.pincode || '',
            
            state: { label: loggedInUser?.state?.name || 'select state', value: loggedInUser?.state?.name || 'select state'},
            city: { label: loggedInUser?.citi?.name || 'select city', value: loggedInUser?.citi?.name || 'select city'},
            dob: loggedInUser?.dob || ''
        },
        validationSchema: yup.object().shape({
        
        }),
        onSubmit: (values, { resetForm }) => {
        
            const formdata = new FormData();
            if(values.dob)formdata.append('dob', values.dob);
            if(values.phonenumber) formdata.append('phone', values?.phonenumber)
          
            formdata.append('name',values.name)
            formdata.append('address', values?.address);
            formdata.append('pincode', values?.pincode);
            formdata.append('image', values?.profile);
          
            if(values.state.value !== 'select state')formdata.append('state_id', val?.selectedState.id || loggedInUser?.state_id);
            if(values.city.value !== 'select city') formdata.append('city_id', val?.selectedCity.id || loggedInUser?.city_id);
            formdata.append('status', 1);
            
                dispatch(userAdditionalInfo(formdata, user.id, setLoading, navigate, setMessage, setError, setStatus, location))
                resetForm({ values: '' });
                setFieldValue('dob', '');
           
        }
    })
    useEffect(() => {
        if (val?.flagOtp) { verifyButtonId?.click(); }
    }, [val?.flagOtp])

    const handleFileChange = (e) => {
        setFieldValue('profile', e.target.files[0]);
        handleSubmit();
    }

    let verifyButtonId = document.getElementById("verify");
    const handleOtp = () => {
        const formdata = new FormData();
        formdata.append('phone', `+91${values.phonenumber}`);

        dispatch(userSendMobileNo(user?.id, formdata, navigate, setMessage, setError, setStatus, val.setFlagOtp))
        
    }
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <AddPostTabs />
            <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            {
                val.flagOtp == true ? <MobileOtp /> : null
            }
            <div className="setting-part">
                <div className='container-fluid'>

                    <div className='row'>

                        <div className='col'>
                            <LeftAds left_ads={left_ads} />
                        </div>
                       
                        <div className="container pt-5">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="account-card alert fade show">
                                        <div className="account-title">
                                            <h3>Edit Profile</h3>
                                            
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex justify-content-center position-relative">
                                                {
                                                    loggedInUser?.image ? <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${loggedInUser?.image}`} style={{ width: "120px", height: "120px", borderRadius: "50%" }} className="form-group" /> :
                                                        <Avatar style={{ width: "110px", height: "110px", borderRadius: "50%" }}>{loggedInUser?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{loggedInUser?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>
                                                }
                                                <div>
                                                    <label htmlFor="profile">
                                                        <AiFillCamera className='position-absolute camera-set' style={{ backgroundColor: '#0044bb', padding: '3px', borderRadius: '50%', color: "white", fontSize: "24px", top: "58%", left: "53%", cursor: "pointer" }} />
                                                    </label>
                                                    <input
                                                        id='profile'
                                                        name="profile"
                                                        placeholder="profile-image"
                                                        className="form-control"
                                                        type="file"
                                                       
                                                        onChange={handleFileChange}
                                                       
                                                        style={{ display: "none" }}
                                                    />
                                                </div>
                                            </div>
                                           
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <TextField
                                                            id='name'
                                                            name="name"
                                                            placeholder="first-name"
                                                            className="form-control "
                                                            type="text"
                                                            error={errors.name}
                                                            event={handleChange}
                                                            event1={handleBlur}
                                                            touch={touched.name}
                                                            value={values.name}
                                                        />
                                                    </div>
                                                </div>
                                            
                                                <div className="col-lg-6 col-12">
                                                    <div className="form-group mt-2 pt-1">
                                                        <DateTextField
                                                            id="date"

                                                            type="date"
                                                            value={values?.dob}
                                                            className={`${classes?.textField} form-group`}
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
                                                <div className="col-lg-6 col-12">
                                                    <div className='row justify-content-center align-items-center w-100'>
                                                        <div className={`${ loggedInUser?.phone == null && values.phonenumber?.length !== 10 ? 'col-12' : values.phonenumber?.length < 10 || values.phonenumber?.length > 10 ? 'col-8'  : 'col-8 align-content-center'}`}>
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
                                                            (values.phonenumber?.length == 10 && loggedInUser?.mobile_otp_verified == 0) ? <div className="col-4">
                                                                <Button type="button" userEvent='button' className="btn btn-sm btn-success px-3 py-2 " name="verify" dataToggle="modal" dataTarget="#staticBackdrop" event={handleOtp} />
                                                            </div> : loggedInUser?.mobile_otp_verified == 1 && (`+91${values.phonenumber}` == loggedInUser?.phone) && <div className="col-4 mx-auto pt-2">
                                                                <MdVerified className='text-success' style={{ fontSize: "30px" }} />
                                                                 </div>
                                                        }
                                                        {
                                                            values.phonenumber?.length == 10 && loggedInUser?.mobile_otp_verified == 1 && (`+91${values.phonenumber}` != loggedInUser.phone) && <div className="col-4">
                                                                <Button type="button" userEvent='button' className="btn btn-sm btn-success px-3 py-2" name="verify" dataToggle="modal" dataTarget="#staticBackdrop" event={handleOtp} />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                               
                                                <div className="col-6 mt-3">
                                                    <div className="form-group">
                                                        <TextField
                                                            id='address'
                                                            name="address"
                                                            placeholder="address"
                                                            className="form-control "
                                                            type="text"
                                                            event={handleChange}
                                                            event1={handleBlur}
                                                            value={values.address}
                                                            error={errors.address}
                                                            touch={touched.address}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6 mt-3">
                                                    <div className="form-group">
                                                        <TextField
                                                            id='pincode'
                                                            name="pincode"
                                                            placeholder="pincode"
                                                            className="form-control "
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
                                                        <Button type="submit" className="btn btn-inline" icon="fas fa-user-check" name="Update info" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                        <div className='col'>
                            <RightAds right_ads={right_ads} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings