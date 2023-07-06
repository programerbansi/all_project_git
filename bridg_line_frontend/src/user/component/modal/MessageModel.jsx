import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import InputText from '../function/InputText';
import InputLabel from '../function/InputLabel';
import { useFormik } from 'formik';
import { UserValAuthContext } from '../context/UserAuthProvider'
import * as yup from 'yup'
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { ADD_MESSAGE, GET_MESSAGE_LIST, addMessage, curdData, deletePhoto, deleteSheet, updateDocument, updateInvoice, updatePhoto } from '../../../redux/action/Action';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsFiletypeCsv, BsFiletypeDoc, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng, BsFiletypeXlsx } from 'react-icons/bs';
import { SiJpeg } from 'react-icons/si';
import InputTextArea from '../function/InputTextArea';
import { INVOICE_VIEW } from '../../../services/UserRoutePath';
import { addMessageAdmin } from '../../../redux/action/AdminAction';
import { getLoggedInAdmin } from '../../../services/AdminLocalStorage';

const MessageModel = ({ show, setShow, loading, setLoading, editItem, seteditItem, action, setAction, invoice_id ,currentPage,setCurrentPage}) => {
    const dispatch = useDispatch();
    const [sheetArray, setSheetArray] = useState(editItem ? editItem?.sheet : []);
    const [errormsg1, setErrormsg1] = useState("");
    const [errormsg2, setErrormsg2] = useState("");
    const { pathname } = useLocation();
    const { slug_id } = useParams();
    let userid = getLoggedInUser();
    let admin = getLoggedInAdmin();
    useEffect(() => {
        if (action == 'edit') {
            setFieldValue('sheet', editItem?.sheet)
        }
    }, [editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: {
            sheet: "",
            msg: ""
        },
        validationSchema: yup.object({
            // sheet: yup.mixed().required('sheet is required!'),
            msg: yup.string().required('msg is required!'),
        }),

        onSubmit: (values, { resetForm }) => {

            let arr2 = []
            setLoading(true);
            const formdata = new FormData();
            formdata.append(`user_id`, pathname == `/admin/write-invoice-estimate/${slug_id}` ? admin?.id :userid?.id)
            formdata.append(`invoice_id`, invoice_id)
            formdata.append(`message`, values?.msg)
            formdata.append(`firstname`, pathname == `/admin/write-invoice-estimate/${slug_id}`?admin?.firstname:userid.firstname)
            formdata.append(`lastname`, pathname == `/admin/write-invoice-estimate/${slug_id}`?admin?.lastname:userid.lastname)
            arr2 = sheetArray.filter((item) => {
                if ('lastModified' in item == true) {

                    return item
                }
            })

            if (editItem) {

                for (let i = 0; i < arr2.length; i++) {
                    formdata.append(`document`, arr2[i])
                }
            }
            else {
                for (let i = 0; i < sheetArray.length; i++) {
                    formdata.append(`document`, sheetArray[i])
                }
            }
            if(pathname == `/admin/write-invoice-estimate/${slug_id}`){
                dispatch(addMessageAdmin(formdata, invoice_id, setLoading, setShow));
            }
            else {
                dispatch(curdData(formdata,setLoading,setShow,setAction,`/user/add-message`,ADD_MESSAGE,`/user/get-message/${invoice_id}/?page=${currentPage}`,GET_MESSAGE_LIST,"Note added successful."));
            }
            setSheetArray([])
            seteditItem('')
            resetForm({ values: '' });
        }
    })

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
        setSheetArray([])
        seteditItem('');
    }

    let errorImage1 = [];
    let errorImage2 = [];
    let error1 = '';
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
                    return file.type == "text/xlsx" || "application/doc" || "text/csv" || "application/pdf" || "image/jpg" || "image/jpeg" || "image/png"
                        ;
                });
                seterror ? setErrormsg1('You can choose only jpeg,png,jpg,doc,csv,xlsx,pdf file') : setErrormsg1('')
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
                    // if ('lastModified' in photo == false) {

                        // dispatch(deleteSheet(photo?.id))
                    // }
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
    return (
        <>
            <Modal
                show={show}
                onHide={() => { handleClose() }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Note
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <div className='row'>
                            <div className='col'>
                                <div className="mb-1">

                                    <InputLabel className="form-label" name="Note" />
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

                            </div>

                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-1">
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Add attachments" />
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
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <InputButton name={`Close`} className='btn btn-danger' event={() => { handleClose() }} />
                        {loading ? <InputButtonLoad classname={'nav-plus-btn btn text-white'} name={"Adding..."} /> : <InputButton name={`Add Note`} className='nav-plus-btn btn text-white' />}
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default MessageModel