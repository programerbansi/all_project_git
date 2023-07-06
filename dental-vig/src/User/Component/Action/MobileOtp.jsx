import { React, useContext, useState } from 'react'
import OtpInput from "react-otp-input";
import { useDispatch } from 'react-redux';
import '../../Css/InputFunction.css'
import Button from '../InputFunction/Button';
import { MdSendToMobile } from "react-icons/md";
import { userSendMobileNo, userSendOTP } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser, getMobileNo } from '../../../services/LocalStorageUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTimer } from "react-timer-hook";
import { UserValAuthContext } from '../Context/UserValContext';
import SnackBar from '../../../admin/Actions/SnackBar';

const MobileOtp = () => {
    const val=useContext(UserValAuthContext);
    const [code, setCode] = useState("");
    const user_detail = getLoggedInUser();
    const navigate = useNavigate();
    const [disable, setDisable] = useState(true);
    const [resendotpdisable, setresendotpDisable] = useState(true);
    const [message, setMessage] = useState();
    const [error, setError] = useState('');
    const [status, setStatus] = useState(false);
    const [ownerror, setOwnError] = useState("");
    const user = getLoggedInUser();
    const mobileno=getMobileNo();
    const dispatch = useDispatch();

    const time = new Date();
    time.setSeconds(time.getSeconds() +30);

    const [expiryTimestamp, setexpiryTimestamp] = useState(time)
    const {
        seconds,
        minutes,
        restart
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called")
    });
    const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const handleChange = (code) => {
        if (code.length == 6) {
            setDisable(false)
            if (isNaN(code)) {
                setDisable(true)
                setOwnError("please enter only digits!")
            }
            else {
                setDisable(false)
                setOwnError("")
            }
        }
        else {
            setDisable(true)
        }
        setCode(code);
    }
    const handleSendOtp = () => {
        const formdata = new FormData();
        formdata.append('otp', code);
        dispatch(userSendOTP(user_detail?.id, formdata, navigate,setMessage,setError,setStatus,val.setSendMobile));
        val.setFlagOtp(false);
    }
    const resendOTP = (e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('phone', user?.phone);
        dispatch(userSendMobileNo(user?.id, formdata ,navigate,setMessage,setError,setStatus,val.setSendMobile))
        const time = new Date();
        time.setSeconds(time.getSeconds() + 30);
        restart(time);
    }

    useEffect(() => {
        if (seconds < 1 && minutes < 1) {
            setresendotpDisable(false)
        }
        else {
            setresendotpDisable(true)
        }
    }, [seconds, minutes, resendotpdisable])
   
    return (
        <>
         <SnackBar status={status} message={message} error={error} setStatus={setStatus} />
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " >
                    <form onSubmit={handleSendOtp}>
                    <div className="modal-content p-3">
                        <div className='d-flex justify-content-center'><MdSendToMobile className='sendotp-icon' /></div>
                        <h4 className=' d-flex justify-content-center h4-otp'>Please Enter the OTP to Verify your Account</h4>
                        <p className='otp-p'>OTP has been send to your mobile number, It's valid for 1 minute.</p>
                        <div className=' d-flex justify-content-center mt-4 mb-2'>

                            <OtpInput
                                value={code}
                                onChange={handleChange}
                                numInputs={6}
                                separator={<span style={{ width: "8px" }}></span>}
                                isInputNum={true}
                                shouldAutoFocus={true}
                                inputStyle={{
                                    border: "1px solid black",
                                    borderRadius: "8px",
                                    width: "38px",
                                    height: "40px",
                                    fontSize: "14px",
                                    color: "#000",
                                    fontWeight: "600",
                                    caretColor: "blue"
                                }}

                            />
                        </div>
                        <span className=' d-flex justify-content-center text-danger  mb-3'>{ownerror}</span>
                        <div className=" justify-content-center d-flex">
                            <Button id="closeModel1" userEvent='button' type="submit" className={`btn btn-primary btn-otp px-5 ${disable ? 'disable' : 'unable'}`} name="Verify" disable={disable} event={handleSendOtp} dataDismiss="modal" ></Button>
                        </div>

                        <div className=' d-flex justify-content-center mt-2 mb-0'>
                            <span style={{ display: seconds < 1 && minutes < 1 ? 'none' : 'block' }}>Resend OTP in </span> <span style={{ display: seconds < 1 && minutes < 1 ? 'none' : 'block', marginLeft: "5px" }}> {minuteTime} :</span>
                            <span style={{ display: seconds < 1 && minutes < 1 ? 'none' : 'block', marginLeft: "5px" }}>{secondTime}</span>
                        </div>

                        <div className=" justify-content-center d-flex mt-1" >
                            <Button className={`text-danger resend-otp p-0 ${resendotpdisable ? 'disable' : 'unable'}`} type='submit' name="Resend OTP" disable={resendotpdisable} event={(e)=>resendOTP(e)}></Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MobileOtp