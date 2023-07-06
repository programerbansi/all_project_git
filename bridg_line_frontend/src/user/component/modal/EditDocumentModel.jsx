import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import InputText from '../function/InputText';
import InputLabel from '../function/InputLabel';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { DELETE_SHEET, GET_DOCUMENT_LIST, UPLOAD_DOCUMENT, curdData, getData} from '../../../redux/action/Action';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsFiletypeCsv, BsFiletypeDoc, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng, BsFiletypeXlsx } from 'react-icons/bs';
import { SiJpeg } from 'react-icons/si';

const EditDocumentModel = ({ show, setShow, loading, setLoading, editItem, seteditItem ,action,setAction,invoice_id,currentPage,setCurrentPage}) => {
    const dispatch = useDispatch();
    const [sheetArray, setSheetArray] = useState(editItem ? editItem?.sheet : []);
    const [errormsg1, setErrormsg1] = useState("");
    const [errormsg2, setErrormsg2] = useState("");
    let userid = getLoggedInUser();
    useEffect(() => {
        if (action == 'edit') {
            setFieldValue('sheet', editItem?.sheet)
        }
    }, [editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: {
            sheet: "",
        },
        validationSchema: yup.object({
            sheet: yup.mixed().required('sheet is required!'),
        }),

        onSubmit: (values, { resetForm }) => {

            let arr2 = []
            setLoading(true);
            const formdata = new FormData();
            formdata.append(`user_id`,  userid?.id)
            formdata.append(`invoice_id`, invoice_id)
            formdata.append(`firstname`, userid.firstname)
            formdata.append(`lastname`, userid.lastname)
            arr2 = sheetArray.filter((item) => {
                if ('lastModified' in item == true) {

                    return item
                }
            })
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

            dispatch(curdData(formdata,setLoading, setShow, setAction,`/upload-document`,UPLOAD_DOCUMENT,`/get-document/${invoice_id}/?page=${currentPage}`,GET_DOCUMENT_LIST,"Document uploaded successful."));
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

                seterror1 ? setErrormsg2('You can choose only 50 mb or less than 50 mb file size') : setErrormsg2('')
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

                        dispatch(getData('',`/user/delete-sheet/${photo?.id}`,DELETE_SHEET))
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
                         Upload Documents
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                   
                        <div className='row'>
                        <div className='col'>
                               
                                    <div className="mb-1">
                                        <InputLabel className="form-label" name="Documents" />
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
                            
                                <div className='flex-wrap d-flex'>
                                    {sheetArray ? renderPhotos2() : null}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <InputButton name={`Close`} className='btn btn-danger' event={() => { handleClose() }} />
                        {loading ? <InputButtonLoad classname={'nav-plus-btn btn text-white'} name={"Uploading..."} /> : <InputButton name={`Upload`} className='nav-plus-btn btn text-white' />}
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditDocumentModel