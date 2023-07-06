import React, { useContext, useEffect, useState } from 'react'
import TextField from '../InputFunction/TextField'
import AddPostTabs from './AddPostTabs'
import Button from '../InputFunction/Button';
import CheckBoxField from '../InputFunction/CheckBoxField'
import EditorField from '../InputFunction/EditorField';
import * as yup from 'yup'
import { useFormik } from 'formik';
import Lable from '../InputFunction/Lable';
import SafetyTips from '../DetailPages/ProductPage/ProductLeftSide/SafetyTips';
import RadioButton from '../InputFunction/RadioButton';
import '../../Css/AdPost.css'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_BRAND, GET_USER_CATEGORY, GET_USER_TAG, GET_USER_TYPE, GetUserBrand, GetUserCategory, GetUserSubCategory, GetUserTag, GetUserType, getDatas, userAddProduct, userDeleteProductImage, userUpdateProduct } from '../../../redux/actions/UserEcommerceAction';
import SearchSelectBox from '../InputFunction/SearchSelectBox';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import AreaDetail from '../InputFunction/AreaDetail';
import SnackBar from '../../../admin/Actions/SnackBar';
import RightAds from '../Advertisement/RightAds';
import LeftAds from '../Advertisement/LeftAds';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserValAuthContext } from '../Context/UserValContext';
import { useCallback } from 'react';
import { debounce } from "lodash";
import { AD_POST } from '../../../services/UserRoutePath';
import { Label } from '@mui/icons-material';
const parse = require('html-react-parser');
const AdPost = ({ left_ads, right_ads }) => {

    const dispatch = useDispatch();
    const val = useContext(UserValAuthContext);
    const { state } = useLocation();
    const location = useLocation();

    const [imgArray, setImgArray] = useState([]);
    const [errormsg, setErrormsg] = useState("");
    const [message, setMessage] = useState('');
    const [error1, setError1] = useState('');
    const [status, setStatus] = useState(false);

    const [editorText, setEditorText] = useState();
    const [checkFlag, setCheckFlag] = useState(true);
    const [checkPrice,setCheckPrice] = useState(false)
    const userid = getLoggedInUser();
    const navigate = useNavigate();
    let load = false;

    useEffect(() => {
        window.scrollTo(
            { top: 0 }
        )
    }, [])

    useEffect(() => {
        if (state) {

            val.setHidecategory(false);
             setFieldValue('pname', state?.name)
            setFieldValue('price', state?.price)
            setFieldValue('description1', state?.description)
            setFieldValue('Brand', {
                label: state?.brand?.name, value: state?.brand?.id
            })
            setImgArray(state?.itemimage)
            setFieldValue('neighbourhood', state?.location?.neighbourhood)
            setFieldValue('Category', {
                label: state?.category?.name, value: state?.category?.id
            })
            setFieldValue('Type', {
                label: state?.types?.name, value: state?.types?.id
            })
            setFieldValue('Tag', state?.tags?.map((item) => {
                return { label: item?.name, value: item?.id }
            }))
            setFieldValue('city', {
                label: state?.location?.citi?.name, value: state?.location?.citi?.id
            })
            setFieldValue('state', {
                label: state?.location?.state?.name, value: state?.location?.state?.id
            })
            setFieldValue('condition', state?.item_condition)
            setFieldValue('checkterm', true);
            var used = document.getElementById('used')
            var new1 = document.getElementById('new')
            var post_check = document.getElementById('post-check')
            if (state?.condition == 'used') {
                used.checked = true;
                post_check = true;
            }
            else {
                new1.checked = true;
                post_check.checked = true;
            }
            setErrormsg('');
            setImgArray(state?.itemimage?.map((item) => { return { id: item?.id, name: item?.image, type: `image/${item?.image.split('.')[1]}` } }))
        }
        else {
            setFieldValue('pname', "")
            setFieldValue('price', "")
            setFieldValue('description1', "")
            setFieldValue('Brand', "")
            setFieldValue('neighbourhood', "")
            setFieldValue('Category', "")
            setFieldValue('Type', "")
            setFieldValue('Tag', "")
            setFieldValue('city', "")
            setFieldValue('state', "")
            setFieldValue('condition', "")
            setFieldValue('checkterm', false);
            setFieldValue('quantity', 1);
            setImgArray([]);
            var used = document.getElementById('used')
            var new1 = document.getElementById('new')
            var post_check = document.getElementById('post-check')
            if (used.checked || new1.checked || post_check.checked) {
                used.checked = false;
                new1.checked = false;
                post_check.checked = false;
            }
            var element = document.getElementsByClassName("ql-editor");
            element[0].innerHTML = "";
        }
    }, [state])

    useEffect(() => {
        if (!load) {
            if (location?.pathname == AD_POST) {
                dispatch(getDatas(`getsubcat`,GET_USER_CATEGORY));
                dispatch(getDatas(`getbrand`,GET_USER_BRAND));
                dispatch(getDatas(`gettag`,GET_USER_TAG));
                dispatch(getDatas(`gettype`,GET_USER_TYPE));
            }
            load = true;
        }
    }, [dispatch])

    const subcategory = useSelector((state)=>state.UserEcommerceReducer.usersubcategory)

    const category = useSelector((d) => d.UserEcommerceReducer.usercategory)
    const brand = useSelector((d) => d.UserEcommerceReducer.userbrand)
    const tag = useSelector((d) => d.UserEcommerceReducer.usertag)
    const type_op = useSelector((d) => d.UserEcommerceReducer.usertype)
    const subCatOptions = subcategory.map((item,index)=>{return {label: item.name, value: item.id}})
    const options = category.map((item, index) => {
        return {
            label: item.name, value: item.id
        }
    })
    const options1 = brand.map((item, index) => {
        return {
            label: item.name, value: item.id
        }
    })
    const options2 = tag.map((item, index) => {
        return {
            label: item.name, value: item.id
        }
    })
    const type_option = type_op.map((item, index) => {
        return {
            label: item.name, value: item.id
        }
    })
    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({

        initialValues: { pname: "", price: "", image: "", neighbourhood: "", description1: "", subcategory:'',Category: "", Brand: "", Tag: "", state: "", city: "", checkterm: false, condition: "", Type: "", quantity: 1 ,checkPrice:false},
        validationSchema: yup.object({
            pname: yup.string().required("Product name is required"),
            description1: yup.string().required("description is required").min(2, 'description is required'),
            price: yup.string().required("Price is required").matches(
                /^[0-9\s]+$/,
                "Please enter only digits."
            ),
            image: yup.array().max(10, "Please select maximum 10 images"),
            neighbourhood: yup.string().required("Neighbourhood is required"),
            checkterm: yup
                .bool()
                .oneOf([true], 'You need to accept the terms and conditions'),
            condition: yup.string().required("please select any one condition"),
            Category: yup.object().required("Please select category"),
            subcategory: yup.object().required("Please select sub category"),
            Type: yup.object().required("Please select type"),
            Brand: yup.object().required("Please select brand"),
            Tag: yup.array().of(yup.object()).required('Please select tag'),
            state: yup.object().required("Please select state"),
            city: yup.object().required("Please select city"),
            quantity: yup.number().typeError('you must specify a number of products')
                .min(1, 'Minimum 1 quanity.')
                .max(5, 'Maximum 5 quntities.')
        }),
        onSubmit: (values, { resetForm }) => {
            if (errormsg == "") {
                const formdata = new FormData();
                formdata.append('negotiable_price',checkPrice ? 1 :0)
                setFieldValue('image', imgArray)
                formdata.append('name', values.pname);
                formdata.append('description', values.description1);
                formdata.append('type_id', values.Type.value);
                formdata.append('category_id', values.Category.value);
                formdata.append('brand_id', values.Brand.value);
                formdata.append('price', values.price);
                formdata.append('item_condition', values.condition);
                formdata.append('state_id', values.state.value);
                formdata.append('city_id', values.city.value);
                formdata.append('neighbourhood', values.neighbourhood);
                formdata.append('quantity', values.quantity);
                formdata.append('sub_category_id',values.subcategory.value)
              
                if (state) {
                    formdata.append('status', 1);
                }
                else {
                    formdata.append('status', 0);
                }
                for (let i = 0; i < imgArray.length; i++) {
                    formdata.append(`image[${i}]`, imgArray[i])
                }
                for (let i = 0; i < values.Tag.length; i++) {
                    formdata.append(`tag_id[${i}]`, values.Tag[i].value)
                }
                if (state != null) {
                    dispatch(userUpdateProduct(state?.id, formdata, userid.id, setMessage, setError1, setStatus, navigate));
                }
                else {
                    dispatch(userAddProduct(formdata, userid.id, setMessage, setError1, setStatus));
                }
                resetForm({ values: '' });
                setImgArray([]);
                var used = document.getElementById('used')
                var new1 = document.getElementById('new')
                var post_check = document.getElementById('post-check')
                if (used.checked || new1.checked || post_check.checked) {
                    used.checked = false;
                    new1.checked = false;
                    post_check.checked = false;
                }
                var element = document.getElementsByClassName("ql-editor");
                element[0].innerHTML = "";
            }

        }
    })
    const handleFileChange = (e) => {
        setErrormsg('');
        if (e.target.files) {
            setImgArray((prv) => prv.concat(Array.from(e.target.files)))
        }

    }

    let errorImage = [];
    let error = '';
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
                seterror ? setErrormsg('You can choose only jpeg,png,jpg file') : setErrormsg('')
            }

        })
        return imgArray.map((photo, index) => {
            return (<div key={index} className="px-1 pb-2 d-flex">
                {
                    'lastModified' in photo ?
                        <img src={URL.createObjectURL(photo) || ''} alt='' key={index} width="50px"></img>
                        :
                        <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}${photo?.name}`} alt='' key={index} width="50px"></img>
                }
                <AiOutlineCloseCircle onClick={() => {
                    if ('lastModified' in photo == false) {
                        dispatch(userDeleteProductImage(photo?.id, userid.id))
                    }
                    setImgArray(imgArray.filter((item, index) => item !== photo))
                }} className="" />
            </div>)

        })
    }
    const request = debounce(value => {
        setFieldValue('description1', value)
    }, 1000)
    
    const debouceRequest = useCallback(value => request(value), []);
    const handleEditorContentChange = useCallback((editor) => {
        let doc = parse(editor);
        debouceRequest(doc.props.children);

    }, []);
  
    const handletypeclick = () => {
      
    }

    useEffect(() => {
        if (values?.Type == '' && values?.condition == '' && values?.city == '' && values?.state == '' && values?.Tag == '' && values?.Brand == '' && values?.Category == '' && values?.description1 == '' && values?.neighbourhood == '' && values?.price == '' && values?.pname == '') {
            setCheckFlag(true);
        }
        else if (values?.Type != '' && values?.condition != '' && values?.city != '' && values?.state != '' && values?.Tag != '' && values?.Brand != '' && values?.Category != '' && values?.description1 != '' && values?.neighbourhood != '' && values?.price != '' && values?.pname != '') { setCheckFlag(false) }
    }, [values])

    return (

        <div style={{ backgroundColor: "#f0f0f0" }}>
            <SnackBar status={status} message={message} error={error1} setStatus={setStatus} />
            <AddPostTabs />
            <section className="adpost-part">
                <div className='container-fluid'>
                    <div className='row'>

                        <div className='col'>
                            <LeftAds left_ads={left_ads} />
                        </div>
                       
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <form className="adpost-form" onSubmit={handleSubmit}>
                                        <div className="adpost-card">
                                            <div className="adpost-title">
                                                <h3>Product Information</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <Lable name="Title" className1="form-label" />
                                                        <TextField
                                                            id='pname'
                                                            name="pname"
                                                            placeholder="Type your product title here"
                                                            className="form-control"
                                                            type="text"
                                                            event={handleChange}
                                                            event1={handleBlur}
                                                            value={values.pname}
                                                            error={errors.pname}
                                                            touch={touched.pname}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <Lable name="Description" className1="form-label" />
                                                        <EditorField
                                                            id='description1'
                                                            name='description1'
                                                            value={values.description1}
                                                         
                                                            handleChange={handleEditorContentChange}
                                                            error={errors.description1}
                                                            touch={touched.description1}
                                                            event2={handleBlur} />
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Lable name="Type" className1="form-label" />
                                                        <SearchSelectBox
                                                            option={type_option}
                                                            select={false}
                                                            name="Type"
                                                            event={handletypeclick}
                                                            event2={handleBlur}
                                                            value={values.Type}
                                                            error={errors.Type}
                                                            touch={touched.Type}
                                                            setFieldValue={setFieldValue}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Lable name="Category" className1="form-label" />
                                                        <SearchSelectBox
                                                            option={options}
                                                            select={false}
                                                            name="Category"
                                                            id="Category"
                                                            event={handleChange}
                                                            event2={handleBlur}
                                                            value={values.Category}
                                                            error={errors.Category}
                                                            touch={touched.Category}
                                                            setFieldValue={setFieldValue}

                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Lable name="subcategory" className1="form-label" />
                                                        <SearchSelectBox
                                                            option={subCatOptions}
                                                            select={false}
                                                            name="subcategory"
                                                            id="subcategory"
                                                            event={handleChange}
                                                            event2={handleBlur}
                                                            value={values.subcategory}
                                                            error={errors.subcategory}
                                                            touch={touched.subcategory}
                                                            setFieldValue={setFieldValue}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Lable name="Brand" className1="form-label" />
                                                        <SearchSelectBox
                                                            option={options1}
                                                            select={false}
                                                            name="Brand"
                                                            event={handleChange}
                                                            event2={handleBlur}
                                                            value={values.Brand}
                                                            error={errors.Brand}
                                                            touch={touched.Brand}
                                                            setFieldValue={setFieldValue}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <Lable name="Tag" className1="form-label" />
                                                        <SearchSelectBox
                                                            option={options2}
                                                            select={true}
                                                            name="Tag"
                                                            event={handleChange}
                                                            event2={handleBlur}
                                                            value={values.Tag}
                                                            error={errors.Tag}
                                                            touch={touched.Tag}
                                                            setFieldValue={setFieldValue}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-6">
                                                    <div className="form-group ">
                                                        <Lable name="condition" className1="form-label" />
                                                        <ul className="radio-product ">

                                                            <li><RadioButton
                                                                id='used'
                                                                name="condition"
                                                                event={handleChange}
                                                                event1={handleBlur}
                                                                value="used"                                                           
                                                            /><Lable name="used" className1="form-check-text" /></li>
                                                            <li><RadioButton
                                                                id='new'
                                                                name="condition"
                                                                event={handleChange}
                                                                event1={handleBlur}
                                                                value="new"                                                           
                                                            /><Lable name="new" className1="form-check-text" /></li>

                                                        </ul>

                                                        {errors.condition && touched.condition ? <p> <span className='text-danger'>{errors.condition}</span></p> : null}
                                                    </div>

                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="form-group" >
                                                        <Lable name="Price" className1="form-label" />
                                                        <TextField
                                                            id='price'
                                                            name="price"
                                                            placeholder="Enter your pricing amount"
                                                            className="form-control"
                                                            type="text"
                                                            event={handleChange}
                                                            event1={handleBlur}
                                                            value={values.price}
                                                            error={errors.price}
                                                            touch={touched.price}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className='d-flex w-100 h-100 mt-lg-4 pt-lg-3 mb-2'>
                                                        <CheckBoxField className='mt-2' id="checkPrice" name="checkPrice" event={handleChange}/>
                                                        <p style={{marginTop:'2px'}}>Negotiable Price</p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <Lable name="Product Image" className1="form-label" />
                                                        <TextField
                                                            id='image'
                                                            name="image"
                                                            placeholder=""
                                                            className="form-control"
                                                            type="file"
                                                            event={handleFileChange}
                                                            event1={handleBlur}
                                                            value={values.image}
                                                            error={errors.image}
                                                            touch={touched.image}
                                                            multi="multiple"
                                                        />
                                                        <span className='text-danger'>{errormsg}</span>
                                                    </div>

                                                    <div className='file-img flex-wrap'>
                                                       
                                                        {imgArray ? renderPhotos1() : null}
                                                    </div>

                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <Lable name="Quantity" className1="form-label" />
                                                        <TextField
                                                            id='quantity'
                                                            name="quantity"
                                                            placeholder="Enter quantity"
                                                            className="form-control"                                                       
                                                            event={handleChange}
                                                            event1={handleBlur}
                                                            value={values.quantity}
                                                            error={errors.quantity}
                                                            touch={touched.quantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="adpost-card">
                                            <div className="adpost-title">
                                                <h3>Area Information</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <AreaDetail obj={{ State: 'State', City: 'City', values: values, setFieldValue: setFieldValue, error: errors, handleBlur: handleBlur, touch: touched }} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <Lable name="Neighbourhood" className1="form-label" />
                                                        <TextField
                                                            id='neighbourhood'
                                                            name="neighbourhood"
                                                            placeholder="Enter your neighbourhood"
                                                            className="form-control"
                                                            type="text"
                                                            event={handleChange}
                                                            event1={handleBlur}
                                                            value={values.neighbourhood}
                                                            error={errors.neighbourhood}
                                                            touch={touched.neighbourhood}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="adpost-card pb-2">
                                            <div className="adpost-agree">
                                                <div className="form-group">
                                                    <CheckBoxField title={checkFlag ? "first fill all above details" : null} checkFlag={checkFlag} id="post-check" name="checkterm" event={handleChange} />
                                                </div>
                                                <p>Send me Trade Email/SMS Alerts for people looking to buy mobile handsets in www By
                                                    clicking "Post", you agree to our <a href="#">Terms of Use</a>and <a href="#">Privacy Policy</a>and acknowledge that you are the rightful owner of
                                                    this item and using Trade to find a genuine buyer.</p>
                                            </div>
                                            {errors.checkterm && touched.checkterm ? <p> <span className='text-danger'>{errors.checkterm}</span></p> : null}
                                            <div className="form-group text-right">
                                                <Button name={state != null ? 'Update your Ad' : "published your ad"} icon="fas fa-check-circle" className="btn btn-inline mt-2" type="submit" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-4">
                                    <SafetyTips />
                                    <div className="account-card alert fade show">
                                        <div className="account-title">
                                            <h3>Custom Offer</h3><button data-dismiss="alert">close</button>
                                        </div>
                                        <form className="account-card-form">
                                            <div className="form-group">
                                                <TextField
                                                    id='aname'
                                                    name="aname"
                                                    placeholder="Your Name"
                                                    className="form-control"
                                                    type="text"
                                                    event={handleChange}
                                                    event1={handleBlur}
                                                    value={values.aname}
                                                    error={errors.aname}
                                                    touch={touched.aname}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <TextField
                                                    id='email'
                                                    name="email"
                                                    placeholder="Your Email"
                                                    className="form-control"
                                                    type="email"
                                                    event={handleChange}
                                                    event1={handleBlur}
                                                    value={values.email}
                                                    error={errors.email}
                                                    touch={touched.email}
                                                />
                                            </div>
                                            <div className="form-group">                                  
                                         </div>
                                            <div className="form-group">
                                                <Button name="send Message" icon="fas fa-paper-plane" className="btn btn-inline" type="submit" />
                                            </div>
                                        </form>
                                    </div>
                                </div>                         
                            </div>
                        </div>
                        <div className='col'>
                            <RightAds right_ads={right_ads} />
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default AdPost