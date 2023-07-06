import React from 'react'
import Button from '../InputFunction/Button'
import TextField from '../InputFunction/TextField'
import '../../Css/Advertisement.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { userStoreContactUs } from '../../../redux/actions/UserEcommerceAction'

const ContactUsForm = ({show,setShow}) => {

    const dispatch = useDispatch();

    const { values, setFieldValue, errors, handleBlur, handleChange, handleSubmit, touched, setValues } = useFormik({
        initialValues: {
            name: "",
            phonenumber: "",
            email: '',
            message:''
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('name is required!'),
            email: yup.string().email('invalid Email address').required("Email is required"),
            phonenumber: yup.string().required('phone-number is required!').matches(/^[0-9]+$/, "must be only digits")
                .min(10, 'must be exactly 10 digits')
                .max(10, 'must be exactly 10 digits'),
            message: yup.string().required('message is required!'),
        }),
        onSubmit: (values, { resetForm }) => {
            const formdata = new FormData();
            formdata.append('name',values.name);
            formdata.append('email',values.email);
            formdata.append('phone',values.phonenumber);
            formdata.append('message',values.message);
            dispatch(userStoreContactUs(formdata,show,setShow))
        }
    })

    return (
        <div className='contact-us-form'>
            <form onSubmit={handleSubmit}>              
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="form-group mb-3">
                            <TextField
                                id='name'
                                name="name"
                                placeholder="name"
                                className="form-control"
                                type="text"
                                error={errors.name}
                                event={handleChange}
                                event1={handleBlur}
                                touch={touched.name}
                                value={values.name}
                            />
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="form-group mb-3">
                            <TextField
                                id='email'
                                name="email"
                                placeholder="email"
                                className="form-control"
                                type="text"
                                event={handleChange}
                                event1={handleBlur}
                                value={values.email}
                                error={errors.email}
                                touch={touched.email}
                            />
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className="form-group mb-3">
                            <textarea value={values.message} className='form-control' style={{height:'70px'}}
                                placeholder={'message'} onBlur={handleBlur}
                                onChange={handleChange} id='message' name='message'
                                rows={3}
                            />
                            {errors.message && touched.message && <span className='text-danger'>{errors.message}</span>}
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <div className='row justify-content-center align-items-center'>
                            <div className='col-12'>
                                <div className="form-group mb-0 d-flex">
                                    <div className="pe-0" style={{ width: '50px', height: '45px', backgroundColor: 'white', borderBottom: '2px solid #e8e8e8', textAlign: 'center', display: 'block', paddingTop: '9px' }}>
                                        + 91
                                    </div>
                                    <div className='w-100'>
                                        <TextField
                                            style={{ paddingRight: '0px' }}
                                            id='phonenumber'
                                            name="phonenumber"
                                            placeholder="phone-number"
                                            className="form-control"
                                            type="text"
                                            event={handleChange}
                                            event1={handleBlur}
                                            value={values.phonenumber}
                                            error={errors.phonenumber}
                                            touch={touched.phonenumber}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mb-0">
                            <Button type="submit" className=" btn btn-inline mt-3" icon="far fa-paper-plane" name="Submit" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default React.memo(ContactUsForm)
