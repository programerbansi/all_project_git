import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import Button from '../InputFunction/Button';
import { useFormik } from 'formik';
import * as yup from 'yup'
import TextField from '../InputFunction/TextField';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { storeReview } from '../../../redux/actions/UserEcommerceAction';
import { Rating } from '@mui/material';

const NotificationModal = ({ show, setShow, notification, setNotification }) => {
    const [rating,setRating] = useState(0);

    const dispatch = useDispatch();
    const loggedInUser = getLoggedInUser();

    const handleClose = () => {
        setShow(false);
        setNotification({});
    }

    const { handleBlur, handleSubmit, values, setFieldValue, errors, touched, handleChange } = useFormik({
        initialValues: {
            description: '',
            media: [],
            star:0,
        },
        validationSchema: yup.object({
            description: yup.string().required("description is required").min(2, 'description is required'),
            star:yup.number().min(1, 'you must give ratings '),
            media: yup.array().max(5, "maximum 5 files")
        }),
        onSubmit: (values, { resetForm }) => {

            const formdata = new FormData();
            formdata.append('description', values.description);

            for (let i = 0; i <  values.media.length; i++) {
                formdata.append(`media[${i}]`,  values.media[i])
           }      
            formdata.append('user_id', loggedInUser?.id);
            formdata.append('item_id', notification?.item_id)
            formdata.append('star', values.star);

            if (values) {
                dispatch(storeReview(formdata,handleClose()));
                resetForm({ values: '' });
            }
        }
    })
    const handleFileChange = (e) => {
        setFieldValue('media', Object.values(e.target.files));
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Product</Modal.Title>
                    <Modal.Title onClick={handleClose} style={{ display: 'block', marginLeft: 'auto', cursor: 'pointer' }}>
                        <i className="fas fa-times" style={{color:'#343a40'}}></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='w-100 border-0'>
                        <Card.Img style={{ height: '150px', width: '150px' }} variant="top" src={notification?.items?.itemimage ? `${process.env.REACT_APP_ITEMS_IMAGE_URL}${notification?.items?.itemimage[0]?.image}` : "images/avatar/not-image.png"} />
                        <Card.Body>
                            <Card.Title>{notification?.items?.name}</Card.Title>
                            <Card.Text className='mt-1 mb-2'>
                                {notification?.items?.description}
                            </Card.Text>
                            <Card.Text className='mt-1' style={{ fontWeight: '400' }}>
                                ₹ {new Intl.NumberFormat('en-IN').format(notification?.items?.price)}
                            </Card.Text>
                        </Card.Body>
                        {
                            notification?.buyer_id == loggedInUser?.id &&
                            <Card.Body style={{ border: '1px solid #f0f0f0', borderRadius: '10px' }}>
                                <div className="ad-details-review">
                                    <form className="review-form" onSubmit={handleSubmit}>                                  
                                        <div className="form-group">
                                            <TextField
                                                id='description'
                                                name="description"
                                                placeholder="Description"
                                                className="form-control"
                                                type="text"
                                                event={handleChange}
                                                event1={handleBlur}
                                                value={values.description}
                                                error={errors.description}
                                                touch={touched.description}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextField
                                                id='image'
                                                name="image"
                                                placeholder=""
                                                className="form-control"
                                                type="file"
                                                event={handleFileChange}
                                                value={values.media}
                                                error={errors.media}
                                                touch={touched.media}
                                                multi="multiple"
                                                accept={"image/*,video/*"}
                                            />
                                        </div>
                                        <Rating
                                            id='star'
                                            name="star"
                                            value={values.star}
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
                                                setFieldValue('star',newValue);
                                            }}
                                        /><br/>
                                        {errors.star && touched.star ? (<span className='text-danger'>{errors.star}</span>) : null}                                      
                                        <Button name={'drop your review'} icon="fas fa-tint" className="btn btn-inline review-submit" type="submit" event={handleSubmit} />                                   
                                  </form>
                                </div>
                            </Card.Body>
                        }
                    </Card>
                </Modal.Body>              
            </Modal>
        </>
    )
}

export default React.memo(NotificationModal)
