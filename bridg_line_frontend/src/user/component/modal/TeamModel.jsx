import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import InputText from '../function/InputText';
import InputLabel from '../function/InputLabel';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useLocation } from 'react-router';
import { useDispatch, } from 'react-redux';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { TEAM } from '../../../services/UserRoutePath';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { ADD_USER_TEAM, EDIT_USER_TEAM, GET_USER_TEAM_LIST, curdData} from '../../../redux/action/Action';
import InputCheckBox from '../function/InputCheckBox';

const TeamModel = ({ title, show, setShow, action, setAction, loading, setLoading, editItem, seteditItem, currentPage, setCurrentPage }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    let userid = getLoggedInUser();
    useEffect(() => {
        if (action == 'edit') {
            switch (pathname) {
                case TEAM:
                    setFieldValue("fname", editItem?.firstname)
                    setFieldValue('lname', editItem?.lastname)
                    setFieldValue('email', editItem?.email)
                    setFieldValue('psw', editItem?.visible_password)
                    const statusArr = ['Home', 'Invoice', 'Completed', 'Team', 'Card', 'Bill History', 'Logs'];
                    statusArr.forEach((status) => {
                        if (editItem?.status?.includes(statusArr.indexOf(status) + 1)) {
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
    }, [editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: pathname == TEAM ? { fname: "", email: "", lname: "", psw: "", notify: "", home: "", invoice: "", report: "", team: "", card: "", bill: "" } : null,
        validationSchema: pathname == TEAM ? yup.object({
            fname: yup.string().required('First name is required!'),
            lname: yup.string().required('Last name is required!'),
            email: yup.string().email('Invalid Email address!').required("Email is required!"),
            psw: yup.string().min(6, 'Password must be 6 character length!').required('Password is required!'),
        }) : null,

        onSubmit: (values, { resetForm }) => {
            let arr = [];
            const formdata = new FormData();
            switch (pathname) {
                case TEAM:
                    setLoading(true);
                    const statusArr = ['Home', 'Invoice', 'Completed', 'Team', 'Card', 'Bill History', 'Logs'];
                    statusArr.forEach((status) => {
                      if (values[status]) {
                        arr.push(statusArr.indexOf(status) + 1);
                      }
                    });
                    formdata.append('firstname', values.fname);
                    formdata.append('lastname', values.lname);
                    formdata.append('email', values.email);
                    formdata.append('password', values.psw);
                    formdata.append('user_id', userid?.id);
                    formdata.append('role', 'user');
                    formdata.append('status', arr)
                    break;
                default:
                    break;
            }
            if (action == 'add') {
                switch (pathname) {
                    case TEAM:
                        dispatch(curdData({ 'firstname': values.fname, 'lastname': values.lname, 'email': values.email, 'password': values.psw, 'user_id': userid?.id, 'role': 'user', 'status': arr }, setLoading, setShow, setAction, '/user/create-user-team', ADD_USER_TEAM, `/user/get-user-team/${userid?.id}/?page=${currentPage}`, GET_USER_TEAM_LIST, "Team member added successful."));
                        break;
                    default:
                        break;
                }
            }
            else {
                switch (pathname) {
                    case TEAM:
                        dispatch(curdData({ 'firstname': values.fname, 'lastname': values.lname, 'email': values.email, 'password': values.psw, 'user_id': userid?.id, 'role': 'user', 'status': arr }, setLoading, setShow, setAction, `/user/update-user-team/${editItem?.main_id}/${editItem?.email}`, EDIT_USER_TEAM, `/user/get-user-team/${userid?.id}/?page=${currentPage}`, GET_USER_TEAM_LIST, "Team member updated successful."));
                        break;
                    default:
                        break;
                }
            }
            seteditItem('')
            resetForm({ values: '' });
        }
    })

    const handleClose = () => {
        setShow(false);
        setAction('');
        seteditItem('');
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
        { name: 'Home', value: 1 },
        { name: 'Invoice', value: 2 },
        { name: 'Completed', value: 3 },
        { name: 'Team', value: 4 },
        { name: 'Card', value: 5 },
        { name: 'Bill History', value: 6 },
        { name: 'Logs', value: 7 },
      ];
   
    return (
        <>

            <Modal
                show={show}
                onHide={() => { handleClose() }}
                size="md"
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

                        {pathname == TEAM ? <>
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
                                            name="psw"
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Password "
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            value={values.psw}
                                            error={errors.psw}
                                            touch={touched.psw} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <InputLabel className="form-label" name="Access" />
                              <div className='row'>
                                {
                                    checkboxValues.map((checkbox) => (
                                        <div className='col-md-4 col-6' key={checkbox.name}>
                                          <InputCheckBox
                                            name={checkbox.name}
                                            className="form-checkbox mx-2"
                                            id={checkbox.name}
                                            event={() => handleCheckboxChange(checkbox.name, checkbox.value)}
                                          /> {checkbox.name}
                                        </div>
                                      ))
                                }
                                    </div>
                                </div>
                            </div>

                        </> : null}

                    </Modal.Body>

                    <Modal.Footer>
                        <InputButton name={`Close`} className='btn btn-danger' event={() => { handleClose() }} />
                        {loading ? <InputButtonLoad classname={'nav-plus-btn btn text-white'} name={action == "add" ? "Adding..." : "Editing..."} /> : <InputButton name={`${action == "add" ? "Add" : "Edit"} ${title}`} className='nav-plus-btn btn text-white' />}
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default TeamModel