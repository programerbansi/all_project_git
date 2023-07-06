import React, { useContext } from 'react'
import { useState } from 'react';
import InputButton from '../../../user/component/function/InputButton';
import { Form } from 'react-bootstrap';
import InputLabel from '../../../user/component/function/InputLabel';
import InputText from '../../../user/component/function/InputText';
import { useFormik } from 'formik';
import * as yup from 'yup'
import InputTextArea from '../../../user/component/function/InputTextArea';
import classNames from 'classnames';
import CurrencyInput from 'react-currency-input-field';
import InputCheckBox from '../../../user/component/function/InputCheckBox';
import InputSelectBox from '../../../user/component/function/InputSelectBox';
import { useEffect } from 'react';
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TASK_AMOUNT, UPDATE_TASK_DEFAULT, UPDATE_TASK_FILE, getStatus, updateAdminTask, updateTaskAmount, updateTaskDefault, updateTaskFile } from '../../../redux/action/AdminAction';
import InputButtonLoad from '../../../user/component/function/InputButtonLoad';
import { status_opt } from '../../../user/component/json/arrayJson';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import { ADMIN_COMPLETED_INVOICE, ADMIN_INVOICE } from '../../../services/AdminRoutePath';
import BackDrop from '../../../user/component/function/BackDrop';
import { getLoggedInAdmin } from '../../../services/AdminLocalStorage';
import { removeStatus, storeStatus } from '../../../services/UserLocalStorage';
const ManageTask = ({ s }) => {
    const val = useContext(AdminValAuthContext);
    const [checkFlag, setCheckFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const admin =getLoggedInAdmin();
    const navigate=useNavigate();
    const { setValues, values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: {},
        validationSchema: val?.selectStatus == "Other" ? yup.object({
            status: yup.object().required("required"),
            other: yup.string().required("required"),
        }) : (val?.selectStatus == "Invoice Ready/Make Payment") && checkFlag ? yup.object({
            status: yup.object().required("required"),
            file: yup.mixed().required('file is required!'),
            amount: yup.number().required("required"),
        }) : (val?.selectStatus == "Invoice Ready/Make Payment" ) || (val?.selectStatus == "Completed" )? yup.object({
            status: yup.object().required("required"),
            file: yup.mixed().required('file is required!'),
        }) : val?.selectStatus != "Other" && val?.selectStatus != "Invoice Ready/Make Payment" ? yup.object({
            status: yup.object().required("required"),
        }) : null
        ,

        onSubmit: (values, { resetForm }) => {
            const formdata = new FormData();
            val?.setFilteredArray([]);
          
            setLoading(true);
            if (val?.selectStatus == "Other") {
                formdata.append('message', values.msg ? values.msg : 'null');
                formdata.append('status', values.other);
                formdata.append('user_id', s?.user_id);
                formdata.append('name', `${s?.firstname} ${s?.lastname}`);
                storeStatus("Other")
                dispatch(updateAdminTask(formdata,`/admin/task-manage-default/${s.id}`,UPDATE_TASK_DEFAULT, setLoading,navigate,"Task Manage successful.",ADMIN_INVOICE,val?.setFilteredArray))
            } else if ((val?.selectStatus == "Invoice Ready/Make Payment") && checkFlag) {
                formdata.append('message', values.msg ? values.msg : 'null');
                formdata.append('status', values.status.value);
                formdata.append('file', values.file);
                formdata.append('amount', values.amount);
                formdata.append('user_id', s?.user_id);
                formdata.append('firstname', admin?.firstname);
                formdata.append('lastname', admin?.lastname);
                formdata.append('name', `${s?.firstname} ${s?.lastname}`);
                storeStatus("Redy")
                dispatch(updateAdminTask(formdata,`/admin/task-manage-amount/${s.id}`,UPDATE_TASK_AMOUNT, setLoading,navigate,"Task Manage successful.",ADMIN_INVOICE,val?.setFilteredArray))
            } else if ((val?.selectStatus == "Invoice Ready/Make Payment") ||  (val?.selectStatus == "Completed" )) {
                formdata.append('message', values.msg ? values.msg : 'null');
                formdata.append('status', "Completed");
                formdata.append('file', values.file);
                formdata.append('user_id', s?.user_id);
                formdata.append('firstname', admin?.firstname);
                formdata.append('lastname', admin?.lastname);
                formdata.append('name', `${s?.firstname} ${s?.lastname}`);
                if(val?.selectStatus == "Invoice Ready/Make Payment")
                {
                    storeStatus("Redy")
                }
                else
                {
                    navigate(ADMIN_COMPLETED_INVOICE)
                }
                dispatch(updateAdminTask(formdata, `/admin/task-manage-file/${s.id}`,UPDATE_TASK_FILE,setLoading,navigate,"Task Manage successful.",val?.selectStatus == "Invoice Ready/Make Payment" ? ADMIN_INVOICE:ADMIN_COMPLETED_INVOICE,val?.setFilteredArray))
            } else if (val?.selectStatus != "Other" && val?.selectStatus != "Invoice Ready/Make Payment" && val?.selectStatus != "Completed" ) {
                formdata.append('message', values.msg ? values.msg : 'null');
                formdata.append('status', values.status.value);
                formdata.append('user_id', s?.user_id);
                formdata.append('name', `${s?.firstname} ${s?.lastname}`);
                if(val?.selectStatus == "Pending") storeStatus("Pending")
                else if (val?.selectStatus == "Need more photos" || val?.selectStatus == "Need more documents")storeStatus("PhotoDoc")
                dispatch(updateAdminTask(formdata,`/admin/task-manage-default/${s.id}`,UPDATE_TASK_DEFAULT, setLoading,navigate,"Task Manage successful.",ADMIN_INVOICE,val?.setFilteredArray))
            } else { return null }
            val?.setSelectStatus('');
        }
    })
    useEffect(()=>{
         if ((s?.status !== "Invoice Ready/Make Payment") && (s?.status !== "Need more photos") && (s?.status !== "Pending") && (s?.status !== "Need more documents") && (s?.status !== "Completed") && (s?.status !== "Other")) {
            val?.setSelectStatus("Other");
        }
        else{
           return
        }
    },[])
    
    useEffect(() => {
        if (val?.selectStatus == "Other") {
            setValues({
                msg: s?.message ? s?.message : '', status: val?.selectStatus ? {
                    label: val?.selectStatus, value: val?.selectStatus
                } : {
                    label: s?.status, value: s?.status
                }, other: s?.status && ((s?.status != "Completed") && (s?.status != "Invoice Ready/Make Payment") && (s?.status != "Need more documents") && (s?.status != "Pending") && (s?.status != "Need more photos")) ? s?.status : ''
            })
        }
        else if ((val?.selectStatus == "Invoice Ready/Make Payment") && checkFlag) {
            setValues({
                msg: s?.message ? s?.message : '', status: val?.selectStatus ? {
                    label: val?.selectStatus, value: val?.selectStatus
                } : {
                    label: s?.status, value: s?.status
                }, file: values?.file ? values?.file : "", amount: ""
            })
        }
        else if ((val?.selectStatus == "Invoice Ready/Make Payment") ||  (val?.selectStatus == "Completed" )) {
            setValues({
                msg: s?.message ? s?.message : '', status: val?.selectStatus ? {
                    label: val?.selectStatus, value: val?.selectStatus
                } : {
                    label: s?.status, value: s?.status
                }, file: values?.file ? values?.file : "",
            })
        }
        else if ((s?.status == "Invoice Ready/Make Payment") || (s?.status == "Need more photos") || (s?.status == "Pending") || (s?.status == "Need more documents") || (s?.status == "Completed") || (s?.status == "Other")) {
            setValues({
                msg: s?.message ? s?.message : '', status: val?.selectStatus ? {
                    label: val?.selectStatus, value: val?.selectStatus
                } : {
                    label: s?.status, value: s?.status
                }
            })
        }
        else { return }

    }, [val?.selectStatus, checkFlag])
    const handleCheck = () => {
        var x = document.getElementById('post-check');
        if (x.checked) {
            setCheckFlag(true)
        }
        else {
            setCheckFlag(false)
        }
    }
    const handeleSelectFile = (e) => {
        setFieldValue('file', e.target.files[0]);
    }
    return (
        <>
        {loading ? <BackDrop/>:null}
            <div className='row p-2'>
                <div className='col-12 col-md-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <InputLabel className="form-label" name="Enter Message" />
                            <InputTextArea
                                name="msg"
                                className="form-control"
                                placeholder="Enter Message..."
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.msg}
                                error={errors.msg}
                                touch={touched.msg} />
                        </div>
                        <InputSelectBox
                            opt={status_opt}
                            name="status"
                            className="form-select py-0 ps-0 select-control "
                            placeholder={s.status != null ? s?.status : "Select..."}
                            setFieldValue={setFieldValue}
                            handleBlur={handleBlur}
                            value={values.status}
                            error={errors.status}
                            touch={touched.status}
                        />
                        {
                            val?.selectStatus == "Other" ?
                                <div className="mt-2">
                                    <InputTextArea
                                        name="other"
                                        className="form-control"
                                        placeholder="Enter Status..."
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.other}
                                        error={errors.other}
                                        touch={touched.other} />
                                </div>
                                : null
                        }
                        {
                            val?.selectStatus == "Invoice Ready/Make Payment" ?
                                <>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <div className="mt-2">
                                                <InputLabel className="form-label" name="Upload Invoice" />
                                                <InputText
                                                    name="file"
                                                    type='file'
                                                    className="form-control"
                                                    placeholder="Enter file..."
                                                    handleChange={(e) => { handeleSelectFile(e) }}
                                                    handleBlur={handleBlur}
                                                    value={values.file}
                                                    error={errors.file}
                                                    touch={touched.file} />
                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div className="mt-2">
                                                <div className="checkbox">
                                                    <label>
                                                        <InputCheckBox checkFlag={checkFlag} id="post-check" name="checkterm" event={() => { handleCheck() }} /> Need Payment
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {checkFlag && <div className='col-12'>
                                            <div className="mt-1">
                                                <InputLabel className="form-label" name="Amount" />
                                                <CurrencyInput
                                                    className={classNames(`form-control form-control-md py-3`, { 'is-invalid': errors.amount })}
                                                    type="cost"
                                                    prefix="$"
                                                    placeholder="Enter Amount"
                                                    // defaultValue={1000}
                                                    decimalsLimit={2}
                                                    onValueChange={(value, name) => setFieldValue('amount', value)}
                                                    error={errors.amount}
                                                    touched={touched.amount}
                                                    name={"amount"}
                                                    value={values.amount}
                                                    handleChange={(e) => console.log()}
                                                    handleBlur={handleBlur}
                                                />
                                            </div>
                                        </div>}
                                    </div>


                                </>
                                : null
                        }
                        {
                            val?.selectStatus == "Completed" ? <>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className="mt-2">
                                            <InputLabel className="form-label" name="Upload Invoice" />
                                            <InputText
                                                name="file"
                                                type='file'
                                                className="form-control"
                                                placeholder="Enter file..."
                                                handleChange={(e) => { handeleSelectFile(e) }}
                                                handleBlur={handleBlur}
                                                value={values.file}
                                                error={errors.file}
                                                touch={touched.file} />
                                        </div>
                                    </div>

                                </div>
                            </> : null
                        }
                        <div className='d-flex justify-content-start mt-3'>
                           <InputButton tooltipName="Submit" name={`Submit`} className='btn btn-blue' />
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />

        </>
    )
}

export default React.memo(ManageTask)