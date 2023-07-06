import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import InputText from '../function/InputText';
import InputLabel from '../function/InputLabel';
import { useFormik } from 'formik';
import { UserValAuthContext } from '../context/UserAuthProvider'
import * as yup from 'yup'
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import InputButtonLoad from '../function/InputButtonLoad';
import InputButton from '../function/InputButton';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getLoggedInUser } from '../../../services/UserLocalStorage';
import { DELETE_PHOTO, GET_PHOTO_LIST, UPLOAD_PHOTO, curdData, deletePhoto, getData, updateInvoice, updatePhoto } from '../../../redux/action/Action';

const EditPhotoModel = ({ show, setShow, loading, setLoading, editItem, seteditItem ,action,setAction,invoice_id,currentPage,setCurrentPage}) => {
    const dispatch = useDispatch();
    const [imgArray, setImgArray] = useState(editItem ? editItem?.photo : []);
    const [errormsg, setErrormsg] = useState();
    let userid = getLoggedInUser();
    useEffect(() => {
        if (action == 'edit') {
            setFieldValue('photo', editItem?.photo)
        }
    }, [editItem])

    const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } = useFormik({
        initialValues: {
            photo: "",
        },
        validationSchema: yup.object({
            photo: yup.mixed().required('photo is required!'),
        }),

        onSubmit: (values, { resetForm }) => {

            let arr = []
            setLoading(true);
            const formdata = new FormData();
            formdata.append(`user_id`,  userid?.id)
            formdata.append(`invoice_id`, invoice_id)
            formdata.append(`firstname`, userid.firstname)
            formdata.append(`lastname`, userid.lastname)
            arr = imgArray.filter((item) => {
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

            dispatch(curdData(formdata,setLoading, setShow, setAction,`/upload-photo`,UPLOAD_PHOTO,`/get-photo/${invoice_id}/?page=${currentPage}`,GET_PHOTO_LIST,"Photo uploaded successful."));
            setImgArray([])
            seteditItem('')
            resetForm({ values: '' });
        }
    })
  
    const handleFileSelect = (e) => {
        setErrormsg('');
        if (e.target.files) {
            setImgArray((prv) => prv.concat(Array.from(e.target.files)))
        }
    }

  
    const handleClose = () => {
        setShow(false);
        setAction('');
        setImgArray([])
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

                        dispatch(getData('',`/user/delete-photo/${photo?.id}`,DELETE_PHOTO))
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
                         Upload Photos
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                   
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-1">
                                    <InputLabel className="form-label" name="Photos" />
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
                                    <span className='text-danger'>{errormsg}</span>
                                </div>
                                <div className='file-img flex-wrap d-flex mt-2'>
                                    {imgArray ? renderPhotos1() : null}
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

export default EditPhotoModel