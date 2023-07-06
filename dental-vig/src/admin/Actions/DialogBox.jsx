import { React, memo, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextFieldInput from '../input-function/TextFieldInput';
import ButtonInput from '../input-function/ButtonInput';
import SearchSelectDropdown from '../input-function/SearchSelectDropdown'
import { useDispatch } from 'react-redux';
import { ADD_BRAND_TO_BRANDLIST, ADD_CATEGORY_TO_CATEGORYLIST, ADD_SUBCATEGORY, ADD_TAG_TO_TAGLIST, ADD_TYPE_TO_TYPELIST, GET_BRAND_LIST, GET_CATEGORY_LIST, GET_SUB_CATEGORY_LIST, GET_TAG_LIST, GET_TYPE_LIST, UPDATE_BRAND, UPDATE_CATEGORY, UPDATE_SUB_CATEGORY, UPDATE_TAG, UPDATE_TYPE, addBrandToBrandList, addCategoryToCategoryList, addData, addSubCategory, addTagToTagList, addTypeToTypeList, curdData, replyOfContactUs, updateBrand, updateCategory, updateSubCategory, updateTag, updateType } from '../../redux/actions/EcommerceAction';
import * as yup from 'yup'
import { Formik, useFormik } from 'formik';
import { Box, Grid, TextareaAutosize } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import { ValAuthContext } from '../context/ValContext';
import { ALL_BRANDS, ALL_CATEGORIES, ALL_TAGS, ALL_TYPES, CONTACT_US, SUB_CATEGORIES } from '../../services/AdminRoutePath';
import '../css/Dialog-Box.css';


const DialogBox = ({ obj }) => {
    const [editfile, setEditFile] = useState({});
    const val = useContext(ValAuthContext);
    const dispatch = useDispatch();
    const handleClose = () => {
        var elelist = document.getElementsByTagName("input");
        for (var i = 0; i < elelist.length; i++) {
            elelist[i].blur();
        }
        obj.setOpen(false);
        setTouched({}, false);
        setErrors({}, '');
        setFieldValue('name', '')
        setFieldValue('file', '');
        setFieldValue('email', '');
        setFieldValue('message', '');
    };

    const handleFileChange = (e) => {
        setFieldValue('file', e.target.files[0]);
        if (obj.action == 'edit') {
            setEditFile(e.target.files[0]);
        }
    }

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/svg", "image/webp"];
    const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue, setErrors, setTouched, setFieldError } = useFormik({

        initialValues: obj.path == ALL_BRANDS ? { name: '', file: ''} : obj.path == ALL_CATEGORIES ? { name: '', Type: '' } : obj.path == SUB_CATEGORIES ? { name: '', category: '' } : obj.path == CONTACT_US ? { message: '', email: '' } : { name: '' },
        validationSchema: obj.path == ALL_BRANDS && obj.action == 'add' ?
            yup.object({
                name: yup.string().required("Name is required"),
                file: yup.mixed().required('Image is required').test('Unsupported format', (value) => { return value && SUPPORTED_FORMATS.includes(value?.type) }),
            }) :
            obj.path == ALL_CATEGORIES ?
                yup.object({
                    name: yup.string().required("Name is required"),
                    Type: yup.object().required("Type is required"),
                }) : obj.path == SUB_CATEGORIES ?
                    yup.object({
                        name: yup.string().required("Name is required"),
                        category: yup.object().required("Category is required"),
                    })
                    : obj?.path == CONTACT_US && obj?.action == 'reply' ? yup.object({
                        message: yup.string().required("Message is required"),
                        email: yup.string().email('Invalid Email address').required("Email is required")
                    })
                        : yup.object({ name: yup.string().required("Name is required"), }),

        onSubmit: (values, { resetForm }) => {
            const formdata = new FormData();
            if (obj.action == 'add') {
                switch (obj.path) {
                    case ALL_BRANDS:
                        formdata.append('name', values.name);
                        formdata.append('image', values.file);
                        break;
                    case ALL_CATEGORIES:
                        formdata.append('name', values.name);
                        formdata.append('type_id', values.Type.value);
                        break;
                    case SUB_CATEGORIES:
                        formdata.append('name', values.name);
                        formdata.append('category_id', values.category.value);
                        break;
                    case ALL_TYPES:
                        formdata.append('name', values.name);
                        break;
                    case ALL_TAGS:
                        formdata.append('name', values.name);
                        break;
                    default:
                        break;
                }
            }

            const editFormData = new FormData();
            if (obj?.action == 'edit') {
                switch (obj.path) {
                    case ALL_BRANDS:
                        editFormData.append('name', values.name);
                        editFormData.append('image', editfile);
                        editFormData.append('sub_category_id', values.category.value)
                        break;
                    case ALL_CATEGORIES:
                        editFormData.append('name', values.name);
                        editFormData.append('type_id', values?.Type.value);
                        break;
                    case SUB_CATEGORIES:
                        editFormData.append('name', values.name);
                        editFormData.append('category_id', values?.category.value);
                        break;
                    case ALL_TYPES:
                        editFormData.append('name', values?.name);
                        break;
                    case ALL_TAGS:
                        editFormData.append('name', values?.name);
                        break;
                    default:
                        break;
                }
            }

            const formdataReply = new FormData();
            if (obj?.action == 'reply') {
                formdataReply.append('email', values.email);
                formdataReply.append('message', values.message);
            }

            if (obj?.action == 'edit') {
                if (obj.name == 'Brand') {
                    dispatch(curdData(editFormData, `admin/updatebrand/${obj?.editItem?.id}`,UPDATE_BRAND, `getbrand?page=${obj.currentPage}`,GET_BRAND_LIST,'Brand updated successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                }
                else {
                    if (obj.name == 'Category') {
                        dispatch(curdData(editFormData, `admin/updatecat/${obj?.editItem?.id}`,UPDATE_CATEGORY, `getcat?page=${obj.currentPage}`,GET_CATEGORY_LIST,'Category updated successfully !',val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                    }
                    else if (obj.name == "SubCategory") {
                        dispatch(curdData(editFormData, `admin/updatesubcat/${obj?.editItem?.id}`,UPDATE_SUB_CATEGORY, `admin/getsubcat?page=${obj.currentPage}`,GET_SUB_CATEGORY_LIST,'Sub-category updated successfully !',val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                    }
                    else if (obj.name == 'Tag') {
                        dispatch(curdData(editFormData,`admin/updatetag/${obj?.editItem?.id}`,UPDATE_TAG,`gettag?page=${obj.currentPage}`,GET_TAG_LIST,'Tag updated successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                    }
                    else if (obj.name == 'Type') {
                        dispatch(curdData(editFormData, `admin/updatetype/${obj?.editItem?.id}`,UPDATE_TYPE, `gettype?page=${obj.currentPage}`,GET_TYPE_LIST,'Type updated successfully !',val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                    }
                }
            }
            else if (obj.action == 'add') {
                if (obj.name == 'Brand') {
                    dispatch(curdData(formdata, `admin/addbrand`,ADD_BRAND_TO_BRANDLIST, `getbrand?page=${obj.currentPage}`,GET_BRAND_LIST,'Brand added successfully !',val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
                }
                else {
                    if (obj.name == 'Category') {
                        dispatch(curdData(formdata, 'admin/addcat',ADD_CATEGORY_TO_CATEGORYLIST,`getcat?page=${obj.currentPage}`,GET_CATEGORY_LIST,'Category added successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader));
                    }
                    else if (obj.name == 'SubCategory') {
                        dispatch(curdData(formdata, 'admin/subcat',ADD_SUBCATEGORY,`admin/getsubcat?page=${obj.currentPage}`,GET_SUB_CATEGORY_LIST,'SubCategory added successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader));
                    }
                    else if (obj.name == 'Tag') {
                        dispatch(curdData(formdata, `admin/addtag`,ADD_TAG_TO_TAGLIST,`gettag?page=${obj.currentPage}`,GET_TAG_LIST,'Tag added successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader));
                    }
                    else if (obj.name == 'Type') {
                        dispatch(curdData(formdata, 'admin/addtype',ADD_TYPE_TO_TYPELIST,`gettype?page=${obj.currentPage}`,GET_TYPE_LIST,'Type added successfully !', val.setMessage, val.setError, val.setStatus, val.setOpenLoader));
                    }
                }
            }
            else if (obj?.action == 'reply') {
                dispatch(replyOfContactUs(formdataReply, obj.currentPage, val.setMessage, val.setError, val.setStatus, val.setOpenLoader))
            }
            handleClose();
            resetForm({ values: '' });
            setEditFile({});
        }
    })
   
    useEffect(() => {
        if (obj.action == 'edit') {
            setFieldValue('name', obj?.editItem?.name);
            setFieldValue('Type', { name: obj?.editItem?.types?.name, label: obj?.editItem?.types?.name, value: obj?.editItem?.types?.id })
            setFieldValue('category', { name: obj?.editItem?.cat?.name, label: obj?.editItem?.cat?.name, value: obj?.editItem?.cat?.id }) 
        }
        else if (obj?.action == 'reply') {
            setFieldValue('email', obj?.editItem)
        }
        else {
            setFieldValue('name', '');
            setFieldValue('message', '');
        }
    }, [obj?.editItem]);

    return (
        <>
            <div>
                <Dialog open={obj.open} fullWidth>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>{obj.name}</DialogTitle>
                        <DialogContent>
                            {
                                obj.path == ALL_BRANDS ?
                                    <>
                                        <TextFieldInput obj={{
                                            label: 'Title', type: 'text',
                                            handleChange: handleChange,
                                            handleBlur: handleBlur,
                                            value: values.name,
                                            error: errors.name,
                                            touch: touched.name,
                                            name: 'name',
                                            autoFocus: true
                                        }} />
                                        <Grid container spacing={1} sx={{ justifyContent: 'flex-start' }}>
                                            <Grid item sm={10} xs={12} sx={{ width: '100%' }}>
                                                <TextFieldInput
                                                    obj={{
                                                        label: 'Image', type: 'file',
                                                        handleBlur: handleBlur,
                                                        handleChange: handleFileChange,
                                                        value: values.file,
                                                        error: errors.file,
                                                        touch: touched.file,
                                                    }} />
                                            </Grid>
                                          
                                            {obj.action == 'edit' && obj.editItem ? <Grid item sm={2} xs={12} sx={{ display: obj?.editItem?.image && obj.action == 'edit' ? 'block' : 'none' }}>
                                                <Avatar alt={obj.editItem.name} src={`${process.env.REACT_APP_BRAND_IMAGE_URL}${obj?.editItem?.image}`} sx={{ marginTop: '10px', objectFit: 'contain' }}>
                                                </Avatar>
                                            </Grid>:null}
                                        </Grid>
                                    </> : obj.path == ALL_CATEGORIES ?
                                        <>
                                            <TextFieldInput obj={{
                                                label: 'Name', type: 'text',
                                                handleChange: handleChange,
                                                handleBlur: handleBlur,
                                                value: values.name,
                                                error: errors.name,
                                                touch: touched.name,
                                                name: 'name',
                                                autoFocus: true
                                            }} />
                                            <Grid container spacing={1} sx={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                                                <Grid item sm={10} xs={12} sx={{ width: '100%' }}>
                                                    <SearchSelectDropdown obj={{ name: 'Type', values: values.Type, setFieldValue: setFieldValue, error: errors.Type, handleBlur: handleBlur, touch: touched.Type, setErrors: setErrors, editType: obj?.editItem?.types, action: 'edit' }} />
                                                </Grid>
                                            </Grid>
                                        </> :
                                        obj.path == SUB_CATEGORIES ?
                                            <>
                                                <TextFieldInput obj={{
                                                    label: 'Name', type: 'text',
                                                    handleChange: handleChange,
                                                    handleBlur: handleBlur,
                                                    value: values.name,
                                                    error: errors.name,
                                                    touch: touched.name,
                                                    name: 'name',
                                                    autoFocus: true
                                                }} />
                                                <Grid container spacing={1} sx={{ justifyContent: 'flex-start', marginTop: '20px' }}>
                                                    <Grid item sm={10} xs={12} sx={{ width: '100%' }}>
                                                        <SearchSelectDropdown obj={{ name: 'category', values: values.category, setFieldValue: setFieldValue, error: errors.category, handleBlur: handleBlur, touch: touched.category, setErrors: setErrors, editType: obj?.editItem?.cat, action: 'edit' }} />
                                                    </Grid>
                                                </Grid>
                                            </> : obj.path == CONTACT_US ?
                                                <>
                                                    <TextFieldInput obj={{
                                                        label: 'email', type: 'text',
                                                        handleChange: handleChange,
                                                        handleBlur: handleBlur,
                                                        value: values.email,
                                                        error: errors.email,
                                                        touch: touched.email,
                                                        name: 'email',
                                                        autoFocus: true
                                                    }} />
                                                    <TextFieldInput obj={{
                                                        label: 'Message', type: 'text',
                                                        handleChange: handleChange,
                                                        handleBlur: handleBlur,
                                                        value: values.message,
                                                        error: errors.message,
                                                        touch: touched.message,
                                                        name: 'message',
                                                        autoFocus: false
                                                    }} />
                                                </>
                                                :
                                                <TextFieldInput obj={{
                                                    label: 'Name', type: 'text',
                                                    handleChange: handleChange,
                                                    handleBlur: handleBlur,
                                                    value: values.name,
                                                    error: errors.name,
                                                    touch: touched.name,
                                                    name: 'name',
                                                    autoFocus: true
                                                }} />

                            }
                        </DialogContent>
                        <DialogActions>
                            <ButtonInput obj={{ buttonName: 'Cancel', handleClose: handleClose }} />
                            <ButtonInput obj={{ buttonName: obj.action == 'edit' ? 'Edit' : obj.action == 'reply' ? 'send reply' : 'Add', type: 'submit' }} />
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </>
    )
}

export default memo(DialogBox)

