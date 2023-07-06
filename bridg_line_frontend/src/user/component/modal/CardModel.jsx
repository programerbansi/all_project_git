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
import { useDispatch, } from 'react-redux';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { CARD, HOME, TEAM } from '../../../services/UserRoutePath';
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import CreditCardInput from 'react-credit-card-input';
import { EDIT_USER_CARD, GET_USER_CARDLIST, addInvoice, addUserCard, addUserTeam, curdData, getJobTypes, updateInvoice, updateUserCard, updateUserTeam } from '../../../redux/action/Action';
import Payment from "payment";
const CardModel = ({ title, show, setShow, action, setAction, loading, setLoading, editItem, seteditItem, currentPage, setCurrentPage }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    let user = getLoggedInUser();
    let load = false;

    useEffect(() => {
        if (action == 'edit') {
                    setFieldValue("number", editItem?.number)
                    setFieldValue("expiry", editItem?.expiry)
                    setFieldValue("cvc", editItem?.cvc)
        }
    }, [editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, setFieldError, setErrors } = useFormik({
        initialValues:{ number: "", expiry: "", cvc: "" } ,
        validationSchema: yup.object({
            number: yup.string().required('required!'),
            expiry: yup.string().required('required!'),
            cvc: yup.string().required('required!'),
        }) ,

        onSubmit: (values, { resetForm }) => {
            const formdata = new FormData();
                    const issuer = Payment.fns.cardType(values.number);
                    formdata.append('card_number', values.number);
                    formdata.append('expiry', values.expiry);
                    formdata.append('cvc', values.cvc);
                    formdata.append('issuer', issuer);
                    formdata.append('user_id', user?.id);
            if (action == 'add') {
                        let year = values.expiry.substr(4, 5)
                        if (year >= 69) {return}
                        else {
                            setLoading(true);
                            dispatch(addUserCard(formdata, user?.id, setLoading, setShow, setAction));
                            seteditItem('')
                            resetForm({ values: '' });
                        }
            }
            else {
               
                            setLoading(true);                         
                            let year = values?.expiry?.substr(4, 5)
                            if (year >= 69) {return}
                            else {
                                setLoading(true);
                            dispatch(curdData(formdata,setLoading, setShow, setAction, `/user/update-card/${editItem?.id}`,EDIT_USER_CARD,`/user/get-user-card/${user.id}/?page=${currentPage}`,GET_USER_CARDLIST,"Card updated successful."));
                            seteditItem('')
                            resetForm({ values: '' });
                        }                       
            }

        }
    })

    const handleClose = () => {
        setShow(false);
        setAction('');
        seteditItem('');
    }
    
    const handleInput1 = (e) => {
        setFieldValue('number', e.target.value);
    };
    const handleInput2 = (e) => {
        setFieldValue('expiry', e.target.value);


    };
    const handleInput3 = (e) => {
        setFieldValue('cvc', e.target.value);
    };

    useEffect(() => {
        let year = values?.expiry?.substr(4, 5)
        if (year >= 69) {
            setFieldError('expiry', 'Invalid Date !')
        }
    }, [values?.expiry, errors])
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
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-1">
                                    <CreditCardInput
                                        onError={({ inputName, err }) => console.log(`credit card input error: ${err}`)}
                                        fieldClassName={`input border w-100 ${errors?.number || errors?.cvc || errors?.expiry ? 'border-danger' : 'border'}`}
                                        dangerTextClassName=" d-none text-danger"
                                        dangerTextStyle=" d-none text-danger"
                                        invalidClassName={`border-danger`}
                                        containerClassName='w-100'
                                        cardCVCInputProps={
                                            {
                                                value: values?.cvc,
                                                onBlur: e => console.log('cvc blur', e),
                                                onChange: (e) => { handleInput3(e) },
                                                onError: err => console.log(`cvc error: ${err}`)
                                            }
                                        }
                                        cardExpiryInputProps={{
                                            value: values?.expiry,
                                            onBlur: e => console.log('expiry blur', e),
                                            onChange: (e) => { handleInput2(e) },
                                            onError: err => console.log(`expiry error: ${err}`)
                                        }}
                                        cardNumberInputProps={{
                                            value: values?.number,
                                            onBlur: e => console.log('number blur', e),
                                            onChange: (e) => { handleInput1(e) },
                                            onError: err => console.log(`number error: ${err}`)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
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

export default CardModel