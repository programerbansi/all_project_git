import React, { useCallback, useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { AdminValAuthContext } from '../../context/AdminAuthProvider';
import InputButton from '../../../user/component/function/InputButton';
import { useFormik } from 'formik';
import InputLabel from '../../../user/component/function/InputLabel';
import InputText from '../../../user/component/function/InputText';
import * as yup from 'yup'
import InputButtonLoad from '../../../user/component/function/InputButtonLoad';
import '../../css/AddEditModel.css'
import { ADD_JOB_TYPE, ADD_NOTIFY, ADD_PAYMENT, ADD_STATUS, ADD_USER, EDIT_JOB_TYPE, EDIT_NOTIFY, EDIT_PAYMENT, EDIT_STATUS, EDIT_USER, GET_JOB_TYPE_LIST, GET_NOTIFY_ADMIN, GET_PAYMENT_LIST, GET_STATUS_LIST, GET_TEAM_LIST, GET_USER_LIST, addAdminData, addJobType, addPayment, addStatus, addTeam, addUser, updateAdminData, updateAdminDatas, updateJobType, updateNotification, updatePayment, updateStatus, updateTeam, updateUser } from '../../../redux/action/AdminAction';
import { useDispatch } from 'react-redux';
import { ADMIN_JOB_TYPE, ADMIN_NOTIFICATION, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER } from '../../../services/AdminRoutePath';
import { useLocation } from 'react-router';
import InputCheckBox from '../../../user/component/function/InputCheckBox';
import InputEditor from '../../../user/component/function/InputEditor';
import { getLoggedInAdmin } from '../../../services/AdminLocalStorage';
import { debounce } from "lodash";
import { email_opt } from '../../../user/component/json/arrayJson';
import InputSelectBox from '../../../user/component/function/InputSelectBox';


const AddEditModel = ({ heading }) => {
    const val = useContext(AdminValAuthContext);
    const { pathname } = useLocation();
    const [checkFlag, setCheckFlag] = useState(false);
    const dispatch = useDispatch();
    const [preview, setPreview] = useState()
    const admin = getLoggedInAdmin();
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/svg", "image/webp"]
    const handleClose = () => {
        val?.setShowModal(false);
        val?.setAction(false);
    }

    useEffect(() => {
        if (val?.action == 'edit') {
            switch (pathname) {
                case ADMIN_USER:
                    setFieldValue("fname", val?.editItem?.firstname)
                    setFieldValue('lname', val?.editItem?.lastname)
                    setFieldValue('email', val?.editItem?.email)
                    setFieldValue('phone', val?.editItem?.phone)
                    setFieldValue('password', val?.editItem?.visible_password)
                    setFieldValue('cname', val?.editItem?.comp_name)
                    setFieldValue('caddre', val?.editItem?.comp_address)
                    setFieldValue('cwebsite', val?.editItem?.comp_website)
                    setFieldValue('image', val?.editItem?.comp_logo)
                    break;
                case ADMIN_JOB_TYPE:
                    setFieldValue("jtype", val?.editItem?.type)
                    break;
                case ADMIN_NOTIFICATION:
                    setFieldValue("subject1", val?.editItem?.subject)
                    setFieldValue("html1", val?.editItem?.html1)
                    setFieldValue("email_status", {value:val?.editItem?.msg_type,label:val?.editItem?.msg_type})
                    break;
                case ADMIN_STATUS:
                    setFieldValue("status", val?.editItem?.status)
                    break;
                case ADMIN_PAYMENT:
                    setFieldValue("publish_key", val?.editItem?.publish_key)
                    setFieldValue('name', val?.editItem?.name)
                    setFieldValue('secret_key', val?.editItem?.secret_key)
                    break;
                case ADMIN_TEAM:
                    setFieldValue("fname", val?.editItem?.firstname)
                    setFieldValue('lname', val?.editItem?.lastname)
                    setFieldValue('email', val?.editItem?.email)
                    setFieldValue('password', val?.editItem?.visible_password)
                    const statusArr = ['dashboard', 'task', 'order', 'customer', 'team', 'payment_method', 'job', 'notify', 'comp_task'];
                    statusArr.forEach((status) => {
                        if (val?.editItem?.status?.includes(statusArr.indexOf(status) + 1)) {
                            const checkbox = document.getElementById(status);
                            checkbox.checked = true;
                            setFieldValue(status, statusArr.indexOf(status) + 1);
                        }
                    });
                    break;
                default:
                    break;
            }
        }
    }, [val?.editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, setFieldError } = useFormik({
        initialValues: pathname == ADMIN_USER ? {
            fname: "",
            email: "",
            password: "",
            lname: "",
            phone: "",
            cname: "",
            caddre: "",
            cwebsite: "",
            image: ""
        } : pathname == ADMIN_TEAM ? {
            fname: "",
            email: "",
            password: "",
            lname: "",
            task: "",
            dashbord: "",
            order: "",
            notify: "",
            comp_task: "",
            customer: "", team: "", payment_method: "", job_type: ""
        } : pathname == ADMIN_JOB_TYPE ? { jtype: "" } : pathname == ADMIN_STATUS ? { status: "", upload_invoice: "" } : pathname == ADMIN_PAYMENT ? {
            name: "",
            publish_key: "",
            secret_key: "",
        } : pathname == ADMIN_NOTIFICATION ? {
            subject1: "",
            html1: "",
            email_status: "",
        } : null,
        validationSchema: pathname == ADMIN_USER ? yup.object({
            fname: yup.string().required('First name is required!'),
            lname: yup.string().required('Last name is required!'),
            cname: yup.string().required('Company name is required!'),
            email: yup.string().email('Invalid Email address!').required("Email is required!"),
            password: yup.string().min(6, 'Password must be 6 character length!').required('Password is required!'),
            phone: yup.string().required('Phone number is required!'),
            image: yup.mixed().required('Company logo is required').test("fileType",
                "You can choose only image file",
                (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)))
                .test(
                    "fileSize",
                    "Upload 180px X 90px image for best result.",
                    (file) => (file && (file.size <= 64800))
                )

        }) : pathname == ADMIN_TEAM ? yup.object({
            fname: yup.string().required('First name is required!'),
            lname: yup.string().required('Last name is required!'),
            email: yup.string().email('Invalid Email address!').required("Email is required!"),
            password: yup.string().min(6, 'Password must be 6 character length!').required('Password is required!'),
        }) : pathname == ADMIN_JOB_TYPE ? yup.object({
            jtype: yup.string().required('Job type is required!'),
        }) : pathname == ADMIN_STATUS ? yup.object({
            status: yup.string().required('Status is required!'),
            upload_invoice: yup.string(),
        }) : pathname == ADMIN_PAYMENT ? yup.object({
            name: yup.string().required('required!'),
            publish_key: yup.string().required('required!'),
            secret_key: yup.string().required('required!'),
        }) : pathname == ADMIN_NOTIFICATION ? yup.object({
            subject1: yup.string().required('required!'),
            html1: yup.mixed().required('required!'),
            email_status: yup.object().required('required!'),
        }) : null,

        onSubmit: (values, { resetForm }) => {
            console.log(values, "----------val---------")
            let arr = [];
            // let statusArr = [1, 2, 3, 4, 5, 6, 7];
            const formdata = new FormData();
            switch (pathname) {
                case ADMIN_USER:
                    formdata.append('firstname', values.fname);
                    formdata.append('lastname', values.lname);
                    formdata.append('email', values.email);
                    formdata.append('password', values.password);
                    formdata.append('phone', values.phone);
                    formdata.append('comp_name', values.cname);
                    formdata.append('comp_address', values?.caddre ? values?.caddre : null);
                    formdata.append('comp_website', values?.cwebsite ? values?.cwebsite : null);
                    formdata.append('image', values.image);
                    formdata.append('role', "user");
                    const statusArr1 = [1, 2, 3, 4, 5, 6, 7];
                    for (let i = 0; i < statusArr1.length; i++) {
                        formdata.append(`status`, Number(statusArr1[i]))
                    }
                    break;
                case ADMIN_JOB_TYPE:
                    formdata.append('type', values.jtype);
                    break;
                case ADMIN_STATUS:
                    formdata.append('status', values.status);
                    formdata.append('show_status', values.upload_invoice == 1 ? values.upload_invoice : 0);
                    break;
                case ADMIN_PAYMENT:
                    formdata.append('name', values.name);
                    formdata.append('publish_key', values.publish_key);
                    formdata.append('secret_key', values.secret_key);
                    break;
                case ADMIN_NOTIFICATION:
                    formdata.append('subject', values.subject1);
                    formdata.append('html1', values.html1);
                    formdata.append('user_id', admin?.id);
                    formdata.append('role', 'admin');
                    formdata.append('email_type', values.email_status.value);                   
                    break;
                case ADMIN_TEAM:
                    const statusArr = ['dashboard', 'task', 'order', 'customer', 'team', 'payment_method', 'job', 'notify', 'comp_task'];
                    statusArr.forEach((status) => {
                        if (values[status]) {
                            arr.push(statusArr.indexOf(status) + 1);
                        }
                    });
                    formdata.append('firstname', values.fname);
                    formdata.append('lastname', values.lname);
                    formdata.append('email', values.email);
                    formdata.append('password', values.password);
                    formdata.append('role', "admin");

                    for (let i = 0; i < arr.length; i++) {
                        formdata.append(`status`, Number(arr[i]))
                    }

                    break;
                default:
                    break;
            }
            if (val?.action == 'add') {
                switch (pathname) {
                    case ADMIN_USER:
                        val?.setLoading(true);
                        dispatch(addAdminData(formdata, '/admin/create-account', ADD_USER, val?.setLoading, val?.setShowModal, val?.setAction, `/admin/get-account/?page=${val?.currentPage}`, GET_USER_LIST, "User added successfully."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_JOB_TYPE:
                        val?.setLoading(true);
                        dispatch(addAdminData(formdata, '/admin/add-job-type', ADD_JOB_TYPE, val?.setLoading, val?.setShowModal, val?.setAction, `/admin/get-job-type-list/?page=${val?.currentPage}`, GET_JOB_TYPE_LIST, "Job type added successfully."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_STATUS:
                        val?.setLoading(true);
                        dispatch(addAdminData(formdata, '/admin/add-status', ADD_STATUS, val?.setLoading, val?.setShowModal, val?.setAction, `/admin/get-status-list/?page=${val?.currentPage}`, GET_STATUS_LIST, "Status added  successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_PAYMENT:
                        val?.setLoading(true);
                        dispatch(addAdminData(formdata, '/admin/add-payment', ADD_PAYMENT, val?.setLoading, val?.setShowModal, val?.setAction, `/admin/get-payment-list/?page=${val?.currentPage}`, GET_PAYMENT_LIST, "Payment Method added successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_TEAM:
                        val?.setLoading(true);
                        dispatch(addAdminData({ 'firstname': values.fname, 'lastname': values.lname, 'email': values.email, 'password': values.password, 'role': 'admin', 'status': arr }, '/admin/create-team-account', ADD_USER, val?.setLoading, val?.setShowModal, val?.setAction, `/admin/get-team-account/?page=${val?.currentPage}`, GET_TEAM_LIST, "Team user added successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_NOTIFICATION:
                        if (values.html1 == "<p><br></p>") {
                            setFieldError("html1", "required!!")
                            
                        }
                        else {
                           
                            val?.setLoading(true);
                            dispatch(addAdminData(formdata, '/admin/add-notify', ADD_NOTIFY, val?.setLoading, val?.setShowModal, val?.setAction, `/admin/get-notify-admin/?page=${val?.currentPage}`, GET_NOTIFY_ADMIN, "Email notifiction added successful."));
                            resetForm({ values: '' });
                        }
                       break;
                    default:
                        break;
                }
            }
            else if (val?.action == 'edit') {
                switch (pathname) {
                    case ADMIN_USER:
                        val?.setLoading(true);
                        dispatch(updateAdminData(formdata, `/admin/update-account/${val?.editItem?.id}/${val?.editItem?.email}`, EDIT_USER, val?.setLoading, val?.setShowModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setEditItem, `/admin/get-account/?page=${val?.currentPage}`, GET_USER_LIST, "User updated successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_JOB_TYPE:
                        val?.setLoading(true);
                        dispatch(updateAdminData(formdata, `/admin/update-job-type/${val?.editItem?.id}`, EDIT_JOB_TYPE, val?.setLoading, val?.setShowModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setEditItem, `/admin/get-job-type-list/?page=${val?.currentPage}`, GET_JOB_TYPE_LIST, "Job type updated successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_STATUS:
                        val?.setLoading(true);
                        dispatch(updateAdminData(formdata, `/admin/update-status/${val?.editItem?.id}`, EDIT_STATUS, val?.setLoading, val?.setShowModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setEditItem, `/admin/get-status-list/?page=${val?.currentPage}`, GET_STATUS_LIST, "Status updated successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_PAYMENT:
                        val?.setLoading(true);
                        dispatch(updateAdminData(formdata, `/admin/update-payment/${val?.editItem?.id}`, EDIT_PAYMENT, val?.setLoading, val?.setShowModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setEditItem, `/admin/get-payment-list/?page=${val?.currentPage}`, GET_PAYMENT_LIST, "Payment Method updated successful."));
                        resetForm({ values: '' });
                        break;
                    case ADMIN_NOTIFICATION:
                        if (values.html1 == "<p><br></p>") {
                            setFieldError("html1", "required!!")
                        }
                        else {
                            const formdata1 = new FormData();
                            formdata1.append('subject', values.subject1);
                            formdata1.append('html1', values.html1);
                            formdata1.append('user_id', admin?.id);
                            formdata1.append('role', 'admin');
                            formdata1.append('email_type', values.email_status.value);
                            formdata1.append('old_msg_type', val.editItem.msg_type)
                            val?.setLoading(true);
                            dispatch(updateAdminDatas(formdata1, `/admin/update-notify/${val?.editItem?.id}`, EDIT_NOTIFY, val?.setLoading, val?.setShowModal, val?.setAction, val?.setEditItem, `/admin/get-notify-admin/?page=${val?.currentPage}`, GET_NOTIFY_ADMIN, "Email notifiction updated successful."));
                            resetForm({ values: '' });
                        }
                        break;
                    case ADMIN_TEAM:
                        val?.setLoading(true);
                        dispatch(updateAdminData({ 'firstname': values.fname, 'lastname': values.lname, 'email': values.email, 'password': values.password, 'role': 'admin', 'status': arr }, `/admin/update-team-account/${val?.editItem?.id}/${val?.editItem?.email}`, EDIT_USER, val?.setLoading, val?.setShowModal, val?.setAction, val?.currentPage, val?.setCurrentPage, val?.setEditItem, `/admin/get-team-account/?page=${val?.currentPage}`, GET_TEAM_LIST, "Team user updated successful."));
                        resetForm({ values: '' });
                        break;
                    default:
                        break;
                }
            }
            else {
                return
            }

        }
    })
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
        setFieldValue('phone', formattedPhoneNumber);
    };

    const handleFileSelect = (e) => {

        setFieldValue('image', e.target.files[0]);
        if (e.target.files[0]) {
            const objectUrl = URL.createObjectURL(e.target.files[0])
            setPreview(objectUrl)
        }
    }
    const handleCheck = () => {
        var x = document.getElementById('post-check');
        if (x.checked) {
            setCheckFlag(true)
            setFieldValue('upload_invoice', 1)
        }
        else {
            setCheckFlag(false)
            setFieldValue('upload_invoice', 0)
        }
    }
    const handleCheckboxChange = (name, value) => {
        let data = document.getElementById(name);
        if (data.checked) {
            setFieldValue(name, value)
        }
        else {
            setFieldValue(name, '')
        }
    };

    const checkboxValues = [
        { name: 'dashboard', value: 1, label: 'Dashboard' },
        { name: 'task', value: 2, label: 'Write Invoice/Estimate' },
        { name: 'order', value: 3, label: 'Order' },
        { name: 'customer', value: 4, label: 'Client' },
        { name: 'team', value: 5, label: 'Team' },
        { name: 'payment_method', value: 6, label: 'Payment Method' },
        { name: 'job', value: 7, label: 'Job Type' },
        { name: 'notify', value: 8, label: 'Notification' },
        { name: 'comp_task', value: 9, label: 'Completed Jobs' },
    ];
    const request = debounce(value => {
        setFieldValue('html1', value)
    }, 1000)
    const debouceRequest = useCallback(value => request(value), []);
    const handleEditorContentChange = useCallback((editor) => {
        debouceRequest(editor);
    }, []);
    return (
        <>
            <Modal
                show={val?.showModal}
                onHide={() => { handleClose() }}
                size={`${pathname == ADMIN_USER ? "lg" : "md"}`}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className='py-2'>
                    <Modal.Title className='fs-5'>
                        {val?.action == "add" ? "Add" : "Edit"} {heading}
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {pathname == ADMIN_USER ? <><div className='row'>
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
                                <div className='col-md-6 col-12'>
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
                                <div className='col-md-6 col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Password" />
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
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Phone" />
                                        <InputText
                                            name="phone"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter phone "
                                            handleChange={(e) => handleInput(e)}
                                            handleBlur={handleBlur}
                                            value={values.phone}
                                            error={errors.phone}
                                            touch={touched.phone} />
                                    </div>
                                </div>

                                <div className='col-md-6 col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Company Website" />
                                        <InputText
                                            name="cwebsite"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter company website"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.cwebsite}
                                            error={errors.cwebsite}
                                            touch={touched.cwebsite} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Company name" />
                                        <InputText
                                            name="cname"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter company name"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.cname}
                                            error={errors.cname}
                                            touch={touched.cname} />
                                    </div>
                                </div>
                                <div className='col-md-6 col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Company Logo" />
                                        <InputText
                                            name="image"
                                            type="file"
                                            className="form-control"
                                            placeholder="Enter company logo"
                                            handleChange={handleFileSelect}
                                            handleBlur={handleBlur}
                                            value={values.image}
                                            error={errors.image}
                                            touch={touched.image} />
                                    </div>
                                    {preview ? <div className="avatar-sm bg-light rounded p-1 ms-2">
                                        <img src={preview} className="img-fluid d-block" style={{ objectFit: "contain" }} />
                                    </div> :
                                        !preview && val?.action == "edit" && val?.editItem?.comp_logo ? <div className="avatar-sm bg-light rounded p-1 ms-2">
                                            <img src={`${process.env.REACT_APP_COMPANY_IMAGE_URL}${val?.editItem?.comp_logo}`} className="img-fluid d-block h-100" style={{ objectFit: "contain" }} />
                                        </div>
                                            :
                                            null}
                                </div>
                                <div className='col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Company Address" />
                                        <InputText
                                            name="caddre"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter company address"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.caddre}
                                            error={errors.caddre}
                                            touch={touched.caddre} />
                                    </div>

                                </div>
                            </div></> : null}
                        {pathname == ADMIN_TEAM ? <>
                            <div className='row'>
                                <div className='col'>
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
                            </div>
                            <div className='row'>
                                <div className='col'>
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
                                <div className='col'>
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
                                <div className='col'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Password" />
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
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <InputLabel className="form-label" name="Access" />
                                    <div className='row'>
                                        {
                                           checkboxValues.map((checkbox) => (
                                            checkbox.value !== 1 && (
                                              <div className="col-md-6 col-12" key={checkbox.name}>
                                                <InputCheckBox
                                                  name={checkbox.name}
                                                  className="form-checkbox mx-2"
                                                  id={checkbox.name}
                                                  event={() => handleCheckboxChange(checkbox.name, checkbox.value)}
                                                />
                                                {checkbox.value !== 1 && checkbox.label}
                                              </div>
                                            )
                                          ))
                                        }
                                    </div>
                                </div>

                            </div>

                        </> : null}
                        {pathname == ADMIN_NOTIFICATION ? <>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Message Type" />
                                        <InputSelectBox
                                            opt={email_opt}
                                            name="email_status"
                                            className="form-select py-0 ps-0 select-control text-capitalize"
                                            placeholder={val?.userAction == 'edit' ? val?.userEditItem?.msg_type : "Select..."}
                                            setFieldValue={setFieldValue}
                                            handleBlur={handleBlur}
                                            value={values.email_status}
                                            error={errors.email_status}
                                            touch={touched.email_status}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-2">
                                        <InputLabel className="form-label" name="Subject" />
                                        <InputText
                                            name="subject1"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter subject"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.subject1}
                                            error={errors.subject1}
                                            touch={touched.subject1} />
                                    </div>
                                </div>
                            </div>



                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-2">
                                        <InputLabel className="form-label" name="Body" />
                                        <InputEditor
                                            id='html1'
                                            name='html1'
                                            value={values.html1}
                                            handleChange={handleEditorContentChange}
                                            error={errors.html1}
                                            touch={touched.html1}
                                        />
                                    </div>
                                </div>
                            </div>

                        </> : null}
                        {pathname == ADMIN_JOB_TYPE ? <>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Job Type" />
                                        <InputText
                                            name="jtype"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Job Type"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.jtype}
                                            error={errors.jtype}
                                            touch={touched.jtype} />
                                    </div>
                                </div></div></> : null}
                        {pathname == ADMIN_STATUS ? <>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-2">
                                        <InputLabel className="form-label" name="Status" />
                                        <InputText
                                            name="status"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Status"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.status}
                                            error={errors.status}
                                            touch={touched.status} />
                                    </div>
                                </div>
                            </div> <div className='row'>
                                <div className='col'>
                                    <div className="mb-1">
                                        <div className="checkbox">
                                            <label>
                                                <InputCheckBox checkFlag={checkFlag} id="post-check" name="checkterm" event={() => { handleCheck() }} /> Upload Invoice
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div></> : null}
                        {pathname == ADMIN_PAYMENT ? <><div className='row'>
                            <div className='col'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Name" />
                                    <InputText
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Name"
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name}
                                        touch={touched.name} />
                                </div>
                            </div>
                        </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Publish Key" />
                                        <InputText
                                            name="publish_key"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Publish Key"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.publish_key}
                                            error={errors.publish_key}
                                            touch={touched.publish_key} />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Secret Key" />
                                        <InputText
                                            name="secret_key"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Secret Key"
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.secret_key}
                                            error={errors.secret_key}
                                            touch={touched.secret_key} />
                                    </div>
                                </div>

                            </div>
                        </> : null}

                    </Modal.Body>
                    <Modal.Footer>
                        <InputButton name={`Close`} className='btn btn-danger' event={() => { handleClose() }} />
                        {val?.loading ? <InputButtonLoad classname={'nav-plus-btn btn text-white'} name={val?.action == "add" ? "Adding..." : heading == 'Email Notification' ? "Saving..." : "Editing..."} /> : <InputButton name={`${val?.action == "add" ? "Add" : heading != 'Email Notification' ? "Edit" : ''} ${heading == 'Email Notification' ? 'Save' : `${heading}`}`} className='nav-plus-btn btn text-white' />}
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    )
}

export default AddEditModel