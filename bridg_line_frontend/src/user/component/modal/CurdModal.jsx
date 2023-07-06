import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputSelectBox from '../function/InputSelectBox';
import InputText from '../function/InputText';
import InputLabel from '../function/InputLabel';
import { useFormik } from 'formik';
import { UserValAuthContext } from '../context/UserAuthProvider'
import * as yup from 'yup'
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { states_opt } from '../json/arrayJson';
import { HOME } from '../../../services/UserRoutePath';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { ADD_INVOICE, DELETE_PHOTO, DELETE_SHEET, EDIT_INVOICE, GET_INVOICE_LIST, GET_JOB_TYPES, addData, addInvoice, curdData, deletePhoto, deleteSheet, getData, getDataWithLoading, getJobTypes, updateInvoice } from '../../../redux/action/Action';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsFiletypeXlsx, BsFiletypeDoc, BsFiletypeCsv, BsFiletypeJpg, BsFiletypePng, BsFiletypePdf } from "react-icons/bs";
import { SiJpeg } from "react-icons/si";
import InputCheckBox from '../function/InputCheckBox';


const CurdModal = ({ title, show, setShow, action, setAction, loading, setLoading, editItem, seteditItem, currentPage, setCurrentPage }) => {
    const val = useContext(UserValAuthContext);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const [imgArray, setImgArray] = useState(editItem ? editItem?.photo : []);
    const [errormsg, setErrormsg] = useState();
    const [sheetArray, setSheetArray] = useState(editItem ? editItem?.sheet : []);
    const [errormsg1, setErrormsg1] = useState("");
    const [errormsg2, setErrormsg2] = useState("");
    const [estimate, setEstimate] = useState(action == 'edit' && editItem.estimate == 1 ? true :false );
    let userid = getLoggedInUser();
    let load = false;
    useEffect(() => {
        if (!load) {
            dispatch(getDataWithLoading(`/user/get-job-type`, GET_JOB_TYPES, setLoading));
        }
        return () => { load = true }
    }, [])
    useEffect(() => {
        if (action == 'edit') {

            setFieldValue("fname", editItem?.firstname)
            setFieldValue('lname', editItem?.lastname)
            setFieldValue('email', editItem?.email == null ? '' : editItem?.email)
            setFieldValue('main_phone', editItem?.main_phone == null ? '' : editItem?.main_phone)
            setFieldValue('mobile_phone', editItem?.mobile_phone == null ? '' : editItem?.mobile_phone)
            setFieldValue('addr_1', editItem?.address_1)
            setFieldValue('addr_2', editItem?.address_2 == null ? '' : editItem?.address_2)
            setFieldValue('state', {
                label: editItem?.state, value: editItem?.state
            })
            setFieldValue('city', editItem?.city)
            setFieldValue('postal_code', editItem?.postal_code)
            setFieldValue('job_type', {
                label: editItem?.job_type, value: editItem?.job_id
            })
            if(editItem.estimate == 1)
            {
                const checkbox = document.getElementById('estimate');
                checkbox.checked = true;
            }
            
        }
    }, [editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, setTouched, touched, setFieldError } = useFormik({
        initialValues: {
            fname: "",
            email: "",
            main_phone: "",
            lname: "",
            mobile_phone: "",
            addr_1: "",
            addr_2: "",
            photo: "",
            sheet: "",
            state: "",
            city: "",
            postal_code: "",
            job_type: "",
            estimate:"",
        },
        validationSchema: yup.object({
            fname: yup.string().required('First name is required!'),
            lname: yup.string().required('Last name is required!'),
            main_phone: yup.string(),
            addr_1: yup.string().required('required!'),
            state: yup.object().required('required!'),
            city: yup.string().required('required!'),
            postal_code: yup.string().required('postal code is required!').matches(/^[0-9]+$/, "must be only digits")
                .min(5, 'must be exactly 5 digits')
                .max(5, 'must be exactly 5 digits'),
            email: yup.string().email('Invalid Email address!'),
            photo: yup.mixed(),
            // photo: yup.mixed().required('photo is required!'),
            sheet: yup.mixed().required('sheet is required!'),
            // sheet: yup.mixed(),
            job_type: yup.object().required("required"),
        }),
     
        onSubmit: (values, { resetForm }) => {
            let arr = []
            let arr2 = []
            console.log(values)
            const formdata = new FormData();
            formdata.append('firstname', values.fname);
            formdata.append('lastname', values.lname);
            formdata.append('email', values.email ? values.email : null);
            formdata.append('main_phone', values.main_phone ? values.main_phone : null);
            formdata.append('mobile_phone', values?.mobile_phone ? values?.mobile_phone : null);
            formdata.append('address_1', values.addr_1);
            formdata.append('address_2', values?.addr_2 ? values?.addr_2 : null);
            formdata.append('state', values.state.value);
            formdata.append('city', values.city);
            formdata.append('status', 'Pending');
            formdata.append(`uFirstname`, userid.firstname)
            formdata.append(`uLastname`, userid.lastname)
            formdata.append(`estimate`, estimate ? 1:0)
            arr = imgArray.filter((item) => {
                if ('lastModified' in item == true) {

                    return item
                }
            })
            arr2 = sheetArray.filter((item) => {
                if ('lastModified' in item == true) {

                    return item
                }
            })
            if (editItem) {
                for (let i = 0; i < arr.length; i++) {
                    formdata.append(`photo`, arr[i])
                }
            }
            else {
                for (let i = 0; i < imgArray.length; i++) {
                    formdata.append(`photo`, imgArray[i])
                }
            }
            if (editItem) {

                for (let i = 0; i < arr2.length; i++) {
                    formdata.append(`demo_sheet`, arr2[i])
                }
            }
            else {
                for (let i = 0; i < sheetArray.length; i++) {
                    formdata.append(`demo_sheet`, sheetArray[i])
                }
            }
            formdata.append('job_type', values?.job_type.value);
            formdata.append('user_id', Number(userid?.id));
            formdata.append('postal_code', values?.postal_code);
           
            if (action == 'add') {
                // if((sheetArray.length === 0 && estimate) || !(sheetArray.length === 0 && !estimate))
                // {
                    setLoading(true);
                    dispatch(curdData(formdata, setLoading, setShow, setAction, '/user/create-invoice', ADD_INVOICE, `/user/get-invoice/${userid?.id}/?page=${1}`, GET_INVOICE_LIST, "Invoice added successful."));
                    setImgArray([])
                    setSheetArray([])
                    seteditItem('')
                    resetForm({ values: '' });
                // }
                // else {
                //     setFieldError('sheet', 'Please upload demo sheet')
                // }
            }
            else {
                
                // if((sheetArray.length === 0 && estimate) || !(sheetArray.length === 0 && !estimate))
                // {   
                    setLoading(true);
                    dispatch(curdData(formdata, setLoading, setShow, setAction, `/user/update-invoice/${editItem?.id}/${editItem?.email}`, EDIT_INVOICE, `/user/get-invoice/${userid?.id}/?page=${currentPage}`, GET_INVOICE_LIST, "Invoice updated successful."));
                    setImgArray([])
                    setSheetArray([])
                    resetForm({ values: '' });
                    seteditItem('')
                // }
                // else {
                //     setFieldError('sheet', 'Please upload demo sheet')
                // }

            }

        }
    })
    // useEffect(() => {

    //     if (!estimate && values?.sheet == '') setFieldError('sheet', 'Please upload demo sheet')

    // }, [values.sheet, errors,estimate])
    useEffect(() => {
        if (editItem) {
            if (sheetArray.length === 0) {
                setFieldError('sheet', 'Please upload demo sheet')
            }
        }
    }, [editItem, errors.sheet,  sheetArray])
    function formatPhoneNumber(value) {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        }
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
    const handleInput = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setFieldValue('main_phone', formattedPhoneNumber);
    };
    const handleInput1 = (e) => {
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        setFieldValue('mobile_phone', formattedPhoneNumber);
    };
    const handleFileSelect = (e) => {
        setErrormsg('');
        if (e.target.files) {
            setImgArray((prv) => prv.concat(Array.from(e.target.files)))
        }
    }

    const handleFileSelect1 = (e) => {
        setErrormsg1('');
        setErrormsg2('')
        if (e.target.files) {
            setSheetArray((prv) => prv.concat(Array.from(e.target.files)))
        }
    }
    const handleClose = () => {
        setShow(false);
        setAction('');
        setImgArray([])
        setSheetArray([])
        seteditItem('');
    }

    let errorImage = [];
    const renderPhotos1 = () => {
        const a = imgArray.map((item) => {
            if (item.type == 'image/jpeg' || item.type == 'image/jpg' || item.type == 'image/png') {
                return false;
            }
            else {
                errorImage.push(item)
                return true;
            }

        })
        a.map((item) => {
            if (item == true) {
                setImgArray(imgArray.filter(function (item) {
                    for (var key in errorImage) {
                        if (item?.type == errorImage[key]?.type)
                            return false;
                    }
                    return true;
                }))
                let seterror = imgArray.some(function (file) {
                    return file.type == "image/jpg" || "image/jpeg" || 'image/png';
                });
                seterror ? setErrormsg('You must choose .jpeg, .png, or .jpg') : setErrormsg('')
            }

        })
        return imgArray.map((photo, index) => {
            return (<div key={index} className="px-1 pb-2 d-flex">
                {
                    'lastModified' in photo ?
                        <img src={URL.createObjectURL(photo) || ''} alt='' key={index} width="50px" style={{objectFit:"contain"}}></img>
                        :
                        <img src={`${process.env.REACT_APP_PHOTO_IMAGE_URL}${photo?.photo}`} alt='' key={index} width="50px" style={{objectFit:"contain"}}></img>


                }
                <AiOutlineCloseCircle onClick={() => {
                    if ('lastModified' in photo == false) {

                        dispatch(getData('', `/user/delete-photo/${photo?.id}`, DELETE_PHOTO))
                    }
                    setImgArray(imgArray.filter((item, index) => item !== photo))
                }} className="" />
            </div>)

        })
    }
    useEffect(() => {
        if (imgArray.length > 0) {
            setFieldValue('photo', imgArray)
        }
        else {
            setFieldValue('photo', '')
        }
    }, [imgArray])
    let errorImage1 = [];
    let errorImage2 = [];
    const renderPhotos2 = () => {
        const a = sheetArray.map((item) => {
            if (item.type == 'image/jpeg' || item.type == 'image/jpg' || item.type == 'image/png' || item.type == "text/xlsx" || item.type == 'application/doc' || item.type == 'text/csv' || item.type == 'application/pdf') {
                return false;
            }
            else {
                errorImage1.push(item)
                return true;
            }

        })
        const b = sheetArray.map((item) => {
            if (item.size <= 52428800) {
                return false;
            }
            else {
                errorImage2.push(item)
                return true;
            }

        })
        b.map((item) => {
            if (item == true) {
                setSheetArray(sheetArray.filter(function (item) {
                    for (var key in errorImage2) {
                        if (item?.size == errorImage2[key]?.size)
                            return false;
                    }
                    return true;
                }))
                let seterror1 = sheetArray.some(function (file) {
                    return file.size >= 52428800
                        ;
                });

                seterror1 ? setErrormsg2('You can choose only 50 mb or less than 50mb file size') : setErrormsg2('')
            }

        })
        a.map((item) => {
            if (item == true) {
                setSheetArray(sheetArray.filter(function (item) {
                    for (var key in errorImage1) {
                        if (item?.type == errorImage1[key]?.type)
                            return false;
                    }
                    return true;
                }))
                let seterror = sheetArray.some(function (file) {
                    return file.type == "image/jpg" || "image/jpeg" || 'image/png' || "text/xlsx" || "application/doc" || "text/csv" || "application/pdf"
                        ;
                });
                seterror ? setErrormsg1('You must choose .doc, .csv, .xlsx, .pdf, .jpeg, .png, or .jpg') : setErrormsg1('')
            }

        })
        return sheetArray.map((photo, index) => {
            return (<div key={index} className="px-1 pb-2 d-flex">
                {

                    'lastModified' in photo ?
                        <OverlayTrigger
                            key={"top"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`tooltip-${photo.name}`}>
                                    {photo.name}
                                </Tooltip>
                            }
                        >
                            <span className='' style={{ fontSize: "28px" }} >{photo.type == "application/pdf" ? <BsFiletypePdf /> : photo.type == "text/xlsx" ? <BsFiletypeXlsx /> : photo.type == "application/doc" ? <BsFiletypeDoc /> : photo.type == "text/csv" ? <BsFiletypeCsv /> : photo.type == "image/jpg" ? <BsFiletypeJpg /> : photo.type == "image/jpeg" ? <SiJpeg /> : photo.type == "image/png" ? <BsFiletypePng /> : null}</span>
                        </OverlayTrigger>
                        :
                        <OverlayTrigger
                            key={"top"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={`tooltip-${"top"}`}>
                                    {photo.name}
                                </Tooltip>
                            }
                        >
                            <span className='' style={{ fontSize: "28px" }} >{photo.type == "application/pdf" ? <BsFiletypePdf /> : photo.type == "text/xlsx" ? <BsFiletypeXlsx /> : photo.type == "application/doc" ? <BsFiletypeDoc /> : photo.type == "text/csv" ? <BsFiletypeCsv /> : photo.type == "image/jpg" ? <BsFiletypeJpg /> : photo.type == "image/jpeg" ? <SiJpeg /> : photo.type == "image/png" ? <BsFiletypePng /> : null}</span>
                        </OverlayTrigger>


                }
                <AiOutlineCloseCircle onClick={() => {
                    if ('lastModified' in photo == false) {

                        dispatch(getData('', `/user/delete-sheet/${photo?.id}`, DELETE_SHEET))
                    }
                    setSheetArray(sheetArray.filter((item, index) => item !== photo))
                }} className="" />
            </div>)

        })
    }
    useEffect(() => {
        if (sheetArray.length > 0) {
            setFieldValue('sheet', sheetArray)
        }
        else {
            setFieldValue('sheet', '')
        }
    }, [sheetArray])

    const jobTypes = useSelector((state) => state.Reducer.jobTypes);
    const job_opt = jobTypes && jobTypes.map((i, idx) => {
        return { value: i.id, label: i.type }
    })

    const handleCheckboxChange = () => {
        let data = document.getElementById("estimate");
        if (data.checked) setEstimate(true)
        else setEstimate(false)
    }

    return (
        <>

            <Modal
                show={show}
                onHide={() => { handleClose() }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                // centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {action == "add" ? "Create New" : "Update"} {title}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="First Name" />
                                    <InputText
                                        name="fname"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter First Name"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.fname}
                                        error={errors.fname}
                                        touch={touched.fname} />
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Last Name" />
                                    <InputText
                                        name="lname"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Last Name"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.lname}
                                        error={errors.lname}
                                        touch={touched.lname} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Email" />
                                    <InputText
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email "
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.email}
                                        error={errors.email}
                                        touch={touched.email} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Main Phone" />
                                    <InputText
                                        name="main_phone"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter main phone "
                                        handleChange={(e) => handleInput(e)}
                                        handleBlur={handleBlur}
                                        value={values.main_phone}
                                        error={errors.main_phone}
                                        touch={touched.main_phone} />
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Mobile Phone" />
                                    <InputText
                                        name="mobile_phone"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter mobile phone "
                                        handleChange={(e) => handleInput1(e)}
                                        handleBlur={handleBlur}
                                        value={values.mobile_phone}
                                        error={errors.mobile_phone}
                                        touch={touched.mobile_phone} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Address Line1" />
                                    <InputText
                                        name="addr_1"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Address Line1"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.addr_1}
                                        error={errors.addr_1}
                                        touch={touched.addr_1} />
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Address Line2" />
                                    <InputText
                                        name="addr_2"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Address Line2"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.addr_2}
                                        error={errors.addr_2}
                                        touch={touched.addr_2} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-4 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="State" />
                                    <InputSelectBox
                                        opt={states_opt}
                                        name="state"
                                        className="form-select py-0 ps-0 select-control "
                                        placeholder={val?.userAction == 'edit' ? val?.userEditItem?.state : "Select..."}
                                        setFieldValue={setFieldValue}
                                        handleBlur={handleBlur}
                                        value={values.state}
                                        error={errors.state}
                                        touch={touched.state}
                                    />
                                </div>
                            </div>
                            <div className='col-md-4 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="City" />
                                    <InputText
                                        name="city"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter city"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.city}
                                        error={errors.city}
                                        touch={touched.city} />
                                </div>
                            </div>
                            <div className='col-md-4 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Postal Code" />
                                    <InputText
                                        name="postal_code"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter postal code"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.postal_code}
                                        error={errors.postal_code}
                                        touch={touched.postal_code} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Job Type" />
                                    <InputSelectBox
                                        opt={job_opt}
                                        name="job_type"
                                        className="form-select py-0 ps-0 select-control text-capitalize"
                                        placeholder={val?.userAction == 'edit' ? val?.userEditItem?.job_type : "Select..."}
                                        setFieldValue={setFieldValue}
                                        handleBlur={handleBlur}
                                        value={values.job_type}
                                        error={errors.job_type}
                                        touch={touched.job_type}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="mt-2">
                                    <InputCheckBox
                                        name="estimate"
                                        className="form-checkbox"
                                        id="estimate"
                                        event={() => handleCheckboxChange()}
                                    /> <InputLabel className="form-label" name="Estimate" />
                                </div>
                            </div>
                        </div>
                     <><div className='row'>
                     {!estimate ? <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Upload Photos" />
                                    <InputText
                                        name="photo"
                                        type="file"
                                        className="form-control"
                                        handleChange={handleFileSelect}
                                        handleBlur={handleBlur}
                                        value={values.photo}
                                        error={errors.photo}
                                        touch={touched.photo}
                                        multi="multiple" />
                                    {errormsg ? <><span className='text-danger'>{errormsg}</span><br /></> : null}
                                    <span className='text-danger'>{errors && touched.photo && errors.photo}</span>
                                </div>
                                <div className='file-img flex-wrap d-flex'>
                                    {imgArray ? renderPhotos1() : null}
                                </div>
                            </div>: null }   
                            <div className='col-md-6 col-12'>
                                <div className="mb-1">
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Upload Demo Sheets" />
                                        <InputText
                                            name="sheet"
                                            type="file"
                                            className="form-control"
                                            handleChange={handleFileSelect1}
                                            handleBlur={handleBlur}
                                            value={values.sheet}
                                            error={errors.sheet}
                                            touch={touched.sheet}
                                            multi="multiple" />
                                    </div>
                                    <span className='text-danger'>{errormsg1}</span>
                                    <span className='text-danger'>{errormsg2}</span>
                                </div>
                                <div className='flex-wrap d-flex'>
                                    {sheetArray ? renderPhotos2() : null}
                                </div>
                            </div> 
                        </div></>
                    </Modal.Body>

                    <Modal.Footer>
                        <InputButton name={`Close`} className='btn btn-danger' event={() => { handleClose() }} />
                        {loading ? <InputButtonLoad classname={'nav-plus-btn btn text-white'} name={action == "add" ? "Adding..." : "Editing..."} /> : <InputButton name={`${action == "add" ? "Add" : "Edit"} ${title == 'Needs Attention' && pathname == HOME ? "Invoice" : title}`} className='nav-plus-btn btn text-white' />}
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default CurdModal